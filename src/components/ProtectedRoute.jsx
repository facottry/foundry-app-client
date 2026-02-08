import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, authStatus } = useContext(AuthContext);
    const location = useLocation();

    // 1. Strict Loading State
    if (authStatus === 'checking') {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                color: '#6b7280',
                flexDirection: 'column',
                gap: '10px'
            }}>
                <div className="spinner-border text-primary" role="status"></div>
                <span>Verifying Access...</span>
            </div>
        );
    }

    // 2. Not Authenticated -> Send to Login
    if (authStatus === 'unauthenticated') {
        // Save location to redirect back? maybe later. For now, strict login.
        return <Navigate to="/login" replace />;
    }

    // 3. Authenticated but verify Role & Integrity
    if (authStatus === 'authenticated' && !user) {
        console.error('[Guard] Critical State Mismatch: Authenticated but no user data. Forcing logout.');
        // This effectively resets the bad state
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && user) {
        if (!allowedRoles.includes(user.role)) {
            console.warn(`[Guard] User role ${user.role} not authorized. Required: ${allowedRoles}`);
            // Redirect to a safe safe place (Home or Dashboard depending on role)
            // To avoid loops, Home is safest.
            return <Navigate to="/" replace />;
        }
    }

    // 4. Authorized
    return children;
};

export default ProtectedRoute;
