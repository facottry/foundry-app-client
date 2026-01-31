import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { getImageUrl } from '../utils/getImageUrl';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';

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
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ marginBottom: '8px' }}>Founder Dashboard</h1>
                    <p style={{ fontSize: '1.05rem' }}>Welcome back. Here's how your products are performing.</p>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <Link to={`/founder/${data?.user?.slug || data?.user?._id}`} target="_blank" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                        View Public Profile
                    </Link>
                    <Link to="/create-product" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
                        + Launch Product
                    </Link>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '32px', alignItems: 'start' }}>

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
                        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th style={{ textAlign: 'right' }}>Clicks (Today/Total)</th>
                                        <th>Status</th>
                                        <th style={{ textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.products.map(product => (
                                        <tr key={product._id}>
                                            <td>
                                                <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '1rem' }}>{product.name}</div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{product.tagline}</div>
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
                                            <td style={{ textAlign: 'right' }}>
                                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                    <Link to={`/product/${product._id}`} className="btn btn-secondary" style={{ padding: '6px 16px', fontSize: '0.85rem', borderRadius: '8px' }}>View</Link>
                                                    <Link to={`/founder/products/${product._id}/edit`} className="btn btn-secondary" style={{ padding: '6px 16px', fontSize: '0.85rem', borderRadius: '8px', background: '#f3f4f6', color: '#374151' }}>Edit</Link>
                                                    <Link to={`/boost/${product._id}`} style={{
                                                        padding: '6px 16px',
                                                        fontSize: '0.85rem',
                                                        borderRadius: '8px',
                                                        background: '#FFF3E0',
                                                        color: '#E65100',
                                                        border: '1px solid #FFE0B2',
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

                {/* Sidebar: Wallet Card */}
                <div>
                    <h3 style={{ marginBottom: '24px' }}>Wallet</h3>
                    <div className="card" style={{
                        background: 'linear-gradient(135deg, #FAF9F6 0%, #FFFFFF 100%)', // Subtle gradient
                        border: '1px solid #EAEAEA'
                    }}>
                        <div style={{ marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Credit Balance
                        </div>
                        <div style={{ fontSize: '3.5rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1', marginBottom: '8px' }}>
                            {data?.balance || 0}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
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

                    {/* Helpful Tip (Optional Polish) */}
                    <div style={{ padding: '20px', background: '#F0F9FF', borderRadius: '12px', marginTop: '24px' }}>
                        <h4 style={{ fontSize: '1rem', color: '#0369A1', marginBottom: '8px' }}>Did you know?</h4>
                        <p style={{ fontSize: '0.9rem', color: '#0C4A6E', marginBottom: '0' }}>
                            Products with active Boost campaigns get 3x more visibility on category pages.
                        </p>
                    </div>

                    {/* AI Assistants Card */}
                    <div style={{ padding: '20px', background: 'linear-gradient(135deg, #f0f0ff 0%, #e8f4f8 100%)', borderRadius: '12px', marginTop: '24px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '24px' }}>🤖</span>
                            <h4 style={{ fontSize: '1rem', color: '#1e1e2e', marginBottom: '0' }}>AI Assistants</h4>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>
                            AIRA & REX - Your record keeper and decision advisor.
                        </p>
                        <Link to="/founder/ai-assistants" className="btn" style={{
                            width: '100%',
                            background: '#6366f1',
                            color: 'white',
                            justifyContent: 'center',
                            fontWeight: '600',
                            borderRadius: '8px',
                            padding: '10px 16px'
                        }}>
                            Manage AI Assistants
                        </Link>
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
