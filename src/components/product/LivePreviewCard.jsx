import React from 'react';
import PropTypes from 'prop-types';
import { getImageUrl } from '../../utils/getImageUrl';

/**
 * Live preview card component
 * Shows how the product will appear in listings
 * Updates in real-time as form changes
 */
const LivePreviewCard = ({ formData }) => {
    const getCategoryColor = (category) => {
        const colors = {
            SaaS: { bg: '#eff6ff', text: '#1e40af', border: '#bfdbfe' },
            DevTools: { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0' },
            Productivity: { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
            Marketing: { bg: '#fce7f3', text: '#9f1239', border: '#fbcfe8' },
            AI: { bg: '#f3e8ff', text: '#6b21a8', border: '#e9d5ff' }
        };
        return colors[category] || colors.SaaS;
    };

    const categoryStyle = getCategoryColor(formData.category);

    return (
        <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
            <h4 style={{
                margin: '0 0 16px 0',
                fontSize: '14px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
            }}>
                Live Preview
            </h4>

            {/* Product Card Preview */}
            <div style={{
                background: 'linear-gradient(to bottom right, #ffffff, #fafafa)',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                transition: 'all 0.3s ease'
            }}>
                {/* Logo + Name */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '8px',
                        background: formData.logo_url
                            ? `url(${formData.logo_url}) center/cover`
                            : 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        fontWeight: '700',
                        color: '#6b7280',
                        border: '1px solid #e5e7eb',
                        flexShrink: 0
                    }}>
                        {!formData.logo_url && (formData.name?.charAt(0)?.toUpperCase() || '?')}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                        <h5 style={{
                            margin: '0 0 4px 0',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#111827',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {formData.name || 'Product Name'}
                        </h5>
                        <p style={{
                            margin: 0,
                            fontSize: '13px',
                            color: '#6b7280',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {formData.tagline || 'Tagline appears here'}
                        </p>
                    </div>
                </div>

                {/* Category Badge */}
                {formData.category && (
                    <div style={{ marginBottom: '12px' }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600',
                            background: categoryStyle.bg,
                            color: categoryStyle.text,
                            border: `1px solid ${categoryStyle.border}`
                        }}>
                            {formData.category}
                        </span>
                    </div>
                )}

                {/* Description */}
                <p style={{
                    margin: '0 0 12px 0',
                    fontSize: '14px',
                    color: '#374151',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {formData.description || 'Description will appear here...'}
                </p>

                {/* Visit Button */}
                <div style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '600',
                    textAlign: 'center',
                    border: 'none'
                }}>
                    Visit Website →
                </div>
            </div>
        </div>
    );
};

LivePreviewCard.propTypes = {
    formData: PropTypes.shape({
        name: PropTypes.string,
        tagline: PropTypes.string,
        description: PropTypes.string,
        category: PropTypes.string,
        logo_url: PropTypes.string
    }).isRequired
};

export default LivePreviewCard;
