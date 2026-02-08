import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthPageGuard = ({ children }) => {
    const { authStatus } = useAuth();

    // 1. Loading State -> Block everything
    if (authStatus === 'checking') {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted">Verifying Session...</p>
            </div>
        );
    }

    // 2. Authenticated -> Redirect to Dashboard (POST_LOGIN_ROUTE)
    // We hardcode the default post-login route here or import it
    // For now, let's use a reasonable default. The App.jsx refactor will standardize this.
    // Ideally this should come from a config, but keeping it simple as per instructions.
    if (authStatus === 'authenticated') {
        const POST_LOGIN_ROUTE = '/founder/dashboard';
        return <Navigate to={POST_LOGIN_ROUTE} replace />;
    }

    // 3. Unauthenticated -> Allow access to Login/Signup
    return children;
};

export default AuthPageGuard;
