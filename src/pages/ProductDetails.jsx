import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { getImageUrl } from '../utils/getImageUrl';
import { getOrCreateSessionId } from '../utils/sessionUtils';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductTabs from '../components/ProductTabs';
import SaveProductModal from '../components/products/SaveProductModal';
import Toast from '../components/common/Toast';
import AuthContext from '../context/AuthContext';
import BRAND from '../config/brand';
import SEO from '../components/SEO';
import SimilarProducts from '../components/SimilarProducts';

const ProductDetails = () => {
    const { slug } = useParams();
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
                // Fetch by Slug
                const res = await api.get(`/products/slug/${slug}`);
                setProduct(res.data);

                // Track view with session - now we have the product object with _id
                if (res.data && res.data._id) {
                    const sessionId = getOrCreateSessionId();
                    // New Event Tracking API
                    api.post('/events/track', {
                        productId: res.data._id,
                        eventType: 'VIEW',
                        sessionId
                    }).catch(err => console.error('View tracking failed:', err));
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [slug]);

    const handleVisitWebsite = () => {
        if (!product) return;
        const sessionId = getOrCreateSessionId();
        api.post('/events/track', {
            productId: product._id,
            eventType: 'CLICK',
            sessionId
        }).catch(err => console.error('Click tracking failed:', err));

        // Use direct redirect if desired, but we usually open target `_blank` from the <a> tag
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
    if (!product) return <div style={{ padding: '40px', textAlign: 'center' }}>Product not found</div>;

    // Use enhanced URLs if available, else derive using helper
    const logoUrl = product.logoUrl || getImageUrl(product.logoKey || product.logo_url) || '';
    const screenshotUrls = product.screenshotUrls || (product.screenshotKeys || []).map(k => getImageUrl(k)) || product.screenshots || [];

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": product.name,
        "applicationCategory": "DeveloperTool",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": product.description || product.tagline,
        "aggregateRating": product.avg_rating > 0 ? {
            "@type": "AggregateRating",
            "ratingValue": product.avg_rating,
            "reviewCount": product.ratings_count
        } : undefined,
        "url": `https://${BRAND.domain}/product/${product.slug}`
    };

    return (
        <div style={{ paddingTop: '40px', paddingBottom: '60px' }}>
            <SEO
                title={`${product.name} - ${product.tagline}`}
                description={product.description?.substring(0, 160) || product.tagline}
                canonical={`/product/${product.slug}`}
                jsonLd={productSchema}
                type="SoftwareApplication"
            />
            <Breadcrumbs items={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/category/all' },
                { label: product.categories && product.categories[0], href: `/category/${product.categories && product.categories[0]}` },
                { label: product.name }
            ]} />

            {/* Product Header */}
            <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'start', marginBottom: '24px' }}>
                    {logoUrl ? (
                        <img src={logoUrl} alt="Logo" style={{ width: '96px', height: '96px', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '96px', height: '96px', borderRadius: '20px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#666' }}>
                            {product.name.charAt(0)}
                        </div>
                    )}
                    <div style={{ flex: 1 }}>
                        <h1 style={{ marginBottom: '8px', fontSize: '2.5rem' }}>{product.name}</h1>
                        <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '16px' }}>{product.tagline}</p>

                        {/* Screenshots Section - New */}
                        {screenshotUrls.length > 0 && (
                            <div style={{ marginTop: '24px', marginBottom: '24px', overflowX: 'auto', display: 'flex', gap: '16px', paddingBottom: '16px' }}>
                                {screenshotUrls.map((url, idx) => (
                                    <img key={idx} src={url} alt={`Screenshot ${idx + 1}`} style={{ height: '200px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }} />
                                ))}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>

                            {product.avg_rating > 0 && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '1rem' }}>
                                    <span>⭐</span>
                                    <strong>{product.avg_rating.toFixed(1)}</strong>
                                    <span style={{ color: '#666' }}>({product.ratings_count} reviews)</span>
                                </div>
                            )}
                        </div>

                        {/* Team Cluster (Horizontal) */}
                        {product.team_members && product.team_members.length > 0 && (
                            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ display: 'flex', paddingLeft: '8px' }}>
                                    {product.team_members.slice(0, 5).map((member, i) => {
                                        const avatar = member.avatar_url || getImageUrl(member.profileImageKey) || '';
                                        return (
                                            <div key={i} title={`${member.name} (${member.title || 'Member'})`} style={{ marginLeft: '-8px', width: '32px', height: '32px', borderRadius: '50%', border: '2px solid white', overflow: 'hidden', background: '#e5e7eb' }}>
                                                {avatar ? (
                                                    <img src={avatar} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold', color: '#6b7280' }}>
                                                        {(member.name || '?').charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                                <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                                    by {product.team_members[0].user_id ? (
                                        <Link
                                            to={`/founder/${product.team_members[0].user_id.slug || product.team_members[0].user_id._id || product.team_members[0].user_id}`}
                                            style={{ color: '#111827', fontWeight: '500', textDecoration: 'underline', cursor: 'pointer' }}
                                        >
                                            {product.team_members[0].name}
                                        </Link>
                                    ) : (
                                        <span style={{ color: '#111827', fontWeight: '500' }}>{product.team_members[0].name}</span>
                                    )}
                                    {product.team_members.length > 1 && <span> + {product.team_members.length - 1} more</span>}
                                </span>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                            <a
                                href={`/visit/${product._id}`}
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
            <ProductTabs productId={product._id} product={product} user={useContext(AuthContext).user} />

            {/* Similar Products (Internal Linking) */}
            <SimilarProducts currentProduct={product} />

            {/* Save Modal and Toast... */}

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
