import React, { createContext, useState, useEffect } from 'react';
import api, { registerLogoutHandler } from '../utils/api';
import { emitEvent } from '../analytics';

const AuthContext = createContext({
    user: null,
    loading: true,
    login: async () => { },
    signup: async () => { },
    logout: async () => { },
    loginWithOTP: async () => { },
    loginWithPhone: async () => { },
    loginWithProvider: async () => { },
    googleLoginSDK: () => { },
    updateUser: () => { }
});

export const AuthProvider = ({ children }) => {

    // Global Auth State
    // 'checking'         -> Initial load, contacting server
    // 'authenticated'    -> Server confirmed user (200 OK)
    // 'unauthenticated'  -> Server rejected or no token (401/403)
    const [authStatus, setAuthStatus] = useState('checking');
    const [user, setUser] = useState(null);

    // Bootstrap: Verify with Server
    useEffect(() => {
        const verifyAuth = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setAuthStatus('unauthenticated');
                setUser(null);
                return;
            }

            try {
                // The ONLY source of truth: does the server accept this token?
                const userObj = await api.get('/auth/me');

                if (userObj && (userObj.id || userObj._id)) {
                    // Polyfill id if missing
                    if (!userObj.id) userObj.id = userObj._id;
                    setUser(userObj);
                    setAuthStatus('authenticated');
                } else {
                    throw new Error('Server returned 200 but invalid user data');
                }
            } catch (err) {
                console.error('[Auth] Session restoration failed:', err);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setUser(null);
                setAuthStatus('unauthenticated');
            }
        };

        verifyAuth();
    }, []);

    // Helper to manually refresh auth (e.g. after profile update)
    const refreshAuth = async () => {
        try {
            const userObj = await api.get('/auth/me');
            if (userObj && (userObj.id || userObj._id)) {
                if (!userObj.id) userObj.id = userObj._id;
                setUser(userObj);
            }
            // Don't change status, just update data
        } catch (err) {
            // If refresh fails, do we logout? ideally yes if 401
        }
    };

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        setAuthStatus('authenticated'); // Immediate update

        emitEvent({
            name: 'login_completed',
            category: 'user',
            actor: { type: 'user', id: res.data.user.id },
            properties: { method: 'password' }
        });

        return res.data.user;
    };

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const loginWithOTP = async (email, otp) => {
        const res = await api.post('/auth/login-otp', { email, otp });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        setAuthStatus('authenticated');

        emitEvent({
            name: 'login_completed',
            category: 'user',
            actor: { type: 'user', id: res.data.user.id },
            properties: { method: 'otp' }
        });

        return res.data.user;
    };

    const loginWithPhone = async (phone, otp) => {
        const res = await api.post('/auth/login-phone', { phone, otp });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        setAuthStatus('authenticated');

        emitEvent({
            name: 'login_completed',
            category: 'user',
            actor: { type: 'user', id: res.data.user.id },
            properties: { method: 'phone' }
        });

        return res.data.user;
    };

    const signup = async (name, email, password, role) => {
        const res = await api.post('/auth/signup', { name, email, password, role });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        setAuthStatus('authenticated');

        emitEvent({
            name: 'signup_completed',
            category: 'user',
            actor: { type: 'user', id: res.data.user.id },
            properties: { role }
        });

        return res.data.user;
    };

    const loginWithProvider = async (provider, profile) => {
        const res = await api.post('/auth/sso/login/provider', { provider, profile });
        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        setAuthStatus('authenticated');

        emitEvent({
            name: 'login_completed',
            category: 'user',
            actor: { type: 'user', id: res.data.user.id },
            properties: { method: provider }
        });

        return res.data.user;
    };

    // --- Google SDK Logic (Route Independent) ---
    const GOOGLE_AUTH_MODE = import.meta.env.VITE_GOOGLE_AUTH_MODE || 'REDIRECT';
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const ENABLE_GOOGLE_AUTH = import.meta.env.VITE_ENABLE_GOOGLE_AUTH === 'true';

    useEffect(() => {
        // Feature Flag Check & Mode Check
        if (!ENABLE_GOOGLE_AUTH || GOOGLE_AUTH_MODE !== 'SDK') return;

        // Define global callback to ensure Google SDK can reach it
        window.handleGoogleCredentialResponse = async (response) => {
            try {
                const res = await api.post('/auth/sso/google', { idToken: response.credential });
                const { user, accessToken } = res;

                localStorage.setItem('token', accessToken);
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                setAuthStatus('authenticated');

                emitEvent({
                    name: 'login_completed',
                    category: 'user',
                    actor: { type: 'user', id: user.id },
                    properties: { method: 'google' }
                });

            } catch (err) {
                console.error('[AuthContext] Google SSO Error', err);
                const errorMessage = typeof err === 'string' ? err : (err.response?.data?.error || err.message || 'Unknown Error');
                alert('Google Sign-In Failed: ' + errorMessage);
            }
        };

        const initGSI = () => {
            if (window.google && window.google.accounts) {
                window.google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: window.handleGoogleCredentialResponse,
                });
            }
        };

        const scriptUrl = 'https://accounts.google.com/gsi/client';
        const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);

        if (existingScript) {
            if (window.google) initGSI();
            else existingScript.addEventListener('load', initGSI);
        } else {
            const script = document.createElement('script');
            script.src = scriptUrl;
            script.async = true;
            script.defer = true;
            script.onload = initGSI;
            document.body.appendChild(script);
        }

        return () => {
            // Cleanup if necessary
        };

    }, []);

    const googleLoginSDK = () => {
        if (GOOGLE_AUTH_MODE !== 'SDK') {
            console.warn('googleLoginSDK called but mode is', GOOGLE_AUTH_MODE);
            return;
        }
        if (window.google && window.google.accounts) {
            window.google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed()) {
                    console.warn('One Tap not displayed:', notification.getNotDisplayedReason());
                    if (notification.getNotDisplayedReason() === 'suppressed_by_user') {
                        alert('Sign-In suppressed. Try Incognito or check browser settings.');
                    }
                }
            });
        } else {
            alert('Google SDK loading... please wait.');
        }
    };


    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (e) {
            console.error('Logout API failed', e);
        }

        if (window.google && window.google.accounts) {
            window.google.accounts.id.disableAutoSelect();
            console.log('Google AutoSelect Disabled');
        }

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setAuthStatus('unauthenticated');
        window.location.href = '/login';
    };

    // Register logout handler for 401s
    useEffect(() => {
        registerLogoutHandler(logout);
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            authStatus, // Expose status
            login,
            loginWithOTP,
            loginWithPhone,
            loginWithProvider,
            signup,
            logout,
            updateUser,
            refreshAuth,
            googleLoginSDK
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthContext;
