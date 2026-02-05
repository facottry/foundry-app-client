import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCollections } from '../../utils/api';
// Using a simple card for now, similar to CategoryDiscoveryCard but for collections
import { ArrowRight } from 'lucide-react';

const CollectionCard = ({ collection }) => (
    <Link to={`/collections/${collection.slug}`} className="block group">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
            <div className="mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-2xl">
                    📑
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {collection.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {collection.tagline}
                </p>
            </div>

            <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                    {collection.products.slice(0, 3).map((prod, i) => (
                        <span key={i} className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-md">
                            {prod}
                        </span>
                    ))}
                    {collection.products.length > 3 && (
                        <span className="text-xs text-gray-400 px-1 py-1">+{collection.products.length - 3}</span>
                    )}
                </div>
                <div className="flex items-center text-sm font-medium text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                    View Collection <ArrowRight className="ml-1 w-4 h-4" />
                </div>
            </div>
        </div>
    </Link>
);

const CollectionsGrid = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCollections()
            .then(res => {
                if (res.success) {
                    setCollections(res.data);
                }
            })
            .catch(err => console.error('Failed to fetch collections', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="py-12 text-center text-gray-500">Loading collections...</div>;

    return (
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-3 text-gray-900">Browse by Collection</h2>
                <p className="text-lg text-gray-500">Curated tools for specific workflows</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map(col => (
                    <CollectionCard key={col.slug} collection={col} />
                ))}
            </div>
        </div>
    );
};

export default CollectionsGrid;
