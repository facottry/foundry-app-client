import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import LoadingState from '../components/common/LoadingState';
import api from '../utils/api';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const { provider } = useParams();
    const navigate = useNavigate();
    const { updateUser } = useContext(AuthContext);

    useEffect(() => {
        const token = searchParams.get('token');
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        const handleExchange = async () => {
            if (error) {
                alert('Login failed: ' + error);
                navigate('/login');
                return;
            }

            try {
                let user;
                let accessToken = token;

                console.log('[AuthCallback Debug] Init. Token:', !!token, 'Code:', !!code, 'Provider:', provider);

                // Flow A: Frontend Exchange (SPA) - code provided
                if (!accessToken && code && provider) {
                    console.log('[AuthCallback Debug] Starting Flow A (Code Exchange)...');
                    const res = await api.post(`/auth/sso/${provider}/callback`, { code });
                    // api.js unwraps response.data, and backend returns { user, accessToken } directly
                    accessToken = res.accessToken;
                    user = res.user;
                    console.log('[AuthCallback Debug] Flow A Success. User:', user?.email);
                    updateUser(user);
                    localStorage.setItem('token', accessToken);
                }

                // Flow B: Backend Redirect (Legacy) - token provided
                else if (accessToken) {
                    console.log('[AuthCallback Debug] Starting Flow B (Token Provided)...');
                    localStorage.setItem('token', accessToken);
                    const { default: api } = await import('../utils/api');
                    const res = await api.get('/auth/me');
                    // api.js returns user object directly
                    user = res;
                    console.log('[AuthCallback Debug] Flow B Success. User:', user?.email);
                    updateUser(user);
                }

                // Final Navigation
                if (user) {
                    console.log('[AuthCallback Debug] Navigating to dashboard for role:', user.role);
                    if (user.role === 'FOUNDER') navigate('/founder/dashboard');
                    else navigate('/dashboard/customer');
                } else {
                    console.warn('[AuthCallback Debug] No user resolved. Navigating to login.');
                    navigate('/login');
                }

            } catch (err) {
                console.error('[AuthCallback Debug] Call Failed', err);
                alert('Login failed. Please try again.');
                navigate('/login');
            }
        };

        handleExchange();
    }, [searchParams, navigate, provider, updateUser]);

    return <LoadingState />;
};

export default AuthCallback;
