import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import api from '../utils/api';

const VisitRedirect = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);

    const { getTrackUrl, loading: configLoading } = useConfig();

    useEffect(() => {
        // if (configLoading) return; // Removed optimization: Config now has default from ENV
        // We proceed immediately with whatever config we have (env default or fetched)

        const performRedirect = async () => {
            try {
                // Tracking Logic
                // Tracking Logic: Handled by server on redirect (appserver/r/:id)


                // Redirect Logic
                const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                const rootBase = apiBase.replace(/\/api\/?$/, ''); // Strip /api
                const targetUrl = `${rootBase}/r/${id}`;

                window.location.href = targetUrl;

            } catch (err) {
                console.error("Redirect logic error", err);
                setError(err.message || "Could not redirect.");
            }
        };

        performRedirect();
    }, [id, configLoading, getTrackUrl]);

    if (error) {
        return (
            <div style={{ padding: '60px', textAlign: 'center' }}>
                <h3>Unable to visit website</h3>
                <p>Error: {error}</p>
                <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '20px' }}>
                    If this persists, please contact support.
                </div>
                <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ marginRight: '10px' }}>Retry</button>
                <button onClick={() => window.history.back()} className="btn btn-secondary">Go Back</button>
            </div>
        );
    }

    return (
        <div style={{
            height: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666'
        }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }} className="animate-pulse">🚀</div>
            <h2 style={{ marginBottom: '10px', color: '#111' }}>Taking you there...</h2>
            <p>Please wait while we redirect you to the product website.</p>
        </div>
    );
};

export default VisitRedirect;
