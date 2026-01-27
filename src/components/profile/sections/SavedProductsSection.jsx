import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../utils/api';

const SavedProductsSection = () => {
    const [savedItems, setSavedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSaved = async () => {
            try {
                // Assuming backend returns { data: [...] } or just [...]
                // Endpoint likely /saved/products based on api-index.md
                // Let's verify route in appserver/routes/saved.js if needed, but standard is /saved/products
                const res = await api.get('/saved/products');
                // Backend usually returns array of populated objects
                setSavedItems(res.data || []);
            } catch (err) {
                console.error('Failed to fetch saved items', err);
                setError('Could not load saved products.');
            } finally {
                setLoading(false);
            }
        };
        fetchSaved();
    }, []);

    // Helper to unsave
    const handleUnsave = async (productId) => {
        try {
            await api.delete(`/saved/products/${productId}`);
            setSavedItems(prev => prev.filter(item => item.product._id !== productId));
        } catch (err) {
            console.error('Unsave failed', err);
        }
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Loading your collection...</div>;

    // EMPTY STATE UI
    if (savedItems.length === 0) {
        return (
            <div style={{
                background: 'linear-gradient(to bottom, #f9fafb, #ffffff)',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '60px 20px',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
            }}>
                <div style={{ fontSize: '4rem', marginBottom: '24px' }}>📂</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '12px' }}>
                    No saved products yet
                </h3>
                <p style={{ color: '#6b7280', fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 32px' }}>
                    Your collection is empty. Browse products and click the ❤️ icon to save them for later.
                </p>
                <Link
                    to="/category/all"
                    className="btn btn-primary"
                    style={{
                        padding: '12px 32px',
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                    }}
                >
                    Start Browsing
                </Link>
            </div>
        );
    }

    // GRID LIST UI
    return (
        <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '24px' }}>Saved Products</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {savedItems.map((item) => {
                    const product = item.product;
                    if (!product) return null; // Safety check
                    return (
                        <div key={item._id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', background: '#fff', transition: 'transform 0.2s', position: 'relative' }}>
                            {/* Unsave Button */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleUnsave(product._id);
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    background: 'rgba(255,255,255,0.9)',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    zIndex: 10
                                }}
                                title="Remove from Saved"
                            >
                                ✕
                            </button>

                            {/* Image */}
                            <div style={{ height: '160px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                {product.logo_url ? (
                                    <img src={product.logo_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ fontSize: '2rem', color: '#9ca3af' }}>{product.name.charAt(0)}</span>
                                )}
                            </div>

                            {/* Content */}
                            <div style={{ padding: '16px' }}>
                                <h4 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h4>
                                <p style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: '#6b7280', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {product.tagline}
                                </p>
                                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '500', fontSize: '0.9rem' }}>
                                    View Details &rarr;
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SavedProductsSection;
