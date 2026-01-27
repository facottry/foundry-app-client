import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';

const ReviewList = ({ productId, user }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ avgRating: 0, count: 0, distribution: {} });
    const [sort, setSort] = useState('newest');

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/products/${productId}/reviews?sort=${sort}`);
            setReviews(res.data);

            // Calculate client-side stats for now (optimization)
            const count = res.data.length;
            const avg = count > 0 ? res.data.reduce((acc, r) => acc + r.rating, 0) / count : 0;
            const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
            res.data.forEach(r => dist[r.rating] = (dist[r.rating] || 0) + 1);

            setStats({ avgRating: avg, count, distribution: dist });

        } catch (err) {
            console.error('Failed to load reviews', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [productId, sort]);

    const handleSortChange = (e) => setSort(e.target.value);

    // Check if user has already reviewed (basic client side check)
    // In prod, check against server response or `user_id` in reviews list
    const hasReviewed = user && reviews.some(r => r.user_id?._id === user.id);
    const canReview = user && user.role === 'CUSTOMER' && !hasReviewed;

    return (
        <div style={{ marginTop: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Reviews</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
                {/* Left: Stats */}
                <div>
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#111827', lineHeight: 1 }}>
                            {stats.avgRating.toFixed(1)}
                        </div>
                        <div style={{ marginBottom: '8px' }}>
                            <StarRating rating={Math.round(stats.avgRating)} size={20} />
                        </div>
                        <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '24px' }}>
                            Based on {stats.count} reviews
                        </div>

                        {/* Distribution Bars */}
                        {[5, 4, 3, 2, 1].map(star => {
                            const count = stats.distribution[star] || 0;
                            const percent = stats.count > 0 ? (count / stats.count) * 100 : 0;
                            return (
                                <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '0.85rem', width: '12px' }}>{star}</span>
                                    <div style={{ flex: 1, height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{ width: `${percent}%`, height: '100%', background: '#fbbf24' }}></div>
                                    </div>
                                    <span style={{ fontSize: '0.85rem', width: '24px', textAlign: 'right', color: '#9ca3af' }}>{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right: Reviews List */}
                <div>
                    {/* Write Review Section */}
                    {canReview && (
                        <ReviewForm productId={productId} onReviewSubmitted={fetchReviews} />
                    )}

                    {/* Sort Control */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                        <select
                            value={sort}
                            onChange={handleSortChange}
                            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
                        >
                            <option value="newest">Newest</option>
                            <option value="highest">Highest Rating</option>
                            <option value="lowest">Lowest Rating</option>
                        </select>
                    </div>

                    {/* Review Loop */}
                    {loading ? (
                        <div>Loading reviews...</div>
                    ) : reviews.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', background: '#f9fafb', borderRadius: '12px', color: '#666' }}>
                            No reviews yet. Be the first to share your thoughts!
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {reviews.map(review => (
                                <div key={review._id} style={{ paddingBottom: '24px', borderBottom: '1px solid #e5e7eb' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                {review.user_id?.name?.charAt(0) || 'U'}
                                            </div>
                                            <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{review.user_id?.name || 'Anonymous'}</span>
                                        </div>
                                        <div style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
                                            {new Date(review.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div style={{ marginBottom: '8px' }}>
                                        <StarRating rating={review.rating} size={14} />
                                    </div>
                                    {review.title && <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px' }}>{review.title}</h4>}
                                    <p style={{ color: '#374151', lineHeight: '1.5', fontSize: '0.95rem' }}>
                                        {review.text}
                                    </p>

                                    {/* AI Tags Badge (Admin/Founder view mostly, but adding here for demo) */}
                                    {review.ai_tags && review.ai_tags.length > 0 && (
                                        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                                            {review.ai_tags.map(tag => (
                                                <span key={tag} className="badge" style={{ fontSize: '0.75rem', padding: '2px 8px', background: '#f3f4f6', color: '#6b7280' }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewList;
