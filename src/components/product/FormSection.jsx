import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Collapsible form section wrapper
 * Used to organize form fields into logical groups
 */
const FormSection = ({
    title,
    icon,
    children,
    defaultExpanded = true,
    required = false
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            marginBottom: '20px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            transition: 'box-shadow 0.2s ease'
        }}>
            {/* Section Header */}
            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#fafafa'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {icon && (
                        <span style={{ fontSize: '20px' }}>
                            {icon}
                        </span>
                    )}
                    <h3 style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#111827'
                    }}>
                        {title}
                        {required && (
                            <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>
                        )}
                    </h3>
                </div>

                <span style={{
                    fontSize: '20px',
                    color: '#9ca3af',
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    display: 'inline-block'
                }}>
                    ›
                </span>
            </button>

            {/* Section Content */}
            <div style={{
                maxHeight: isExpanded ? '2000px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease'
            }}>
                <div style={{
                    padding: '0 24px 24px 24px',
                    borderTop: '1px solid #f3f4f6'
                }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

FormSection.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    children: PropTypes.node.isRequired,
    defaultExpanded: PropTypes.bool,
    required: PropTypes.bool
};

export default FormSection;
