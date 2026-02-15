import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Hero header for Edit Product page
 * Shows product name, status, stats, and quick actions
 */
const HeroHeader = ({ product, lastUpdated }) => {
    const formatTimeAgo = (date) => {
        if (!date) return 'Recently';
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        if (seconds < 60) return `${seconds} secs ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        const days = Math.floor(hours / 24);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    };

    const getStatusConfig = (status) => {
        const configs = {
            active: { emoji: '🟢', text: 'Active', bg: '#d1fae5', color: '#065f46', border: '#6ee7b7' },
            draft: { emoji: '🟡', text: 'Draft', bg: '#fef3c7', color: '#92400e', border: '#fcd34d' },
            archived: { emoji: '⚫', text: 'Archived', bg: '#f3f4f6', color: '#374151', border: '#d1d5db' }
        };
        return configs[status?.toLowerCase()] || configs.draft;
    };

    const statusConfig = getStatusConfig(product?.status || 'draft');

    return (
        <div style={{
            background: 'linear-gradient(to right, #ffffff, #fafafa)',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                {/* Left: Product Info */}
                <div style={{ flex: '1 1 300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <h2 style={{
                            margin: 0,
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#111827'
                        }}>
                            {product?.name || 'Untitled Product'}
                        </h2>
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '600',
                            background: statusConfig.bg,
                            color: statusConfig.color,
                            border: `1px solid ${statusConfig.border}`
                        }}>
                            <span>{statusConfig.emoji}</span>
                            {statusConfig.text}
                        </span>
                    </div>

                    <p style={{
                        margin: '0 0 16px 0',
                        fontSize: '14px',
                        color: '#6b7280'
                    }}>
                        Editing Product · Last updated {formatTimeAgo(lastUpdated)}
                    </p>

                    {/* Quick Stats */}
                    <div style={{
                        display: 'flex',
                        gap: '24px',
                        flexWrap: 'wrap'
                    }}>
                        <div>
                            <div style={{ fontSize: '20px', fontWeight: '700', color: '#111827' }}>
                                {product?.views || 0}
                            </div>
                            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Views
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '20px', fontWeight: '700', color: '#111827' }}>
                                {product?.followers || 0}
                            </div>
                            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Followers
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '20px', fontWeight: '700', color: '#111827' }}>
                                #{product?.rank || '—'}
                            </div>
                            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                Rank
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Quick Actions */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    minWidth: '180px'
                }}>
                    <Link
                        to={`/product/${product?._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: '10px 16px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                            color: '#1e40af',
                            border: '1px solid #bfdbfe',
                            fontWeight: '600',
                            fontSize: '14px',
                            textAlign: 'center',
                            textDecoration: 'none',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                        }}
                    >
                        🌐 View Public Page
                    </Link>
                    <button
                        type="button"
                        style={{
                            padding: '10px 16px',
                            borderRadius: '8px',
                            background: '#f3f4f6',
                            color: '#374151',
                            border: '1px solid #e5e7eb',
                            fontWeight: '600',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onClick={() => {
                            // Future: Show SEO preview modal
                            console.log('Preview SEO clicked');
                        }}
                    >
                        👁️ Preview SEO
                    </button>
                </div>
            </div>
        </div>
    );
};

HeroHeader.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        status: PropTypes.string,
        views: PropTypes.number,
        followers: PropTypes.number,
        rank: PropTypes.number
    }),
    lastUpdated: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
    ])
};

export default HeroHeader;
