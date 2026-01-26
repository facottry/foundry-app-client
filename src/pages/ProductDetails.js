import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductTabs from '../components/ProductTabs';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);

                // Track view
                api.post(`/stats/view/${id}`).catch(err => console.error('View tracking failed:', err));
            } catch (error) {
                console.error('Error fetching product:', error);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

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
                            <a
                                href={`/r/${product._id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                                style={{ padding: '12px 24px', fontSize: '1rem' }}
                            >
                                Visit Website →
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Tabs */}
            <ProductTabs productId={product._id} product={product} />
        </div>
    );
};

export default ProductDetails;
