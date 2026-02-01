import React, { useState, useEffect } from 'react';
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

const CategoryPage = () => {
    const { slug } = useParams();
    const [organic, setOrganic] = useState([]);
    const [promoted, setPromoted] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('trending');

    useEffect(() => {
        const controller = new AbortController();
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const [orgRes, promRes] = await Promise.all([
                    api.get(`/products/category/${slug}?sort=${sortBy}`, { signal: controller.signal }),
                    api.get(`/boost/promoted/${slug}`, { signal: controller.signal })
                ]);
                setOrganic(orgRes.data);
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
        fetchProducts();

        return () => controller.abort();
    }, [slug, sortBy]);

    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} onRetry={() => window.location.reload()} />; // Simple retry

    if (organic.length === 0 && promoted.length === 0) return <EmptyState title={`No products in ${slug}`} subtext="Be the first to list here!" />;

    const categoryTitle = CATEGORY_TITLES[slug] || (slug === 'all' ? 'All Products' : slug);
    const categoryDesc = CATEGORY_INTROS[slug] || `Discover the best ${slug} products for startups and builders.`;

    const categorySchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": categoryTitle,
        "description": categoryDesc,
        "url": `https://${BRAND.domain}/category/${slug}`,
        "hasPart": organic.map(p => ({
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
            <Breadcrumbs items={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/category/all' },
                { label: slug === 'all' ? 'All Categories' : slug }
            ]} />

            {/* Category Header */}
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
                    {CATEGORY_TITLES[slug] || (slug === 'all' ? 'All Products' : slug)}
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px' }}>
                    {CATEGORY_INTROS[slug] || `Discover the best ${slug} products`}
                </p>
            </div>

            {/* Sort Dropdown */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    {organic.length} {organic.length === 1 ? 'product' : 'products'} found
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
                {organic.map(product => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        isPromoted={promoted.includes(product._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
