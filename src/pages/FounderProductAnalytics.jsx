import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import AudienceAnalytics from '../components/AudienceAnalytics';

const FounderProductAnalytics = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [productName, setProductName] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get analytics data
                const res = await api.get(`/founder/products/${id}/audience`);
                setData(res.data);

                // We might need product details too if not returned (api wrapper returns res.data)
                // The analytics endpoint could return product info or we fetch separately.
                // Assuming endpoint returns structure { summary, distributions }
                // We'll fetch product name separately or rely on context if needed.
                // Let's fetch product briefly to get name if analytics doesn't return it.
                // Actually the analytics endpoint we built relies on product ownership.
                // Let's modify frontend to expect simple data.

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

            {/* Tabs (If we add more analytics later, for now just Audience) */}
            <div style={{ borderBottom: '1px solid #e5e7eb', marginBottom: '24px' }}>
                <button style={{
                    padding: '12px 24px',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '2px solid #111827',
                    fontWeight: '600',
                    color: '#111827',
                    cursor: 'pointer'
                }}>
                    Audience
                </button>
            </div>

            <AudienceAnalytics data={data} />
        </div>
    );
};

export default FounderProductAnalytics;
