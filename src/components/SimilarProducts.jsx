import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import ProductCard from './ProductCard';

const SimilarProducts = ({ currentProduct }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSimilar = async () => {
            if (!currentProduct || !currentProduct._id) return;
            try {
                const res = await api.get(`/products/similar/${currentProduct._id}`);
                setProducts(res.data);
            } catch (err) {
                console.error('Failed to fetch similar products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSimilar();
    }, [currentProduct]);

    if (loading || products.length === 0) return null;

    return (
        <section style={{ marginTop: '60px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', fontWeight: '700' }}>
                Similar Tools
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
            }}>
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default SimilarProducts;
