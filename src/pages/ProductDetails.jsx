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
import LoadingState from '../components/common/LoadingState';

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


    // ... existing imports

    if (loading) return <LoadingState message="Loading product details..." />;
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
                { label: 'Product', href: '/category/all' },
                { label: entityCategory, href: `/category/${entityCategory}` },
                { label: product.name }
            ]} />

            {/* Product Header - Entity Node Style */}
            <div className="mb-8 md:mb-12">
                <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start mb-6 md:mb-8">
                    {logoUrl ? (
                        <img
                            src={logoUrl}
                            alt={`${product.name} Logo`}
                            className="w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-sm object-cover border border-gray-100 flex-shrink-0"
                        />
                    ) : (
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gray-100 flex items-center justify-center text-3xl md:text-4xl font-bold text-gray-500 flex-shrink-0">
                            {product.name.charAt(0)}
                        </div>
                    )}
                    <div className="flex-1 w-full min-w-0">
                        {/* H1: Product Name (Entity Identity) */}
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-2 md:mb-3 leading-tight">
                            {product.name}
                        </h1>

                        {/* Tagline - Explicitly requested */}
                        {product.tagline && (
                            <p className="text-lg md:text-2xl font-light text-gray-600 mb-4 md:mb-6 leading-snug">
                                {product.tagline}
                            </p>
                        )}

                        {/* Description - Separate from Tagline */}
                        <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed max-w-3xl">
                            {product.description}
                        </p>

                        {/* Visible Entity Metadata (HTML) */}
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6 text-sm text-gray-500 border-t border-gray-100 pt-4">
                            <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-gray-700">Category:</span>
                                <span>{entityCategory}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-gray-700">Status:</span>
                                <span className={entityStatus === 'Active' ? 'text-emerald-600 font-medium' : 'text-amber-600 font-medium'}>
                                    {entityStatus}
                                </span>
                            </div>
                            {(product.offers?.price || entityPrice) && (
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-gray-700">Price:</span>
                                    <span>{entityPrice}</span>
                                </div>
                            )}
                            {product.follower_count > 0 && (
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-gray-700">Followers:</span>
                                    <span>{product.follower_count}</span>
                                </div>
                            )}
                        </div>

                        {/* Screenshots Section - Conditional */}
                        {screenshotUrls && screenshotUrls.length > 0 && (
                            <div className="mt-6 mb-8 flex gap-3 overflow-x-auto pb-4 snap-x">
                                {screenshotUrls.map((url, idx) => (
                                    <img
                                        key={idx}
                                        src={url}
                                        alt={`Screenshot ${idx + 1}`}
                                        className="h-32 md:h-48 rounded-lg shadow-sm border border-gray-100 flex-shrink-0 snap-center"
                                    />
                                ))}
                            </div>
                        )}

                        <div className="flex gap-4 items-center flex-wrap">
                            {/* Ratings - Conditional */}
                            {product.avg_rating > 0 && (
                                <div className="flex items-center gap-1 text-base">
                                    <span>⭐</span>
                                    <strong className="text-gray-900">{product.avg_rating.toFixed(1)}</strong>
                                    <span className="text-gray-500">({product.ratings_count} reviews)</span>
                                </div>
                            )}
                        </div>

                        {/* Team Cluster (Horizontal) - Conditional */}
                        {product.team_members && product.team_members.length > 0 && (
                            <div className="mt-5 flex items-center gap-3">
                                <div className="flex -space-x-2 pl-2">
                                    {product.team_members.slice(0, 5).map((member, i) => {
                                        const avatar = member.avatar_url || getImageUrl(member.profileImageKey) || '';
                                        return (
                                            <div key={i} title={`${member.name} (${member.title || 'Member'})`} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200 flex items-center justify-center shadow-sm relative z-0 hover:z-10 transition-all">
                                                {avatar ? (
                                                    <img src={avatar} alt={member.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-xs md:text-sm">
                                                        {(member.name || '?').charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                                <span className="text-sm text-gray-600">
                                    by {product.team_members[0].user_id ? (
                                        <Link
                                            to={`/founder/${product.team_members[0].user_id.slug || product.team_members[0].user_id._id || product.team_members[0].user_id}`}
                                            className="text-blue-600 font-semibold hover:underline"
                                        >
                                            {product.team_members[0].name}
                                        </Link>
                                    ) : (
                                        <span className="font-semibold text-gray-900">{product.team_members[0].name}</span>
                                    )}
                                </span>
                            </div>
                        )}

                        <div className="flex gap-2 md:gap-4 mt-6">
                            <a
                                href={`/visit/${product._id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary flex-1 flex items-center justify-center py-2.5 px-3 md:px-5 text-sm md:text-base font-medium rounded-full shadow-lg shadow-orange-500/20 active:scale-95 transition-transform whitespace-nowrap"
                                onClick={handleVisitWebsite}
                            >
                                Visit Website
                            </a>
                            <button
                                className="btn btn-secondary flex-1 py-2.5 px-3 md:px-5 text-sm md:text-base font-medium rounded-full border border-gray-200 hover:bg-gray-50 active:scale-95 transition-transform whitespace-nowrap"
                                onClick={() => {
                                    const token = localStorage.getItem('token');
                                    if (!token) {
                                        window.location.href = '/login';
                                        return;
                                    }
                                    setShowSaveModal(true);
                                }}
                            >
                                ❤️ Save
                            </button>
                            <FollowButton
                                targetId={product._id}
                                type="product"
                                label="Follow"
                                className="flex-1 px-3 md:px-5 whitespace-nowrap"
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
