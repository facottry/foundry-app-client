import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { getOrCreateSessionId } from '../utils/sessionUtils';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductTabs from '../components/ProductTabs';
import SaveProductModal from '../components/products/SaveProductModal';
import ReviewForm from '../components/ReviewForm';
import Toast from '../components/common/Toast';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [toast, setToast] = useState(null); // { message, type }

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);

                // Track view with session
                const sessionId = getOrCreateSessionId();
                // New Event Tracking API
                api.post('/events/track', {
                    productId: id,
                    eventType: 'VIEW',
                    sessionId
                }).catch(err => console.error('View tracking failed:', err));

                // Legacy tracking (keep for now if needed, or remove if fully migrated)
                // api.post('/track/view', { productId: id, sessionId }).catch(err => console.error('View tracking failed:', err));
            } catch (error) {
                console.error('Error fetching product:', error);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    const handleVisitWebsite = () => {
        const sessionId = getOrCreateSessionId();
        api.post('/events/track', {
            productId: id,
            eventType: 'CLICK',
            sessionId
        }).catch(err => console.error('Click tracking failed:', err));

        // Also trigger legacy redirect or let the backend handle it?
        // The link is /r/:id which handles the redirect and legacy billing tracking.
        // We just add this side effect for analytics.
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
    if (!product) return <div style={{ padding: '40px', textAlign: 'center' }}>Product not found</div>;

    return (
        <div style={{ paddingTop: '40px', paddingBottom: '60px' }}>
            <Breadcrumbs items={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/category/all' },
                { label: product.categories && product.categories[0], href: `/category/${product.categories && product.categories[0]}` },
                { label: product.name }
            ]} />

            {/* Product Header */}
            <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'start', marginBottom: '24px' }}>
                    {product.logo_url ? (
                        <img src={product.logo_url} alt="Logo" style={{ width: '96px', height: '96px', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '96px', height: '96px', borderRadius: '20px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#666' }}>
                            {product.name.charAt(0)}
                        </div>
                    )}
                    <div style={{ flex: 1 }}>
                        <h1 style={{ marginBottom: '8px', fontSize: '2.5rem' }}>{product.name}</h1>
                        <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '16px' }}>{product.tagline}</p>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                            {product.avg_rating > 0 && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '1rem' }}>
                                    <span>⭐</span>
                                    <strong>{product.avg_rating.toFixed(1)}</strong>
                                    <span style={{ color: '#666' }}>({product.ratings_count} reviews)</span>
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                            <a
                                href={`http://localhost:5000/r/${product._id}`} // TODO: Use env var for base URL
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                onClick={handleVisitWebsite}
                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                Visit Website (Tracked)
                            </a>
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    const token = localStorage.getItem('token');
                                    if (!token) {
                                        window.location.href = '/login';
                                        return;
                                    }
                                    setShowSaveModal(true);
                                }}
                                style={{ flex: 1 }}
                            >
                                ❤️ Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Tabs */}
            <ProductTabs productId={product._id} product={product} />

            {/* Review Section */}
            <div style={{ marginTop: '60px' }}>
                <div style={{ maxWidth: '600px' }}>
                    <ReviewForm productId={product._id} />
                </div>
            </div>

            {showSaveModal && (
                <SaveProductModal
                    productId={product._id}
                    onClose={() => setShowSaveModal(false)}
                    onShowToast={showToast}
                />
            )}

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default ProductDetails;
