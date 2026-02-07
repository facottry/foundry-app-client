import React from 'react';

const LoadingState = ({ message = "Getting things ready" }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            minHeight: '200px', // Ensure visibility
            width: '100%',
            fontFamily: 'inherit', // Inherit brand font
            color: '#4B5563', // Gray-600 - Muted brand foreground
            backgroundColor: 'transparent' // Match parent bg
        }}>
            <div style={{
                width: '12px',
                height: '12px',
                backgroundColor: '#4B5563',
                borderRadius: '50%',
                opacity: 0.6,
                animation: 'pulse 1.5s ease-in-out infinite'
            }}></div>

            <p style={{
                marginTop: '16px',
                fontSize: '0.95rem',
                fontWeight: '500', // Medium
                letterSpacing: '0.03em', // Slightly increased
                opacity: 0.9
            }}>
                {message}
            </p>

            <style>{`
                @keyframes pulse {
                    0% { transform: scale(0.85); opacity: 0.5; }
                    50% { transform: scale(1.15); opacity: 0.8; }
                    100% { transform: scale(0.85); opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};

export default LoadingState;
