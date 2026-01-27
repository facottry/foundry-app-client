import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                color: '#6b7280'
            }}>
                Loading session...
            </div>
        );
    }

    if (!user) {
        // User requested: Redirect to home page if shared url is behind auth
        // We do NOT save the location state to redirect back after login because the user explicitly asked to redirect to HOME.
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // If logged in but wrong role, redirect to their dashboard or home
        // For simplicity, redirect home to avoid loops
        console.warn(`User role ${user.role} not authorized for this route (requires ${allowedRoles})`);
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
