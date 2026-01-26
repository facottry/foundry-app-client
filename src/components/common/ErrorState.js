import React from 'react';

const ErrorState = ({ error, onRetry }) => {
    // Extract message or fallback
    const message = error?.response?.data?.error?.message || error?.message || 'An unexpected error occurred';

    return (
        <div style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            color: '#991B1B', // Red-800
            marginBottom: '20px',
            fontSize: '0.95rem'
        }}>
            {/* Error Icon (SVG) */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ width: '20px', height: '20px', marginTop: '2px', flexShrink: 0 }}
            >
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
            </svg>

            <div style={{ flex: 1 }}>
                <strong style={{ display: 'block', marginBottom: '4px', fontSize: '1rem' }}>
                    Error
                </strong>
                <span style={{ lineHeight: '1.4' }}>
                    {message}
                </span>

                {onRetry && (
                    <div style={{ marginTop: '12px' }}>
                        <button
                            onClick={onRetry}
                            style={{
                                background: 'transparent',
                                border: '1px solid #991B1B',
                                color: '#991B1B',
                                borderRadius: '4px',
                                padding: '4px 12px',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: '600'
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ErrorState;
