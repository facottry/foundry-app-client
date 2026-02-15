import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { getImageUrl } from '../utils/getImageUrl';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import SEO from '../components/SEO';

import EditTeamModal from '../components/products/EditTeamModal';
import StaffiumEmbed from '../components/staffium/StaffiumEmbed';

const DashboardFounder = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTeamProduct, setEditingTeamProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('overview'); // Tab navigation state

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get('/founder/dashboard');
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} onRetry={fetchData} />;
    // data defaults to null if empty, handle gracefully in render or check !data above

    return (
        <div style={{ paddingTop: '40px' }}>
            <SEO title="Founder Dashboard" noindex={true} />
            {/* Header Section - Dashboard Hero (+5%) */}
            <div style={{
                background: 'linear-gradient(to bottom, #FAF9F6, #FFFFFF)',
                padding: '40px 32px',
                borderRadius: '16px',
                marginBottom: '56px', // Increased spacing (+3%)
                border: '1px solid rgba(0,0,0,0.02)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
                    <div>
                        <h1 style={{ marginBottom: '12px', fontSize: '2.2rem', letterSpacing: '-0.03em' }}>Founder Dashboard</h1>
                        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '480px', lineHeight: '1.6' }}>
                            Welcome back. Here's how your products are performing.
                        </p>
                    </div>
                    {/* Primary Action Promoted (+4%) */}
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Link to={`/founder/${data?.user?.slug || data?.user?._id}`} target="_blank" className="btn" style={{
                            padding: '12px 24px',
                            fontSize: '0.95rem',
                            background: 'transparent',
                            border: '1px solid #E5E5E5',
                            color: 'var(--text-secondary)',
                            fontWeight: '500'
                        }}>
                            View Public Profile
                        </Link>
                        <Link to="/create-product" className="btn btn-primary" style={{
                            padding: '14px 28px',
                            fontSize: '1rem',
                            boxShadow: '0 4px 12px rgba(217, 119, 87, 0.25)'
                        }}>
                            + Launch Product
                        </Link>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                gap: '8px',
                borderBottom: '2px solid #f3f4f6',
                marginBottom: '32px',
                overflowX: 'auto'
            }}>
                {[
                    { id: 'overview', label: '📊 Overview', icon: null },
                    { id: 'products', label: '📦 Products', icon: null },
                    { id: 'staffium', label: '🛠 Staffium', icon: null }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '14px 24px',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === tab.id ? '3px solid' : '3px solid transparent',
                            borderImage: activeTab === tab.id ? 'linear-gradient(90deg, #3b82f6, #2563eb) 1' : 'none',
                            color: activeTab === tab.id ? '#111827' : '#6b7280',
                            fontWeight: activeTab === tab.id ? '600' : '500',
                            fontSize: '15px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => {
                            if (activeTab !== tab.id) {
                                e.target.style.color = '#374151';
                                e.target.style.borderBottomColor = '#e5e7eb';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (activeTab !== tab.id) {
                                e.target.style.color = '#6b7280';
                                e.target.style.borderBottomColor = 'transparent';
                            }
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'staffium' ? (
                <StaffiumEmbed staffiumUrl={import.meta.env.VITE_STAFFIUM_URL || "https://staffium.clicktory.in"} />
            ) : (
                <div className="dashboard-grid">

                    {/* Main Content: Product List */}
                    <div>
                        <h3 style={{ marginBottom: '24px' }}>My Products</h3>

                        {(!data?.products || data.products.length === 0) ? (
                            <EmptyState
                                title="No products yet"
                                subtext="Your journey starts here. List your first product to get traffic."
                                action={<Link to="/create-product" className="btn btn-primary">Launch Now</Link>}
                            />
                        ) : (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                                gap: '24px',
                                marginTop: '8px'
                            }}>
                                {data.products.map(product => (
                                    <div
                                        key={product._id}
                                        className="card"
                                        style={{
                                            background: 'linear-gradient(to bottom right, #ffffff, #fafafa)',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '16px',
                                            padding: '24px',
                                            transition: 'all 0.3s ease',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                                            e.currentTarget.style.borderColor = '#d1d5db';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                                            e.currentTarget.style.borderColor = '#e5e7eb';
                                        }}
                                    >
                                        {/* Top accent bar */}
                                        <div style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: '4px',
                                            background: product.boost_status === 'Active'
                                                ? 'linear-gradient(90deg, #10b981, #34d399)'
                                                : 'linear-gradient(90deg, #d1d5db, #9ca3af)'
                                        }} />

                                        {/* Logo + Name */}
                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                                            <div style={{
                                                width: '64px',
                                                height: '64px',
                                                borderRadius: '12px',
                                                background: '#f3f4f6',
                                                overflow: 'hidden',
                                                flexShrink: 0,
                                                border: '2px solid #e5e7eb'
                                            }}>
                                                {getImageUrl(product.logoKey || product.logo_url) ? (
                                                    <img
                                                        src={getImageUrl(product.logoKey || product.logo_url)}
                                                        alt={product.name}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        onError={(e) => e.target.style.display = 'none'}
                                                    />
                                                ) : (
                                                    <div style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontWeight: 'bold',
                                                        fontSize: '1.5rem',
                                                        color: '#6b7280',
                                                        background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)'
                                                    }}>
                                                        {product.name.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <h4 style={{
                                                    fontWeight: '700',
                                                    color: '#111827',
                                                    fontSize: '1.1rem',
                                                    marginBottom: '6px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}>
                                                    {product.name}
                                                </h4>
                                                <p style={{
                                                    fontSize: '0.875rem',
                                                    color: '#6b7280',
                                                    marginBottom: '0',
                                                    lineHeight: '1.4',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical'
                                                }}>
                                                    {product.tagline || 'No tagline yet'}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Metrics */}
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(3, 1fr)',
                                            gap: '12px',
                                            marginBottom: '20px',
                                            padding: '16px',
                                            background: '#f9fafb',
                                            borderRadius: '12px',
                                            border: '1px solid #f3f4f6'
                                        }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '1.25rem', marginBottom: '4px' }}>👥</div>
                                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '2px' }}>
                                                    {product.follower_count || 0}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                    Followers
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '1.25rem', marginBottom: '4px' }}>👆</div>
                                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '2px' }}>
                                                    {product.clicks_today || 0}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                    Today
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '1.25rem', marginBottom: '4px' }}>📊</div>
                                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '2px' }}>
                                                    {product.total_clicks || 0}
                                                </div>
                                                <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                    Total
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                padding: '8px 16px',
                                                borderRadius: '8px',
                                                fontSize: '0.875rem',
                                                fontWeight: '600',
                                                background: product.boost_status === 'Active'
                                                    ? 'linear-gradient(135deg, #d1fae5, #a7f3d0)'
                                                    : 'linear-gradient(135deg, #fef3c7, #fde68a)',
                                                color: product.boost_status === 'Active' ? '#065f46' : '#92400e',
                                                border: `1px solid ${product.boost_status === 'Active' ? '#6ee7b7' : '#fcd34d'}`,
                                                textTransform: 'capitalize'
                                            }}>
                                                <span>{product.boost_status === 'Active' ? '🟢' : '🟡'}</span>
                                                {product.boost_status}
                                            </span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
                                            <Link
                                                to={`/product/${product._id}`}
                                                className="btn btn-secondary"
                                                style={{
                                                    padding: '10px 12px',
                                                    fontSize: '0.8rem',
                                                    borderRadius: '8px',
                                                    background: '#f3f4f6',
                                                    color: '#374151',
                                                    fontWeight: '600',
                                                    textAlign: 'center',
                                                    textDecoration: 'none',
                                                    border: '1px solid #e5e7eb'
                                                }}
                                            >
                                                👁️ View
                                            </Link>
                                            <Link
                                                to={`/founder/products/${product._id}/edit`}
                                                className="btn btn-secondary"
                                                style={{
                                                    padding: '10px 12px',
                                                    fontSize: '0.8rem',
                                                    borderRadius: '8px',
                                                    background: '#f3f4f6',
                                                    color: '#374151',
                                                    fontWeight: '600',
                                                    textAlign: 'center',
                                                    textDecoration: 'none',
                                                    border: '1px solid #e5e7eb'
                                                }}
                                            >
                                                ✏️ Edit
                                            </Link>
                                            <Link
                                                to={`/analytics/product/${product._id}`}
                                                className="btn"
                                                style={{
                                                    padding: '10px 12px',
                                                    fontSize: '0.8rem',
                                                    borderRadius: '8px',
                                                    background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                                                    color: '#1e40af',
                                                    fontWeight: '600',
                                                    textAlign: 'center',
                                                    textDecoration: 'none',
                                                    border: '1px solid #bfdbfe',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '4px'
                                                }}
                                            >
                                                📊
                                            </Link>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                                            <Link
                                                to={`/boost/${product._id}`}
                                                style={{
                                                    padding: '10px 12px',
                                                    fontSize: '0.8rem',
                                                    borderRadius: '8px',
                                                    background: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
                                                    color: '#c2410c',
                                                    border: '1px solid #fed7aa',
                                                    fontWeight: '600',
                                                    textAlign: 'center',
                                                    textDecoration: 'none',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '4px'
                                                }}
                                            >
                                                ⚡ Boost
                                            </Link>
                                            <Link
                                                to={`/product/${product._id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    padding: '10px 12px',
                                                    fontSize: '0.8rem',
                                                    borderRadius: '8px',
                                                    background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                                                    color: '#166534',
                                                    border: '1px solid #bbf7d0',
                                                    fontWeight: '600',
                                                    textAlign: 'center',
                                                    textDecoration: 'none',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '4px'
                                                }}
                                                title="View Public Profile"
                                            >
                                                🌐
                                            </Link>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditingTeamProduct(product);
                                                }}
                                                className="btn"
                                                style={{
                                                    padding: '10px 12px',
                                                    fontSize: '1rem',
                                                    background: '#f3f4f6',
                                                    color: '#4b5563',
                                                    border: '1px solid #e5e7eb',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer'
                                                }}
                                                title="Manage Team"
                                            >
                                                👥
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Wallet & Info Strips */}
                    <div className="dashboard-sidebar-group">
                        {/* Wallet Card */}
                        <div>
                            <h3 style={{ marginBottom: '24px' }}>Wallet</h3>
                            <div className="card" style={{
                                background: '#FAFAFA',
                                border: '1px solid #E5E5E5',
                                padding: '32px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Credit Balance
                                    </div>
                                    <span style={{
                                        background: '#E6F4EA',
                                        color: '#1E6F3E',
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        letterSpacing: '0.02em',
                                        textTransform: 'uppercase'
                                    }}>
                                        Active
                                    </span>
                                </div>
                                <div style={{ fontSize: '3.8rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '0.9', marginBottom: '12px', letterSpacing: '-0.04em' }}>
                                    {data?.balance || 0}
                                </div>
                                <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '32px' }}>
                                    Available Credits
                                </div>

                                <Link to="/wallet" className="btn" style={{
                                    width: '100%',
                                    background: '#F5F5F4',
                                    color: '#444',
                                    justifyContent: 'center',
                                    fontWeight: '600'
                                }}>
                                    Manage Wallet
                                </Link>
                            </div>
                        </div>

                        {/* Did you know? - Info Strip */}
                        <div className="info-strip" style={{
                            padding: '24px 32px', // More horizontal padding 
                            background: '#F0F9FF',
                            borderRadius: '12px',
                            // Reduced vertical rhythm internal
                        }}>
                            <h4 style={{ fontSize: '0.95rem', color: '#0369A1', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>💡</span> Did you know?
                            </h4>
                            <p style={{
                                fontSize: '0.95rem',
                                color: '#0C4A6E',
                                marginBottom: '0',
                                lineHeight: '1.5', // Reduced line-height
                                maxWidth: '100%' // Let text breathe
                            }}>
                                Products with active Boost campaigns get 3x more visibility on category pages.
                            </p>
                        </div>

                        {/* AI Assistants - Info Strip */}
                        <div className="info-strip" style={{
                            padding: '24px 32px',
                            background: 'linear-gradient(135deg, #f0f0ff 0%, #e8f4f8 100%)',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                                <div style={{ flex: 1, minWidth: '200px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '20px' }}>🤖</span>
                                        <h4 style={{ fontSize: '0.95rem', color: '#1e1e2e', marginBottom: '0', fontWeight: '700' }}>AI Assistants</h4>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '0', lineHeight: '1.4' }}>
                                        AIRA & REX help you track and decide.
                                    </p>
                                </div>
                                <Link to="/profile#ai-assistants" className="btn" style={{
                                    background: '#6366f1',
                                    color: 'white',
                                    justifyContent: 'center',
                                    fontWeight: '600',
                                    borderRadius: '8px',
                                    padding: '8px 16px',
                                    fontSize: '0.85rem',
                                    whiteSpace: 'nowrap'
                                }}>

                                    Manage
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

            )}

            {
                editingTeamProduct && (
                    <EditTeamModal
                        product={editingTeamProduct}
                        onClose={() => setEditingTeamProduct(null)}
                        onSave={(updatedProduct) => {
                            // Update local state
                            const newData = { ...data };
                            const idx = newData.products.findIndex(p => p._id === updatedProduct._id);
                            if (idx !== -1) newData.products[idx] = updatedProduct;
                            setData(newData);
                        }}
                    />
                )
            }
        </div>
    );
};

export default DashboardFounder;
