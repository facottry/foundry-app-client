import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import Breadcrumbs from '../components/Breadcrumbs';
import ReviewList from '../components/reviews/ReviewList';
import AuthContext from '../context/AuthContext';
import SEO from '../components/SEO';
import BRAND from '../config/brand';
import LoadingState from '../components/common/LoadingState';

const ProductReviewsPage = () => {
    const { slug } = useParams();
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/slug/${slug}`);
                setProduct(res.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [slug]);

    if (loading) return <LoadingState message="Loading reviews..." />;
    if (!product) return <div style={{ padding: '60px', textAlign: 'center' }}>Product not found</div>;

    return (
        <div style={{ paddingTop: '40px', paddingBottom: '60px' }}>
            <SEO
                title={`Reviews: ${product.name}`}
                description={`Read all reviews for ${product.name}. See what users say about ${product.tagline}.`}
                canonical={`/product/${product.slug}/reviews`}
            />

            <Breadcrumbs items={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/category/all' },
                { label: product.name, href: `/product/${product.slug}` },
                { label: 'Reviews' }
            ]} />

            <div style={{ marginBottom: '40px' }}>
                <Link to={`/product/${product.slug}`} style={{ fontSize: '0.9rem', color: '#666', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                    ← Back to Product
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* Simplified Header */}
                    <h1 style={{ marginBottom: '8px', fontSize: '2rem' }}>Reviews for {product.name}</h1>
                </div>
            </div>

            {/* Reuse ReviewList but pass a prop to indicate we are in 'fullPage' mode if needed, 
                or just let it render. We want to avoid circular link to "view all", so we can 
                add a prop to ReviewList called `isFullPage` */}
            <div style={{ background: '#fff', borderRadius: '12px' }}>
                <ReviewList
                    productId={product._id}
                    user={user}
                    productOwnerId={product.owner_user_id}
                    isFullPage={true}
                />
            </div>
        </div>
    );
};

export default ProductReviewsPage;
