import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { emitEvent } from '../analytics';
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
import FollowButton from '../components/FollowButton';

const ProductDetails = () => {
    const { slug } = useParams();
    const { user } = useContext(AuthContext);
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

                    emitEvent({
                        name: 'product_viewed',
                        category: 'discovery',
                        actor: { type: user ? 'user' : 'anonymous', id: user?.id },
                        object: { type: 'product', id: res.data._id },
                        properties: {
                            slug: res.data.slug,
                            name: res.data.name
                        }
                    });

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

        emitEvent({
            name: 'product_clicked',
            category: 'conversion',
            actor: { type: user ? 'user' : 'anonymous', id: user?.id },
            object: { type: 'product', id: product._id },
            properties: {
                slug: product.slug,
                destination_url: product.website_url
            }
        });

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

    // Strict Entity SEO Schema
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": product.name,
        "description": product.description || product.tagline,
        "applicationCategory": product.categories?.[0] || "Software",
        "operatingSystem": "Web",
        "url": `https://${BRAND.domain}/product/${product.slug}`,
        "offers": {
            "@type": "Offer",
            "price": "0", // Default as per rules, since we don't have pricing data yet
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Clicktory",
            "url": `https://${BRAND.domain}`
        },
        "sameAs": [
            product.website_url,
            product.twitter_url,
            product.linkedin_url
        ].filter(Boolean) // Remove empty/null values
    };

    if (product.avg_rating > 0) {
        productSchema.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": product.avg_rating,
            "reviewCount": product.ratings_count
        };
    }

    // Entity Data Helpers
    const entityStatus = product.status === 'approved' ? 'Active' : 'Inactive';
    const entityPrice = "Free / Contact"; // Default for now
    const entityCategory = product.categories?.[0] || 'Uncategorized';

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
                { label: entityCategory, href: `/category/${entityCategory}` },
                { label: product.name }
            ]} />

            {/* Product Header - Entity Node Style */}
            <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'start', marginBottom: '24px' }}>
                    {logoUrl ? (
                        <img src={logoUrl} alt={`${product.name} Logo`} style={{ width: '96px', height: '96px', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '96px', height: '96px', borderRadius: '20px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: '#666' }}>
                            {product.name.charAt(0)}
                        </div>
                    )}
                    <div style={{ flex: 1 }}>
                        {/* H1: Product Name (Entity Identity) */}
                        <h1 style={{ marginBottom: '8px', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>{product.name}</h1>

                        {/* Tagline - Explicitly requested */}
                        {product.tagline && (
                            <p style={{ fontSize: '1.5rem', fontWeight: '300', color: '#4b5563', marginBottom: '16px' }}>
                                {product.tagline}
                            </p>
                        )}

                        {/* Description - Separate from Tagline */}
                        <p style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '24px', lineHeight: '1.6', maxWidth: '800px' }}>
                            {product.description}
                        </p>

                        {/* Visible Entity Metadata (HTML) */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', fontSize: '0.9rem', color: '#6b7280', borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontWeight: '600', color: '#374151' }}>Category:</span>
                                <span>{entityCategory}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontWeight: '600', color: '#374151' }}>Status:</span>
                                <span style={{ color: entityStatus === 'Active' ? '#059669' : '#d97706', fontWeight: '500' }}>{entityStatus}</span>
                            </div>
                            {(product.offers?.price || entityPrice) && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontWeight: '600', color: '#374151' }}>Price:</span>
                                    <span>{entityPrice}</span>
                                </div>
                            )}
                            {product.follower_count > 0 && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontWeight: '600', color: '#374151' }}>Followers:</span>
                                    <span>{product.follower_count}</span>
                                </div>
                            )}
                        </div>

                        {/* Screenshots Section - Conditional */}
                        {screenshotUrls && screenshotUrls.length > 0 && (
                            <div style={{ marginTop: '24px', marginBottom: '24px', overflowX: 'auto', display: 'flex', gap: '16px', paddingBottom: '16px' }}>
                                {screenshotUrls.map((url, idx) => (
                                    <img key={idx} src={url} alt={`Screenshot ${idx + 1}`} style={{ height: '200px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }} />
                                ))}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>

                            {/* Ratings - Conditional */}
                            {product.avg_rating > 0 && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '1rem' }}>
                                    <span>⭐</span>
                                    <strong>{product.avg_rating.toFixed(1)}</strong>
                                    <span style={{ color: '#666' }}>({product.ratings_count} reviews)</span>
                                </div>
                            )}
                        </div>

                        {/* Team Cluster (Horizontal) - Conditional */}
                        {product.team_members && product.team_members.length > 0 && (
                            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ display: 'flex', paddingLeft: '8px' }}>
                                    {product.team_members.slice(0, 5).map((member, i) => {
                                        const avatar = member.avatar_url || getImageUrl(member.profileImageKey) || '';
                                        return (
                                            <div key={i} title={`${member.name} (${member.title || 'Member'})`} style={{ marginLeft: '-8px', width: '48px', height: '48px', borderRadius: '50%', border: '3px solid white', overflow: 'hidden', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                                {avatar ? (
                                                    <img src={avatar} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                                        {(member.name || '?').charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                                <span style={{ fontSize: '1rem', color: '#374151' }}>
                                    by {product.team_members[0].user_id ? (
                                        <Link
                                            to={`/founder/${product.team_members[0].user_id.slug || product.team_members[0].user_id._id || product.team_members[0].user_id}`}
                                            style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none', cursor: 'pointer' }}
                                        >
                                            {product.team_members[0].name}
                                        </Link>
                                    ) : (
                                        <span style={{ color: '#111827', fontWeight: '600' }}>{product.team_members[0].name}</span>
                                    )}
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
                                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 24px', fontSize: '1.1rem' }}
                            >
                                Visit Website
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
                                style={{ flex: 1, padding: '12px 24px', fontSize: '1.1rem' }}
                            >
                                ❤️ Save
                            </button>
                            <FollowButton
                                targetId={product._id}
                                type="product"
                                label="Follow"
                                onToggle={(isFollowing) => {
                                    setProduct(prev => ({
                                        ...prev,
                                        follower_count: (prev.follower_count || 0) + (isFollowing ? 1 : -1)
                                    }));
                                    showToast(isFollowing ? 'Followed successfully' : 'Unfollowed successfully', 'success');
                                }}
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* Product Tabs */}
            <ProductTabs productId={product._id} product={product} user={user} slug={product.slug} />

            {/* Similar Products (Internal Linking) */}
            <SimilarProducts currentProduct={product} />

            {/* Also Visible In Collections Tray */}
            {product.collections && product.collections.length >= 2 && (
                <div style={{ marginTop: '60px', borderTop: '1px solid #f3f4f6', paddingTop: '40px' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '8px', color: '#111827', letterSpacing: '-0.02em' }}>Also Visible In Collections</h2>
                        <p style={{ fontSize: '1rem', color: '#6b7280', margin: 0 }}>This product is also featured in the following curated lists.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                        {product.collections.map(col => (
                            <Link key={col.slug} to={`/collection/${col.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{
                                    padding: '20px',
                                    borderRadius: '12px',
                                    border: '1px solid #e5e7eb',
                                    background: '#fff',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'none';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.border = '1px solid #e5e7eb';
                                    }}
                                >
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '6px', color: '#1f2937' }}>{col.name}</h3>
                                        <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0, lineHeight: '1.4', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {col.tagline}
                                        </p>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #f9fafb' }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#4f46e5', background: '#eef2ff', padding: '4px 10px', borderRadius: '20px' }}>
                                            {col.productCount} tools
                                        </span>
                                        <span style={{ fontSize: '0.9rem', color: '#9ca3af' }}>View →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Save Modal and Toast... */}

            {
                showSaveModal && (
                    <SaveProductModal
                        productId={product._id}
                        onClose={() => setShowSaveModal(false)}
                        onShowToast={showToast}
                    />
                )
            }

            {
                toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )
            }
        </div >
    );
};

export default ProductDetails;
