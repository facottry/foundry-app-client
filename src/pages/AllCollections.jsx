import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCollections } from '../utils/api';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import CategoryCollectionTabs from '../components/CategoryCollectionTabs';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';

const AllCollections = () => {
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                // Assuming getCollections returns { success: true, data: [...] } or just data array depending on api.js interceptor
                // The api.js interceptor returns response.data.
                // If backend returns { success: true, data: [...] }, then response.data is the object.
                // Let's check api.js again. It returns response.data.
                // We'll handle both cases to be safe or rely on known pattern.
                const res = await getCollections();
                const data = res.success ? res.data : res;
                if (Array.isArray(data)) {
                    setCollections(data);
                } else if (data.collections) {
                    setCollections(data.collections);
                } else {
                    setCollections([]);
                }
            } catch (err) {
                console.error('Failed to fetch collections', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCollections();
    }, []);

    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} />;

    return (
        <div style={{ paddingTop: '40px' }}>
            <SEO
                title="All Collections - Clicktory"
                description="Browse curated lists of products and tools for specific needs and workflows."
                canonical="/collection"
            />
            <Breadcrumbs items={[
                { label: 'Home', href: '/' },
                { label: 'Collections' }
            ]} />

            <CategoryCollectionTabs />

            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', lineHeight: '1.2' }}>
                    Curated Collections
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px' }}>
                    Hand-picked lists of top-rated tools for every stage of your journey.
                </p>
            </div>

            {collections.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
                    No collections found yet. Check back soon!
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '32px'
                }}>
                    {collections.map(collection => (
                        <Link
                            key={collection._id}
                            to={`/collections/${collection.slug}`} // Note: Route is /collections/:slug plural
                            style={{
                                display: 'block',
                                backgroundColor: '#fff',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                border: '1px solid var(--border-color)',
                                textDecoration: 'none',
                                color: 'inherit',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                padding: '32px',
                                background: 'linear-gradient(135deg, #FFF5EB 0%, #FFFFFF 100%)',
                                borderBottom: '1px solid #f0f0f0',
                                position: 'relative'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px', color: '#111', paddingRight: '20px' }}>
                                        {collection.name}
                                    </h2>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            window.open(`/collections/${collection.slug}`, '_blank');
                                        }}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '4px',
                                            color: '#999',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '4px',
                                            transition: 'color 0.2s, background 0.2s',
                                            marginTop: '-4px',
                                            marginRight: '-4px'
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = '#999'; e.currentTarget.style.background = 'transparent'; }}
                                        title="Open in new tab"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                            <polyline points="15 3 21 3 21 9"></polyline>
                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                        </svg>
                                    </button>
                                </div>
                                <p style={{ fontSize: '1rem', color: '#666', lineHeight: '1.5' }}>
                                    {collection.tagline}
                                </p>
                            </div>
                            <div style={{ padding: '24px', backgroundColor: '#fff' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                                        {collection.products?.length || 0} Products
                                    </span>
                                    <span style={{ color: 'var(--accent-primary)', fontSize: '0.95rem', fontWeight: '600' }}>
                                        View Collection &rarr;
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllCollections;
