import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api';

/**
 * Staffium iframe embed component
 * Handles SSO token generation and secure iframe loading
 */
const StaffiumEmbed = ({
    staffiumUrl = import.meta.env.VITE_STAFFIUM_URL,
    onLoad,
    onError
}) => {
    // Validate URL usage
    if (!staffiumUrl) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '32px'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#991b1b',
                        marginBottom: '8px'
                    }}>Configuration Error</h3>
                    <p style={{ color: '#dc2626' }}>
                        Staffium URL is not configured. Please check your environment variables.
                    </p>
                </div>
            </div>
        );
    }

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [loadTimeout, setLoadTimeout] = useState(false);
    const [tokenLoading, setTokenLoading] = useState(true);
    const [ssoToken, setSsoToken] = useState(null);
    const [tokenError, setTokenError] = useState(null);
    const iframeRef = useRef(null);

    // Fetch SSO token on component mount
    useEffect(() => {
        const fetchSSOToken = async () => {
            try {
                setTokenLoading(true);
                setTokenError(null);

                const response = await api.post('/staffium/token');

                if (response && response.success && response.staffium_token) {
                    setSsoToken(response.staffium_token);
                    setTokenLoading(false);
                } else {
                    throw new Error('Invalid token response');
                }
            } catch (err) {
                console.error('Failed to fetch Staffium SSO token:', err.message);
                setTokenError(err.response?.data?.error || 'Failed to generate access token');
                setTokenLoading(false);
                setError(true);
            }
        };

        fetchSSOToken();
    }, []);


    useEffect(() => {
        // Set a timeout to detect if iframe fails to load
        const timeoutId = setTimeout(() => {
            if (loading) {
                setLoadTimeout(true);
            }
        }, 10000); // 10 second timeout

        return () => clearTimeout(timeoutId);
    }, [loading]);

    const handleLoad = () => {
        setLoading(false);
        setError(false);
        setLoadTimeout(false);
        if (onLoad) onLoad();
    };

    const handleError = (e) => {
        setLoading(false);
        setError(true);
        if (onError) onError(e);
    };

    const openInNewTab = () => {
        window.open(staffiumUrl, '_blank', 'noopener,noreferrer');
    };

    const retryTokenFetch = async () => {
        setError(false);
        setTokenError(null);
        setTokenLoading(true);

        try {
            const response = await api.post('/staffium/token');

            if (response.data && response.data.success && response.data.staffium_token) {
                setSsoToken(response.data.staffium_token);
                setTokenLoading(false);
            } else {
                throw new Error('Invalid token response');
            }
        } catch (err) {
            console.error('Failed to fetch Staffium SSO token:', err.message);
            setTokenError(err.response?.data?.error || 'Failed to generate access token');
            setTokenLoading(false);
            setError(true);
        }
    };

    // Show token loading state
    if (tokenLoading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh - 200px)',
                padding: '40px'
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    border: '4px solid #f3f4f6',
                    borderTop: '4px solid #3b82f6',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <p style={{
                    marginTop: '20px',
                    fontSize: '15px',
                    color: '#6b7280',
                    fontWeight: '500'
                }}>
                    Generating secure access token...
                </p>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    // Show token error state
    if (tokenError || (error && !ssoToken)) {
        const isDisabledError = tokenError && tokenError.includes('disabled');

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh - 200px)',
                padding: '40px',
                textAlign: 'center',
                background: '#fafafa',
                borderRadius: '16px',
                border: '1px solid #e5e7eb'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: isDisabledError ? 'linear-gradient(135deg, #e0e7ff, #c7d2fe)' : 'linear-gradient(135deg, #fee2e2, #fecaca)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '36px',
                    marginBottom: '24px'
                }}>
                    {isDisabledError ? '⚙️' : '🔒'}
                </div>
                <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#111827'
                }}>
                    {isDisabledError ? 'Staffium is Disabled' : 'Access Token Required'}
                </h3>
                <p style={{
                    margin: '0 0 8px 0',
                    fontSize: '15px',
                    color: '#6b7280',
                    maxWidth: '400px',
                    lineHeight: '1.6'
                }}>
                    {tokenError || 'Unable to generate secure access token for Staffium.'}
                </p>
                {isDisabledError ? (
                    <div style={{ marginTop: '20px' }}>
                        <p style={{ marginBottom: '16px', color: '#9ca3af', fontSize: '13px' }}>
                            You can enable this integration in your account settings.
                        </p>
                        <a
                            href="/profile#security"
                            className="btn btn-primary"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                padding: '10px 20px',
                                borderRadius: '8px',
                                background: '#4f46e5',
                                color: 'white',
                                fontWeight: '600'
                            }}
                        >
                            Go to Security Settings
                        </a>
                    </div>
                ) : (
                    <>
                        <p style={{
                            margin: '0 0 24px 0',
                            fontSize: '13px',
                            color: '#9ca3af',
                            maxWidth: '400px'
                        }}>
                            This may be a temporary issue. Please try again.
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={retryTokenFetch}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '8px',
                                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                                    color: '#ffffff',
                                    border: 'none',
                                    fontWeight: '600',
                                    fontSize: '15px',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
                                }}
                            >
                                🔄 Retry
                            </button>
                        </div>
                    </>
                )}
            </div>
        );
    }

    if (error || loadTimeout) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh - 200px)',
                padding: '40px',
                textAlign: 'center',
                background: '#fafafa',
                borderRadius: '16px',
                border: '1px solid #e5e7eb'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #fef3c7, #fed7aa)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '36px',
                    marginBottom: '24px'
                }}>
                    ⚠️
                </div>
                <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#111827'
                }}>
                    {loadTimeout ? 'Taking longer than expected' : 'Unable to load Staffium'}
                </h3>
                <p style={{
                    margin: '0 0 24px 0',
                    fontSize: '15px',
                    color: '#6b7280',
                    maxWidth: '400px',
                    lineHeight: '1.6'
                }}>
                    {loadTimeout
                        ? 'Staffium is taking longer than usual to load. You can wait or open it in a new tab.'
                        : 'There was a problem loading Staffium. Try opening it in a new tab instead.'}
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                    {loadTimeout && (
                        <button
                            onClick={() => {
                                setLoadTimeout(false);
                                setLoading(true);
                                // Force iframe reload
                                if (iframeRef.current) {
                                    iframeRef.current.src = iframeRef.current.src;
                                }
                            }}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '8px',
                                background: '#f3f4f6',
                                color: '#374151',
                                border: '1px solid #e5e7eb',
                                fontWeight: '600',
                                fontSize: '15px',
                                cursor: 'pointer'
                            }}
                        >
                            Keep Waiting
                        </button>
                    )}
                    <button
                        onClick={openInNewTab}
                        style={{
                            padding: '12px 24px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                            color: '#ffffff',
                            border: 'none',
                            fontWeight: '600',
                            fontSize: '15px',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
                        }}
                    >
                        Open Staffium in New Tab →
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            {/* Loading Shimmer */}
            {loading && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 'calc(100vh - 180px)',
                    background: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    padding: '24px',
                    zIndex: 10
                }}>
                    {/* Shimmer Header */}
                    <div style={{
                        height: '60px',
                        background: 'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.5s infinite',
                        borderRadius: '8px',
                        marginBottom: '24px'
                    }} />

                    {/* Shimmer Content Blocks */}
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{ marginBottom: '20px' }}>
                            <div style={{
                                height: '24px',
                                width: '30%',
                                background: 'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)',
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 1.5s infinite',
                                borderRadius: '4px',
                                marginBottom: '12px'
                            }} />
                            <div style={{
                                height: '100px',
                                background: 'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)',
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 1.5s infinite',
                                borderRadius: '8px'
                            }} />
                        </div>
                    ))}

                    {/* Loading Text */}
                    <div style={{
                        textAlign: 'center',
                        marginTop: '40px',
                        fontSize: '14px',
                        color: '#6b7280'
                    }}>
                        <div style={{ marginBottom: '8px' }}>⏳ Loading Staffium...</div>
                        <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                            This should only take a moment
                        </div>
                    </div>

                    {/* Add shimmer animation */}
                    <style>{`
                        @keyframes shimmer {
                            0% { background-position: 200% 0; }
                            100% { background-position: -200% 0; }
                        }
                    `}</style>
                </div>
            )}

            {/* Iframe Container */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: 'calc(100vh - 180px)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                background: '#ffffff',
                opacity: loading ? 0 : 1,
                transition: 'opacity 0.3s ease'
            }}>
                {/* Open in New Tab Button */}
                {!loading && (
                    <button
                        onClick={openInNewTab}
                        style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            background: 'rgba(255, 255, 255, 0.95)',
                            color: '#374151',
                            border: '1px solid #e5e7eb',
                            fontWeight: '500',
                            fontSize: '13px',
                            cursor: 'pointer',
                            zIndex: 100,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#ffffff';
                            e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                            e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                        }}
                        title="Open Staffium in new tab"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Open in New Tab
                    </button>
                )}

                {/* Iframe */}
                <iframe
                    ref={iframeRef}
                    src={`${staffiumUrl}?staffium_token=${ssoToken}`}
                    title="Staffium"
                    onLoad={handleLoad}
                    onError={handleError}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        display: 'block'
                    }}
                    allow="clipboard-write; clipboard-read"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                />
            </div>
        </div>
    );
};

StaffiumEmbed.propTypes = {
    staffiumUrl: PropTypes.string,
    onLoad: PropTypes.func,
    onError: PropTypes.func
};

export default StaffiumEmbed;
