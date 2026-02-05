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
        <section className="mt-12 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Similar Tools
            </h2>
            <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {products.map(product => (
                    <div key={product._id} className="min-w-[280px] md:min-w-0 snap-center h-full">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SimilarProducts;
