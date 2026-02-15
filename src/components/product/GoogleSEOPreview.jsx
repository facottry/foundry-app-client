import React from 'react';
import PropTypes from 'prop-types';

/**
 * Google SEO preview component
 * Shows how product will appear in Google search results
 */
const GoogleSEOPreview = ({ formData }) => {
    const title = formData.name || 'Product Name';
    const description = formData.description || 'Product description will appear here...';
    const slug = formData.slug || (formData.name?.toLowerCase().replace(/\s+/g, '-') || 'product-slug');

    const maxTitleLength = 60;
    const maxDescriptionLength = 160;

    const getTitleStatus = () => {
        const len = title.length;
        if (len === 0) return { color: '#ef4444', text: 'Missing' };
        if (len < 30) return { color: '#f59e0b', text: 'Too short' };
        if (len > maxTitleLength) return { color: '#ef4444', text: 'Too long' };
        return { color: '#10b981', text: 'Good' };
    };

    const getDescriptionStatus = () => {
        const len = description.length;
        if (len === 0) return { color: '#ef4444', text: 'Missing' };
        if (len < 70) return { color: '#f59e0b', text: 'Too short' };
        if (len > maxDescriptionLength) return { color: '#ef4444', text: 'Too long' };
        return { color: '#10b981', text: 'Good' };
    };

    const titleStatus = getTitleStatus();
    const descStatus = getDescriptionStatus();

    return (
        <div style={{
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            marginBottom: '20px'
        }}>
            <h4 style={{
                margin: '0 0 16px 0',
                fontSize: '14px',
                fontWeight: '600',
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
            }}>
                Google Preview
            </h4>

            {/* Google Search Result Preview */}
            <div style={{
                background: '#fafafa',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '16px'
            }}>
                {/* URL */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '8px'
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <div>
                        <div style={{ fontSize: '12px', color: '#374151' }}>
                            clicktory.in
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                            clicktory.in › product › {slug}
                        </div>
                    </div>
                </div>

                {/* Title */}
                <div style={{ marginBottom: '8px' }}>
                    <h3 style={{
                        margin: '0 0 4px 0',
                        fontSize: '18px',
                        fontWeight: '400',
                        color: '#1a0dab',
                        lineHeight: '1.3',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {title}
                    </h3>
                    <div style={{
                        fontSize: '11px',
                        color: titleStatus.color,
                        fontWeight: '500'
                    }}>
                        {title.length}/{maxTitleLength} chars · {titleStatus.text}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <p style={{
                        margin: '0 0 4px 0',
                        fontSize: '13px',
                        color: '#545454',
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {description}
                    </p>
                    <div style={{
                        fontSize: '11px',
                        color: descStatus.color,
                        fontWeight: '500'
                    }}>
                        {description.length}/{maxDescriptionLength} chars · {descStatus.text}
                    </div>
                </div>
            </div>

            {/* SEO Tips */}
            <div style={{
                marginTop: '12px',
                padding: '12px',
                background: '#f0f9ff',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#1e40af'
            }}>
                💡 <strong>Tip:</strong> Keep titles 50-60 chars and descriptions 120-160 chars for best results.
            </div>
        </div>
    );
};

GoogleSEOPreview.propTypes = {
    formData: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        slug: PropTypes.string
    }).isRequired
};

export default GoogleSEOPreview;
