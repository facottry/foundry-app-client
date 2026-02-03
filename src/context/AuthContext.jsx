import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    console.log('AuthProvider initializing...');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) setUser(JSON.parse(storedUser));
                } catch (err) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        // api.post returns response.data (which is { success, data })
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
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
        return res.data.user;
    };

    const loginWithPhone = async (phone, otp) => {
        const res = await api.post('/auth/login-phone', { phone, otp });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        return res.data.user;
    };

    const signup = async (name, email, password, role) => {
        const res = await api.post('/auth/signup', { name, email, password, role });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        return res.data.user;
    };

    const loginWithProvider = async (provider, profile) => {
        const res = await api.post('/auth/sso/login/provider', { provider, profile });
        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
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
            console.log('GOOGLE SDK SUCCESS', response);
            console.log('[AuthContext] Google Credential Received:', response);
            try {
                const res = await api.post('/auth/sso/google', { idToken: response.credential });
                const { user, accessToken } = res.data;

                localStorage.setItem('token', accessToken);
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);

                // User state change will trigger redirects in components
            } catch (err) {
                console.error('[AuthContext] Google SSO Error', err);
                alert('Google Sign-In Failed: ' + (err.response?.data?.error || err.message));
            }
        };

        const initGSI = () => {
            if (window.google && window.google.accounts) {
                console.log('[AuthContext] Initializing GSI...', GOOGLE_CLIENT_ID);
                window.google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: window.handleGoogleCredentialResponse, // Use global reference
                });
                console.log('[AuthContext] GSI Initialized.');
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
            // Cleanup if necessary, though GSI might need it to remain. 
            // window.handleGoogleCredentialResponse = null; 
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


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, loginWithOTP, loginWithPhone, loginWithProvider, signup, logout, loading, updateUser, googleLoginSDK }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthContext;
