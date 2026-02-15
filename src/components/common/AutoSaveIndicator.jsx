import React from 'react';
import PropTypes from 'prop-types';

/**
 * Auto-save indicator component
 * Shows saving/saved status with smooth transitions
 */
const AutoSaveIndicator = ({ status }) => {
    if (status === 'idle') return null;

    const config = {
        saving: {
            text: 'Saving...',
            color: '#6b7280',
            icon: '⏳'
        },
        saved: {
            text: 'Saved',
            color: '#10b981',
            icon: '✓'
        },
        error: {
            text: 'Save failed',
            color: '#ef4444',
            icon: '⚠'
        }
    };

    const current = config[status] || config.idle;

    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '6px',
            background: '#f9fafb',
            fontSize: '13px',
            fontWeight: '500',
            color: current.color,
            transition: 'all 0.3s ease',
            animation: status === 'saved' ? 'fadeIn 0.3s ease' : 'none'
        }}>
            <span>{current.icon}</span>
            <span>{current.text}</span>
        </div>
    );
};

AutoSaveIndicator.propTypes = {
    status: PropTypes.oneOf(['idle', 'saving', 'saved', 'error']).isRequired
};

export default AutoSaveIndicator;
