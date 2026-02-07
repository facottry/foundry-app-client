import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { slugToText } from '../utils/slugUtils';
import SEOHead from '../components/SEOHead';
import { CollectionPageSchema, BreadcrumbListSchema } from '../components/SchemaMarkup';
import ProductCard from '../components/ProductCard';
import BRAND from '../config/brand';

const TagPage = () => {
    const { slug } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const tagName = slugToText(slug);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get(`/products/tag/${slug}`);
                setProducts(res.data || []);
            } catch (error) {
                console.error('Error fetching tag products:', error);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [slug]);

    // SEO content for tag
    const getSEODescription = () => {
        return `Discover the best ${tagName.toLowerCase()} tools and software. Browse ${products.length} products tagged with ${tagName.toLowerCase()} on ${BRAND.publicName}.`;
    };

    const getSEOIntro = () => {
        return `Explore our curated collection of ${tagName.toLowerCase()} tools. Whether you're looking for solutions to streamline your workflow, enhance productivity, or solve specific challenges, these ${tagName.toLowerCase()} products are trusted by founders and teams worldwide. Find the perfect tool for your needs.`;
    };

    if (loading) {
        return <div style={{ padding: '60px 20px', textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <div style={{ paddingTop: '40px', paddingBottom: '60px' }}>
            {/* SEO Meta Tags */}
            <SEOHead
                title={`${tagName} Tools`}
                description={getSEODescription()}
                canonical={`/tag/${slug}`}
                keywords={`${tagName.toLowerCase()}, ${tagName.toLowerCase()} tools, ${tagName.toLowerCase()} software`}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": `${tagName} Products`,
                    "description": `Best ${tagName} tools and software`,
                    "url": `https://www.clicktory.in/tag/${slug}`
                }}
            />
            <BreadcrumbListSchema
                items={[
                    { label: 'Home', href: '/' },
                    { label: tagName }
                ]}
            />

            {/* Breadcrumbs */}
            <nav style={{ marginBottom: '20px', fontSize: '0.9rem', color: '#666' }}>
                <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link>
                <span style={{ margin: '0 8px' }}>→</span>
                <span>{tagName}</span>
            </nav>

            {/* Page Header */}
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{tagName} Tools</h1>
                <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.6', maxWidth: '800px' }}>
                    {getSEOIntro()}
                </p>
                <div style={{ marginTop: '12px', color: '#999', fontSize: '0.95rem' }}>
                    {products.length} {products.length === 1 ? 'product' : 'products'}
                </div>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
                <div style={{ padding: '60px 20px', textAlign: 'center', background: '#f9fafb', borderRadius: '12px' }}>
                    <h3 style={{ marginBottom: '8px' }}>No products found</h3>
                    <p style={{ color: '#666' }}>No products are currently tagged with {tagName.toLowerCase()}</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TagPage;
