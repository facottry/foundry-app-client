import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import TrafficAnalytics from '../components/founder/TrafficAnalytics';
import AudienceAnalytics from '../components/AudienceAnalytics';

const FounderProductAnalytics = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [productName, setProductName] = useState('');
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('audience'); // 'audience' | 'traffic'
    const [filters, setFilters] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get audience data with filters
                const res = await api.get(`/founder/products/${id}/audience`, { params: filters });
                setData(res.data);

                // Fetch product name for header (only if not set)
                // We don't need to refetch product details on filter change, but simplest to leave as is or optimize
                if (!productName) {
                    const productRes = await api.get(`/products/${id}`);
                    setProductName(productRes.data.name);
                }

            } catch (err) {
                console.error('Error fetching analytics:', err);
                setError('Failed to load analytics data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, filters]);

    const handleFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const removeFilter = (key) => {
        setFilters(prev => {
            const next = { ...prev };
            delete next[key];
            return next;
        });
    };

    const clearFilters = () => {
        setFilters({});
    };

    if (loading && !data) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading analytics...</div>; // Only show full loading first time
    if (error) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>{error}</div>;

    return (
        <div style={{ paddingTop: '40px', paddingBottom: '60px' }}>
            <div style={{ marginBottom: '30px' }}>
                <Link to="/founder/dashboard" style={{ color: '#666', textDecoration: 'none', marginBottom: '16px', display: 'inline-block' }}>
                    &larr; Back to Dashboard
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Analytics: {productName}</h1>
                        <p style={{ color: '#666' }}>Audience insights and interaction metrics</p>
                    </div>
                    <div>
                        <a href={`/product/${id}`} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ marginRight: '10px' }}>View Product</a>
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            {Object.keys(filters).length > 0 && (
                <div style={{ marginBottom: '20px', padding: '12px 16px', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fcd34d', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontWeight: '600', color: '#92400e', marginRight: '8px' }}>Active Filters:</span>
                    {Object.entries(filters).map(([key, value]) => (
                        <div key={key} style={{ background: '#fff', padding: '4px 12px', borderRadius: '16px', border: '1px solid #f59e0b', fontSize: '0.9rem', color: '#b45309', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ textTransform: 'capitalize' }}>{key}: <strong>{value}</strong></span>
                            <button
                                onClick={() => removeFilter(key)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#b45309', fontWeight: 'bold', padding: '0 2px' }}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={clearFilters}
                        style={{ marginLeft: 'auto', background: 'transparent', border: 'none', textDecoration: 'underline', color: '#92400e', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                        Clear All
                    </button>
                </div>
            )}

            {/* Tabs */}
            <div style={{ borderBottom: '1px solid #e5e7eb', marginBottom: '24px', display: 'flex' }}>
                <button
                    onClick={() => setActiveTab('audience')}
                    style={{
                        padding: '12px 24px',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === 'audience' ? '2px solid #111827' : '2px solid transparent',
                        fontWeight: '600',
                        color: activeTab === 'audience' ? '#111827' : '#6b7280',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out'
                    }}
                >
                    Audience
                </button>
                <button
                    onClick={() => setActiveTab('traffic')}
                    style={{
                        padding: '12px 24px',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === 'traffic' ? '2px solid #111827' : '2px solid transparent',
                        fontWeight: '600',
                        color: activeTab === 'traffic' ? '#111827' : '#6b7280',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out'
                    }}
                >
                    Traffic
                </button>
            </div>

            {activeTab === 'audience' && <AudienceAnalytics data={data} onFilter={handleFilter} />}
            {activeTab === 'traffic' && <TrafficAnalytics />}
            {/* Note: TrafficAnalytics uses useParams() internally to get ID */}
        </div>
    );
};

export default FounderProductAnalytics;
