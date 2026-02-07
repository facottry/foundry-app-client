import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { getImageUrl } from '../utils/getImageUrl';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import EditTeamModal from '../components/products/EditTeamModal';

import ProductVerificationModal from '../components/products/ProductVerificationModal';

const FounderProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [verifyingProduct, setVerifyingProduct] = useState(null); // Product being verified

    const navigate = useNavigate();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await api.get('/founder/products');
            setProducts(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await api.delete(`/founder/products/${id}`);
            setProducts(products.filter(p => p._id !== id));
        } catch (err) {
            alert('Failed to delete product');
        }
    };

    const handleArchive = async (id) => {
        try {
            const res = await api.patch(`/founder/products/${id}/archive`);
            setProducts(products.map(p => p._id === id ? res.data : p));
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const handleVerificationSuccess = (productId) => {
        // Refetch or update local state
        setProducts(products.map(p => p._id === productId ? { ...p, verified_status: 'verified' } : p));
    };

    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} onRetry={fetchProducts} />;

    return (
        <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ marginBottom: '8px' }}>My Products</h1>
                    <p style={{ color: '#666' }}>Manage your portfolio and track performance.</p>
                </div>
                <Link to="/create-product" className="btn btn-primary">
                    + New Product
                </Link>
            </div>

            {products.length === 0 ? (
                <EmptyState
                    title="No products found"
                    subtext="Start your journey by creating your first product."
                    action={<Link to="/create-product" className="btn btn-primary">Create Product</Link>}
                />
            ) : (
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="data-table">
                        <thead style={{ background: '#f9fafb' }}>
                            <tr>
                                <th style={{ padding: '16px 24px' }}>Product</th>
                                <th style={{ padding: '16px 24px' }}>Status</th>
                                <th style={{ padding: '16px 24px', textAlign: 'right' }}>Stats (Total)</th>
                                <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#f3f4f6', overflow: 'hidden' }}>
                                                {getImageUrl(product.logoKey || product.logo_url) ? (
                                                    <img src={getImageUrl(product.logoKey || product.logo_url)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#9ca3af' }}>{product.name.charAt(0)}</div>
                                                )}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '600', color: '#111827', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                    {product.name}
                                                    {product.verified_status === 'verified' && (
                                                        <span title="Verified" style={{ color: '#10B981', fontSize: '1rem' }}>✓</span>
                                                    )}
                                                </div>
                                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                    <a href={`/product/${product._id}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: '#3b82f6', textDecoration: 'none' }}>View Public Page</a>
                                                    <button
                                                        onClick={() => {
                                                            const url = `https://www.clicktory.in/product/${product._id}`;
                                                            navigator.clipboard.writeText(url);
                                                            alert('Product URL copied to clipboard!');
                                                        }}
                                                        style={{ background: 'none', border: 'none', color: '#6366f1', fontSize: '0.85rem', cursor: 'pointer', padding: 0, textDecoration: 'none' }}
                                                    >
                                                        Share
                                                    </button>
                                                    {product.verified_status !== 'verified' && (
                                                        <button
                                                            onClick={() => setVerifyingProduct(product)}
                                                            style={{ background: 'none', border: 'none', color: '#F59E0B', fontSize: '0.8rem', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                                                        >
                                                            Verify Now
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span className={`badge ${product.status === 'approved' ? 'badge-active' :
                                            product.status === 'archived' ? 'badge-inactive' : 'badge-warning'
                                            }`} style={{ textTransform: 'capitalize' }}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right', color: '#6b7280', fontSize: '0.9rem' }}>
                                        ---
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                            <Link to={`/analytics/product/${product._id}`} className="btn" style={{ fontSize: '0.85rem', padding: '6px 12px', background: '#eff6ff', color: '#1d4ed8' }}>
                                                Analytics
                                            </Link>
                                            <Link to={`/founder/products/${product._id}/edit`} className="btn" style={{ fontSize: '0.85rem', padding: '6px 12px', background: '#f3f4f6', color: '#374151' }}>
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleArchive(product._id)}
                                                className="btn"
                                                style={{ fontSize: '0.85rem', padding: '6px 12px', background: '#f3f4f6', color: '#374151' }}
                                                title={product.status === 'archived' ? "Restore" : "Archive"}
                                            >
                                                {product.status === 'archived' ? 'Restore' : 'Archive'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="btn"
                                                style={{ fontSize: '0.85rem', padding: '6px 12px', background: '#fee2e2', color: '#991b1b' }}
                                                title="Delete"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {verifyingProduct && (
                <ProductVerificationModal
                    product={verifyingProduct}
                    onClose={() => setVerifyingProduct(null)}
                    onSuccess={handleVerificationSuccess}
                />
            )}
        </div>
    );
};

export default FounderProductsPage;
