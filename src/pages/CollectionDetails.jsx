import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCollectionBySlug } from '../utils/api';
import SEO from '../components/SEO';
import { ArrowLeft, Check } from 'lucide-react';

const CollectionDetails = () => {
    const { slug } = useParams();
    const [collection, setCollection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCollectionBySlug(slug)
            .then(res => {
                if (res.success) {
                    setCollection(res.data);
                } else {
                    setError('Collection details could not be loaded');
                }
            })
            .catch(err => setError('Collection not found'))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return <div className="py-20 text-center">Loading...</div>;
    if (error) return <div className="py-20 text-center text-red-500">{error}</div>;
    if (!collection) return null;

    return (
        <>
            <SEO
                title={`${collection.name} - Clicktory`}
                description={collection.tagline}
                canonical={`/collections/${collection.slug}`}
            />

            <div className="container mx-auto px-4 py-12">
                <Link to="/" className="inline-flex items-center text-gray-500 hover:text-orange-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collections
                </Link>

                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-semibold mb-6">
                            Curated Collection
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {collection.name}
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                            {collection.tagline}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                        <div className="p-8 md:p-12">
                            <h2 className="text-2xl font-bold mb-8 text-gray-900 flex items-center">
                                Featured Products <span className="ml-3 text-sm font-normal text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{collection.products.length} items</span>
                            </h2>

                            <div className="space-y-6">
                                {collection.products.map((productName, index) => (
                                    <Link
                                        to={`/search?q=${encodeURIComponent(productName)}`}
                                        key={index}
                                        className="block group"
                                    >
                                        <div className="flex items-start p-6 rounded-xl bg-gray-50 hover:bg-orange-50/30 transition-all border border-transparent hover:border-orange-200 cursor-pointer">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-gray-400 group-hover:text-orange-500 transition-colors border border-gray-100 group-hover:border-orange-100">
                                                    <Check className="w-5 h-5" />
                                                </div>
                                            </div>
                                            <div className="ml-6 flex-grow">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-700 transition-colors">
                                                        {productName}
                                                    </h3>
                                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500 text-sm font-medium flex items-center">
                                                        View Product &rarr;
                                                    </span>
                                                </div>
                                                <p className="text-gray-500 text-sm group-hover:text-gray-600">
                                                    Recommended tool for this category.
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CollectionDetails;
