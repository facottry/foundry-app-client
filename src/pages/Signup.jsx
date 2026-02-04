import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ErrorState from '../components/common/ErrorState';
import LoadingState from '../components/common/LoadingState';
import SEO from '../components/SEO';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'CUSTOMER' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { signup, loginWithProvider, user: authUser, googleLoginSDK } = useContext(AuthContext);
    const navigate = useNavigate();

    const GOOGLE_AUTH_MODE = import.meta.env.VITE_GOOGLE_AUTH_MODE || 'REDIRECT';
    const ENABLE_GOOGLE_AUTH = import.meta.env.VITE_ENABLE_GOOGLE_AUTH === 'true';
    const ENABLE_GITHUB_AUTH = import.meta.env.VITE_ENABLE_GITHUB_AUTH === 'true';
    const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const ENABLE_LINKEDIN_AUTH = import.meta.env.VITE_ENABLE_LINKEDIN_AUTH === 'true';

    // Internal production testing flag
    const showGoogleAuth = ENABLE_GOOGLE_AUTH;

    console.log('[Signup Debug] Flags:', {
        GOOGLE_AUTH_MODE,
        ENABLE_GOOGLE_AUTH,
        ENABLE_GITHUB_AUTH,
        localStorage_SHOW: localStorage.getItem('SHOW_GOOGLE_AUTH'),
        computed_showGoogleAuth: showGoogleAuth
    });

    // Redirect if authenticated (e.g. from Google SDK)
    useEffect(() => {
        if (authUser) {
            if (authUser.role === 'FOUNDER') navigate('/founder/dashboard');
            else navigate('/dashboard/customer');
        }
    }, [authUser, navigate]);

    const handleSocial = (provider) => {
        if (provider === 'google') {
            if (GOOGLE_AUTH_MODE === 'SDK') {
                googleLoginSDK();
            } else {
                const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                window.location.href = `${apiUrl}/auth/sso/google`;
            }
        } else {
            const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
            window.location.href = `${apiUrl}/auth/sso/${provider}`;
        }
    };

    const { name, email, password, role } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const user = await signup(name, email, password, role);
            if (user.role === 'FOUNDER') navigate('/founder/dashboard');
            else navigate('/dashboard/customer');
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    if (loading) return <LoadingState />;

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
            <SEO title="Sign Up" noindex={true} />
            <h2>Sign Up</h2>
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
                        Google
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
                <span style={{ background: 'white', padding: '0 10px', color: '#666', position: 'relative', zIndex: 1 }}>Or sign up with Email</span>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#ccc', zIndex: 0 }}></div>
            </div>

            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>I am a:</label>
                    <select name="role" value={role} onChange={onChange} style={{ width: '100%', padding: '8px' }}>
                        <option value="CUSTOMER">Customer (I want to discover tools)</option>
                        <option value="FOUNDER">Founder (I want to list a product)</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
