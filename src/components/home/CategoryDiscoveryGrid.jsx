import React, { useEffect, useState } from 'react';
import CategoryDiscoveryCard from './CategoryDiscoveryCard';
import { getCategories } from '../../utils/api';
import LoadingState from '../common/LoadingState';

const CategoryDiscoveryGrid = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories()
            .then(res => {
                if (res.success) {
                    setCategories(res.data);
                }
            })
            .catch(err => console.error('Failed to fetch categories', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="py-12"><LoadingState /></div>;

    return (
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3 text-gray-900">Browse by Category</h2>
                <p className="text-lg text-gray-500">Structured discovery for every use case</p>
            </div>

            {/* Grid Layout: 1 col mobile, 2 col tablet, 3 col desktop */}
            {/* Desktop: 4 cols (3 col span in 12 grid), maintain generous outer padding */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {categories.filter(cat => cat.productCount >= 3).map(cat => (
                    <CategoryDiscoveryCard key={cat.slug} category={cat} />
                ))}
            </div>
        </div>
    );
};

export default CategoryDiscoveryGrid;
