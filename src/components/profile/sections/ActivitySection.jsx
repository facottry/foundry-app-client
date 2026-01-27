import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import { Link } from 'react-router-dom';

const ActivitySection = () => {
    const [data, setData] = useState({ recent_views: [], items_reviewed: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const res = await api.get('/profile/activity-summary');
                setData(res.data);
            } catch (err) {
                console.error('Failed to load activity', err);
            } finally {
                setLoading(false);
            }
        };
        fetchActivity();
    }, []);

    if (loading) return <div>Loading activity...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Recently Viewed */}
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb', fontWeight: '600', background: '#f9fafb' }}>Recently Viewed Products</div>
                {data.recent_views.length === 0 ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#9ca3af' }}>No recent views</div>
                ) : (
                    <div>
                        {data.recent_views.map((item, idx) => (
                            <Link
                                key={idx}
                                to={`/product/${item.product._id}`}
                                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', borderBottom: '1px solid #f3f4f6', textDecoration: 'none', color: 'inherit' }}
                            >
                                <div style={{ width: '40px', height: '40px', background: '#f3f4f6', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                                    {item.product.logo_url && <img src={item.product.logo_url} alt="" style={{ width: '100%', height: '100%' }} />}
                                </div>
                                <div>
                                    <div style={{ fontWeight: '500', color: '#2563eb' }}>{item.product.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Viewed {new Date(item.viewed_at).toLocaleDateString()}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Recent Reviews */}
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb', fontWeight: '600', background: '#f9fafb' }}>Your Reviews</div>
                {data.items_reviewed.length === 0 ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#9ca3af' }}>No reviews yet</div>
                ) : (
                    <div>
                        {data.items_reviewed.map((review, idx) => (
                            <div key={idx} style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                    <Link to={`/product/${review.product_id._id}`} style={{ fontWeight: '500', color: '#111827', textDecoration: 'none' }}>
                                        {review.product_id.name}
                                    </Link>
                                    <span style={{ fontSize: '0.9rem', color: '#fbbf24' }}>{'★'.repeat(review.rating)}</span>
                                    <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{new Date(review.created_at).toLocaleDateString()}</span>
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.4' }}>"{review.text}"</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivitySection;
