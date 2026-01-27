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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get audience data
                const res = await api.get(`/founder/products/${id}/audience`);
                setData(res.data);

                // Fetch product name for header
                const productRes = await api.get(`/products/${id}`);
                setProductName(productRes.data.name);

            } catch (err) {
                console.error('Error fetching analytics:', err);
                setError('Failed to load analytics data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading analytics...</div>;
    if (error) return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>{error}</div>;

    return (
        <div style={{ paddingTop: '40px', paddingBottom: '60px' }}>
            <div style={{ marginBottom: '30px' }}>
                <Link to="/dashboard/founder" style={{ color: '#666', textDecoration: 'none', marginBottom: '16px', display: 'inline-block' }}>
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

            {activeTab === 'audience' && <AudienceAnalytics data={data} />}
            {activeTab === 'traffic' && <TrafficAnalytics />}
            {/* Note: TrafficAnalytics uses useParams() internally to get ID */}
        </div>
    );
};

export default FounderProductAnalytics;
