import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ErrorState from '../components/common/ErrorState';
import LoadingState from '../components/common/LoadingState';
import SEO from '../components/SEO';
import api from '../utils/api';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const GOOGLE_AUTH_MODE = import.meta.env.VITE_GOOGLE_AUTH_MODE || 'REDIRECT';
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const ENABLE_GOOGLE_AUTH = import.meta.env.VITE_ENABLE_GOOGLE_AUTH === 'true';
    const ENABLE_GITHUB_AUTH = import.meta.env.VITE_ENABLE_GITHUB_AUTH === 'true';
    const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const ENABLE_LINKEDIN_AUTH = import.meta.env.VITE_ENABLE_LINKEDIN_AUTH === 'true';

    // Production Visibility: Now purely based on Env Var
    const showGoogleAuth = ENABLE_GOOGLE_AUTH;

    // SDK Lazy Loader & Initialization
    // SDK Lazy Loader & Initialization
    useEffect(() => {
        // 1. Strict Mode Check: If not SDK, do absolutely nothing.
        if (GOOGLE_AUTH_MODE !== 'SDK') {
            return;
        }

        const initGSI = () => {
            if (window.google && window.google.accounts) {
                window.google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: handleGoogleCredentialResponse,
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

        // Cleanup: We generally don't remove the script on unmount to avoid re-downloading
    }, [GOOGLE_AUTH_MODE, GOOGLE_CLIENT_ID]);

    const handleGoogleCredentialResponse = async (response) => {
        try {
            setLoading(true);
            const res = await api.post('/auth/sso/google', { idToken: response.credential });
            const { user, accessToken } = res;

            localStorage.setItem('token', accessToken);
            updateUser(user);

            if (user.role === 'FOUNDER') navigate('/founder/dashboard');
            else if (user.role === 'ADMIN') navigate('/dashboard/admin');
            else navigate('/dashboard/customer');

        } catch (err) {
            console.error('[GoogleAuth] Backend Exchange Error', err);
            setError(err.response?.data?.error || 'Google Sign-In failed');
            setLoading(false);
        }
    };

    const loginWithGoogleSDK = () => {
        if (window.google && window.google.accounts) {
            window.google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed()) {
                    if (notification.getNotDisplayedReason() === 'suppressed_by_user') {
                        alert('Google Sign-In was suppressed. Please check your browser settings or try Incognito.');
                    }
                }
            });
        }
    };

    const handleSocial = (provider) => {
        if (provider === 'google') {
            if (GOOGLE_AUTH_MODE === 'SDK') {
                loginWithGoogleSDK();
            } else {
                // REDIRECT MODE
                const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                window.location.href = `${apiUrl}/auth/sso/google`;
            }
        } else {
            // Other providers
            const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
            window.location.href = `${apiUrl}/auth/sso/${provider}`;
        }
    };

    const { email, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const user = await login(email, password);
            if (!user) { // user might be undefined if login fails and doesn't throw? AuthContext depends.
                // Assuming login throws on error
                return;
            }
            if (user.role === 'FOUNDER') navigate('/founder/dashboard');
            else if (user.role === 'ADMIN') navigate('/dashboard/admin');
            else navigate('/dashboard/customer');
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    if (loading) return <LoadingState />;

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
            <SEO title="Login" noindex={true} />
            <h2>Login</h2>
            {error && (
                <div style={{ marginBottom: '15px' }}>
                    <ErrorState error={error} />
                </div>
            )}
            <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'row', gap: '10px' }}>
                {showGoogleAuth && (
                    <button
                        type="button"
                        className="btn"
                        style={{ backgroundColor: '#DB4437', color: 'white', flex: 1, border: 'none', padding: '10px 0', fontSize: '0.9rem' }}
                        onClick={() => handleSocial('google')}
                    >
                        {GOOGLE_AUTH_MODE === 'SDK' ? 'Google' : 'Google'}
                    </button>
                )}
                {ENABLE_GITHUB_AUTH && GITHUB_CLIENT_ID && (
                    <button
                        type="button"
                        className="btn"
                        style={{ backgroundColor: '#333', color: 'white', flex: 1, border: 'none', padding: '10px 0', fontSize: '0.9rem' }}
                        onClick={() => handleSocial('github')}
                    >
                        GitHub
                    </button>
                )}
                {ENABLE_LINKEDIN_AUTH && (
                    <button
                        type="button"
                        className="btn"
                        style={{ backgroundColor: '#0077b5', color: 'white', flex: 1, border: 'none', padding: '10px 0', fontSize: '0.9rem' }}
                        onClick={() => handleSocial('linkedin')}
                    >
                        LinkedIn
                    </button>
                )}
            </div>

            <div style={{ position: 'relative', margin: '20px 0', textAlign: 'center' }}>
                <span style={{ background: 'white', padding: '0 10px', color: '#666', position: 'relative', zIndex: 1 }}>Or continue with Email</span>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#ccc', zIndex: 0 }}></div>
            </div>

            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
            </form>
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem' }}>
                    <Link to="/login-otp">Forgot Password? / Login with OTP</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
