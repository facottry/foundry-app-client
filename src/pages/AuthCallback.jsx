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

                // Flow A: Frontend Exchange (SPA) - code provided
                if (!accessToken && code && provider) {
                    const res = await api.post(`/auth/sso/${provider}/callback`, { code });
                    accessToken = res.data.accessToken;
                    user = res.data.user;
                    updateUser(user);
                    localStorage.setItem('token', accessToken);
                }

                // Flow B: Backend Redirect (Legacy) - token provided
                else if (accessToken) {
                    localStorage.setItem('token', accessToken);
                    const { default: api } = await import('../utils/api');
                    const res = await api.get('/auth/me');
                    user = res.data;
                    updateUser(user);
                }

                // Final Navigation
                if (user) {
                    if (user.role === 'FOUNDER') navigate('/founder/dashboard');
                    else navigate('/dashboard/customer');
                } else {
                    // Fallback
                    navigate('/login');
                }

            } catch (err) {
                console.error('Auth Callback Failed', err);
                alert('Login failed. Please try again.');
                navigate('/login');
            }
        };

        handleExchange();
    }, [searchParams, navigate, provider, updateUser]);

    return <LoadingState />;
};

export default AuthCallback;
