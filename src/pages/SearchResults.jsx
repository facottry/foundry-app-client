import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query || query.length < 2) {
                setResults([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const res = await api.get(`/search?q=${encodeURIComponent(query)}&page=${page}&limit=20`);
                setResults(res.data.results || []);
                setTotal(res.data.total || 0);
            } catch (error) {
                console.error('Search error:', error);
                setResults([]);
            }
            setLoading(false);
        };

        fetchResults();
    }, [query, page]);

    if (loading) {
        return <div style={{ padding: '60px 20px', textAlign: 'center' }}>Searching...</div>;
    }

    return (
        <div style={{ paddingTop: '40px', paddingBottom: '60px' }}>
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>
                    Search Results
                </h1>
                <p style={{ fontSize: '1.1rem', color: '#666' }}>
                    {total > 0 ? `${total} results for "${query}"` : `No results for "${query}"`}
                </p>
            </div>

            {results.length === 0 ? (
                <div style={{ padding: '60px 20px', textAlign: 'center', background: '#f9fafb', borderRadius: '12px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
                    <h3 style={{ marginBottom: '8px' }}>No results found</h3>
                    <p style={{ color: '#666' }}>Try searching with different keywords</p>
                </div>
            ) : (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                        {results.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {total > 20 && (
                        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                style={{
                                    padding: '10px 20px',
                                    background: page === 1 ? '#f3f4f6' : '#1a1a1a',
                                    color: page === 1 ? '#999' : 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                Previous
                            </button>
                            <span style={{ padding: '10px 20px', color: '#666' }}>
                                Page {page} of {Math.ceil(total / 20)}
                            </span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page >= Math.ceil(total / 20)}
                                style={{
                                    padding: '10px 20px',
                                    background: page >= Math.ceil(total / 20) ? '#f3f4f6' : '#1a1a1a',
                                    color: page >= Math.ceil(total / 20) ? '#999' : 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: page >= Math.ceil(total / 20) ? 'not-allowed' : 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchResults;
