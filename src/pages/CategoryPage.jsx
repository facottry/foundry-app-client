import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../components/SEO';
import { CATEGORY_INTROS, CATEGORY_TITLES } from '../constants/categories';
import BRAND from '../config/brand';
import FollowButton from '../components/FollowButton';
import CategoryCollectionTabs from '../components/CategoryCollectionTabs';

const CategoryPage = ({ staticSlug }) => {
    const { slug: paramSlug } = useParams();
    const slug = staticSlug || paramSlug;
    const [organic, setOrganic] = useState([]);
    const [promoted, setPromoted] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('trending');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [total, setTotal] = useState(0);

    const observerRef = useRef();
    const lastProductRef = useCallback(node => {
        if (loadingMore) return;
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        }, { threshold: 0.1 });

        if (node) observerRef.current.observe(node);
    }, [loadingMore, hasMore]);

    // Initial load - reset everything when slug or sort changes
    useEffect(() => {
        const controller = new AbortController();
        const fetchInitial = async () => {
            setLoading(true);
            setError(null);
            setPage(1);
            setOrganic([]);

            try {
                const [orgRes, promRes] = await Promise.all([
                    api.get(`/products/category/${slug}?sort=${sortBy}&page=1&limit=50`, { signal: controller.signal }),
                    api.get(`/boost/promoted/${slug}`, { signal: controller.signal })
                ]);

                const data = orgRes.data;
                setOrganic(data.products);
                setHasMore(data.pagination.hasMore);
                setTotal(data.pagination.total);
                setPromoted(promRes.data.map(c => c.product_id));
            } catch (err) {
                if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
                    setError(err);
                }
            }
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        };
        fetchInitial();

        return () => controller.abort();
    }, [slug, sortBy]);

    // Load more when page changes (but not on initial load)
    useEffect(() => {
        if (page === 1) return;

        const controller = new AbortController();
        const fetchMore = async () => {
            setLoadingMore(true);
            try {
                const res = await api.get(`/products/category/${slug}?sort=${sortBy}&page=${page}&limit=50`, { signal: controller.signal });
                const data = res.data;
                // Deduplicate: only add products not already in the list
                setOrganic(prev => {
                    const existingIds = new Set(prev.map(p => p._id));
                    const newProducts = data.products.filter(p => !existingIds.has(p._id));
                    return [...prev, ...newProducts];
                });
                setHasMore(data.pagination.hasMore);
            } catch (err) {
                if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
                    console.error('Error loading more products', err);
                }
            }
            if (!controller.signal.aborted) {
                setLoadingMore(false);
            }
        };
        fetchMore();

        return () => controller.abort();
    }, [page, slug, sortBy]);

    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} onRetry={() => window.location.reload()} />;

    if (organic.length === 0 && promoted.length === 0) return <EmptyState title={`No products in ${slug}`} subtext="Be the first to list here!" />;

    const categoryTitle = CATEGORY_TITLES[slug] || (slug === 'all' ? 'All Products' : slug);
    const categoryDesc = CATEGORY_INTROS[slug] || `Discover the best ${slug} products for startups and builders.`;

    const categorySchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": categoryTitle,
        "description": categoryDesc,
        "url": `https://${BRAND.domain}/category/${slug}`,
        "hasPart": organic.slice(0, 50).map(p => ({
            "@type": "SoftwareApplication",
            "name": p.name,
            "applicationCategory": "DeveloperTool",
            "operatingSystem": "Web",
            "url": `https://${BRAND.domain}/product/${p.slug || p._id}`
        }))
    };

    return (
        <div style={{ paddingTop: '40px' }}>
            <SEO
                title={categoryTitle}
                description={categoryDesc}
                canonical={`/category/${slug}`}
                jsonLd={categorySchema}
                type="CollectionPage"
            />
            {/* Breadcrumbs */}
            {/* Breadcrumbs */}
            <Breadcrumbs items={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/product' },
                { label: CATEGORY_TITLES[slug] || slug }
            ]} />

            {/* Show Tabs only on "All Products" (slug === 'all') */}
            {slug === 'all' && <CategoryCollectionTabs />}

            {/* Category Header */}
            <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', lineHeight: '1.2' }}>
                            {CATEGORY_TITLES[slug] || (slug === 'all' ? 'All Products' : slug)}
                        </h1>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px' }}>
                            {CATEGORY_INTROS[slug] || `Discover the best ${slug} products`}
                        </p>
                    </div>
                    {slug !== 'all' && (
                        <div style={{ marginTop: '10px' }}>
                            <FollowButton targetId={slug} type="category" label="Follow Category" />
                        </div>
                    )}
                </div>
            </div>

            {/* Sort Dropdown */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    Showing {organic.length} of {total} {total === 1 ? 'product' : 'products'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '500' }}>Sort by:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: '1px solid var(--border-color)',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            background: 'white'
                        }}
                    >
                        <option value="trending">🔥 Trending</option>
                        <option value="popular">⭐ Most Popular</option>
                        <option value="clicked">👆 Most Clicked</option>
                        <option value="newest">🆕 Newest</option>
                        <option value="alpha">🔤 A-Z</option>
                    </select>
                </div>
            </div>

            {/* Product Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {organic.map((product, index) => (
                    <div
                        key={product._id}
                        ref={index === organic.length - 1 ? lastProductRef : null}
                    >
                        <ProductCard
                            product={product}
                            isPromoted={promoted.includes(product._id)}
                        />
                    </div>
                ))}
            </div>

            {/* Loading More Indicator */}
            {loadingMore && (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                    <div style={{
                        display: 'inline-block',
                        width: '24px',
                        height: '24px',
                        border: '3px solid var(--border-color)',
                        borderTop: '3px solid var(--primary-color)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    <p style={{ marginTop: '12px' }}>Loading more products...</p>
                </div>
            )}

            {/* End of List */}
            {!hasMore && organic.length > 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    You've reached the end • {total} products total
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
