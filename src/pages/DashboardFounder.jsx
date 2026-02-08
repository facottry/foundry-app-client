import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { getImageUrl } from '../utils/getImageUrl';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import SEO from '../components/SEO';

import EditTeamModal from '../components/products/EditTeamModal';

const DashboardFounder = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTeamProduct, setEditingTeamProduct] = useState(null);

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
                        <div className="card" style={{ padding: '0', overflowX: 'auto', borderTop: '4px solid var(--accent-primary)' }}>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th style={{ paddingLeft: '24px' }}>Product</th>
                                        <th style={{ textAlign: 'center', color: 'var(--text-muted)', fontWeight: '500' }}>Followers</th>
                                        <th style={{ textAlign: 'right' }}>Clicks (Today/Total)</th>
                                        <th>Status</th>
                                        <th style={{ textAlign: 'right', paddingRight: '24px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.products.map(product => (
                                        <tr key={product._id}>
                                            <td style={{ paddingLeft: '24px' }}>
                                                <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '1rem' }}>{product.name}</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{product.tagline}</div>
                                            </td>
                                            <td style={{ textAlign: 'center', fontWeight: '500', color: 'var(--text-muted)' }}>
                                                {product.follower_count || 0}
                                            </td>
                                            <td style={{ textAlign: 'right', fontWeight: '500' }}>
                                                <span style={{ color: 'var(--text-primary)' }}>{product.clicks_today}</span>
                                                <span style={{ color: 'var(--text-muted)', margin: '0 4px' }}>/</span>
                                                <span style={{ color: 'var(--text-secondary)' }}>{product.total_clicks}</span>
                                            </td>
                                            <td>
                                                <span className={`badge ${product.boost_status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                                                    {product.boost_status}
                                                </span>
                                            </td>
                                            <td style={{ textAlign: 'right', paddingRight: '24px' }}>
                                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                    <Link to={`/product/${product._id}`} className="btn btn-secondary" style={{ padding: '6px 16px', fontSize: '0.85rem', borderRadius: '8px' }}>View</Link>
                                                    <Link to={`/founder/products/${product._id}/edit`} className="btn btn-secondary" style={{ padding: '6px 16px', fontSize: '0.85rem', borderRadius: '8px', background: '#f3f4f6', color: '#374151' }}>Edit</Link>
                                                    <Link to={`/boost/${product._id}`} style={{
                                                        padding: '6px 16px',
                                                        fontSize: '0.85rem',
                                                        borderRadius: '8px',
                                                        background: '#FFF7ED', // Matches promoted badge base roughly
                                                        color: '#C2410C',
                                                        border: '1px solid #FFEDD5',
                                                        fontWeight: '600'
                                                    }}>
                                                        Boost
                                                    </Link>
                                                    <button
                                                        onClick={() => setEditingTeamProduct(product)}
                                                        className="btn"
                                                        style={{ padding: '6px 12px', fontSize: '0.85rem', background: '#f3f4f6', color: '#4b5563', border: '1px solid #e5e7eb' }}
                                                        title="Manage Team"
                                                    >
                                                        👥
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
        </div >
    );
};

export default DashboardFounder;
