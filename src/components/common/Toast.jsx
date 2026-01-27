import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const isSuccess = type === 'success';

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            zIndex: 9999,
            animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            borderLeft: `4px solid ${isSuccess ? '#10b981' : '#ef4444'}`
        }}>
            <span style={{ fontSize: '1.5rem' }}>{isSuccess ? '✨' : '🗑️'}</span>
            <div>
                <div style={{ fontWeight: '600', color: '#111827', fontSize: '0.95rem' }}>
                    {isSuccess ? 'Success' : 'Removed'}
                </div>
                <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>{message}</div>
            </div>
            <style>{`
                @keyframes slideIn {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Toast;
