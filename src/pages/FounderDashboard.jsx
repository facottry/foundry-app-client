import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const FounderDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/founder/products');
            setProducts(res.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setLoading(false);
    };

    const handleDelete = async (productId) => {
        try {
            await api.delete(`/products/${productId}`);
            setDeleteModal(null);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: { bg: '#fef9c3', color: '#854d0e', label: 'Pending' },
            approved: { bg: '#d1fae5', color: '#065f46', label: 'Approved' },
            rejected: { bg: '#fef2f2', color: '#991b1b', label: 'Rejected' }
        };
        const style = styles[status] || styles.pending;
        return (
            <span style={{
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: '600',
                background: style.bg,
                color: style.color
            }}>
                {style.label}
            </span>
        );
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div style={{ paddingTop: '40px', paddingBottom: '60px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>My Products</h1>
                    <p style={{ color: '#666' }}>Manage your product listings</p>
                </div>
                <button
                    onClick={() => navigate('/submit')}
                    className="btn btn-primary"
                >
                    + Add New Product
                </button>
            </div>

            {products.length === 0 ? (
                <div style={{ padding: '60px', textAlign: 'center', background: '#f9fafb', borderRadius: '12px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📦</div>
                    <h3 style={{ marginBottom: '8px' }}>No products yet</h3>
                    <p style={{ color: '#666', marginBottom: '20px' }}>Get started by adding your first product</p>
                    <button onClick={() => navigate('/submit')} className="btn btn-primary">
                        Add Product
                    </button>
                </div>
            ) : (
                <div style={{ background: 'white', border: '1px solid #E5E5E5', borderRadius: '8px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #E5E5E5' }}>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#666' }}>PRODUCT</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#666' }}>STATUS</th>
                                <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', color: '#666' }}>CREATED</th>
                                <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: '0.85rem', fontWeight: '600', color: '#666' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <td style={{ padding: '16px 20px' }}>
                                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                            {product.logo_url && (
                                                <img src={product.logo_url} alt={product.name} style={{ width: '40px', height: '40px', borderRadius: '6px' }} />
                                            )}
                                            <div>
                                                <div style={{ fontWeight: '600', marginBottom: '2px' }}>{product.name}</div>
                                                <div style={{ fontSize: '0.85rem', color: '#666' }}>{product.tagline}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px 20px' }}>
                                        {getStatusBadge(product.status)}
                                    </td>
                                    <td style={{ padding: '16px 20px', color: '#666', fontSize: '0.9rem' }}>
                                        {new Date(product.created_at).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button
                                                onClick={() => navigate(`/founder/products/${product._id}/analytics`)}
                                                style={{
                                                    padding: '6px 12px',
                                                    background: '#e0f2fe',
                                                    color: '#0369a1',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                Analytics
                                            </button>
                                            <button
                                                onClick={() => navigate(`/founder/products/${product._id}/edit`)}
                                                style={{
                                                    padding: '6px 12px',
                                                    background: '#f3f4f6',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '600'
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => setDeleteModal(product)}
                                                style={{
                                                    padding: '6px 12px',
                                                    background: '#fef2f2',
                                                    color: '#991b1b',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '600'
                                                }}
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

            {/* Delete Confirmation Modal */}
            {deleteModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '30px',
                        maxWidth: '400px',
                        width: '90%'
                    }}>
                        <h3 style={{ marginBottom: '12px' }}>Delete Product?</h3>
                        <p style={{ color: '#666', marginBottom: '24px' }}>
                            Are you sure you want to delete "{deleteModal.name}"? This action cannot be undone.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setDeleteModal(null)}
                                style={{
                                    padding: '10px 20px',
                                    background: '#f3f4f6',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteModal._id)}
                                style={{
                                    padding: '10px 20px',
                                    background: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FounderDashboard;
