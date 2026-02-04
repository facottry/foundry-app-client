import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import ReviewForm from './ReviewForm';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const ReviewList = ({ productId, user, productOwnerId, slug, isFullPage = false }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ avgRating: 0, count: 0, distribution: {} });
    const [sentimentCounts, setSentimentCounts] = useState({ positive: 0, neutral: 0, negative: 0 });
    const [sort, setSort] = useState('newest');
    const [showForm, setShowForm] = useState(false);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/reviews/products/${productId}?sort=${sort}`);

            // Backend now returns { data: [], sentimentCounts: {} } or array (legacy fallback)
            const reviewData = Array.isArray(res.data) ? res.data : (res.data.data || []);
            const sentiments = res.data.sentimentCounts || { positive: 0, neutral: 0, negative: 0 };

            setReviews(reviewData);
            setSentimentCounts(sentiments);

            // Calculate client-side stats
            const count = reviewData.length;
            const avg = count > 0 ? reviewData.reduce((acc, r) => acc + r.rating, 0) / count : 0;
            const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
            reviewData.forEach(r => dist[r.rating] = (dist[r.rating] || 0) + 1);

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

    // Check if user has already reviewed
    const hasReviewed = user && reviews.some(r => r.user_id?._id === user.id);

    // Check if user is owner (passed from parent or derived if context available)
    // We assume parent passes productOwnerId if possible, else we rely on server 403.
    // Ideally ProductTabs passes product.owner_user_id.
    // robust check handling populated objects or strings
    const ownerIdStr = typeof productOwnerId === 'object'
        ? (productOwnerId._id || productOwnerId).toString()
        : productOwnerId?.toString();
    const userIdStr = (user?.id || user?._id)?.toString();

    const isOwner = userIdStr && ownerIdStr && userIdStr === ownerIdStr;

    const canReview = user && !hasReviewed && (user.role === 'CUSTOMER' || user.role === 'FOUNDER');


    // V1 Integration: Fetch summary
    const [v1Stats, setV1Stats] = useState(null);

    const fetchSummary = async () => {
        try {
            const res = await api.get(`/reviews/products/${productId}/review-summary`);
            if (res.data) setV1Stats(res.data);
        } catch (err) {
            console.error('Failed to load review summary', err);
        }
    };

    useEffect(() => {
        fetchReviews();
        fetchSummary();
    }, [productId, sort]);

    // Use V1 stats if available, else fallback
    const ratingValue = v1Stats ? v1Stats.weightedRating : stats.avgRating;
    const ratingCount = v1Stats ? v1Stats.counts.review : stats.count;
    const sentimentCountsDisplay = v1Stats ? v1Stats.sentiment : sentimentCounts;

    // V1 Chart Data
    const sentimentData = [
        { name: 'Positive', value: sentimentCountsDisplay.positive, color: '#10b981' },
        { name: 'Neutral', value: sentimentCountsDisplay.neutral, color: '#9ca3af' },
        { name: 'Negative', value: sentimentCountsDisplay.negative, color: '#ef4444' }
    ].filter(d => d.value > 0);

    return (
        <div style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Reviews</h2>
                {!isFullPage && slug && (
                    <Link to={`/product/${slug}/reviews`} style={{ fontSize: '0.95rem', color: '#6366f1', fontWeight: '500', textDecoration: 'none' }}>
                        View all reviews →
                    </Link>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                {/* Left: Stats & Sentiment */}
                <div>
                    <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#111827', lineHeight: 1 }}>
                                    {ratingValue.toFixed(1)}
                                </div>
                                <div style={{ marginBottom: '8px' }}>
                                    <StarRating rating={Math.round(ratingValue)} size={20} />
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '20px' }}>
                                    Based on {ratingCount} reviews
                                </div>
                                {v1Stats && (
                                    <div style={{ fontSize: '0.8rem', color: '#6b7280', background: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>
                                        Weighted Rating (v1)
                                    </div>
                                )}
                            </div>

                            {/* Sentiment Pie Chart */}
                            {(sentimentData.length > 0) && (
                                <div style={{ width: '120px', height: '120px', position: 'relative' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={sentimentData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={30}
                                                outerRadius={50}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {sentimentData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </div>

                        {/* Distribution Bars - Keep legacy distribution for now or fetch from summary if implemented */}
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

                        {/* Sentiment Legend */}
                        {(sentimentData.length > 0) && (
                            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-around', fontSize: '0.8rem' }}>
                                <div style={{ color: '#10b981', fontWeight: '600' }}>😊 {sentimentCountsDisplay.positive}</div>
                                <div style={{ color: '#6b7280', fontWeight: '600' }}>😐 {sentimentCountsDisplay.neutral}</div>
                                <div style={{ color: '#ef4444', fontWeight: '600' }}>😞 {sentimentCountsDisplay.negative}</div>
                            </div>
                        )}

                        {/* Weekly Satisfaction (v1) */}
                        {v1Stats && v1Stats.weeklySatisfaction && v1Stats.weeklySatisfaction.length > 0 && (
                            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Weekly Satisfaction Trend</div>
                                <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '40px' }}>
                                    {v1Stats.weeklySatisfaction.slice(-10).map((week, i) => (
                                        <div key={week.week} title={`${week.week}: ${week.score}`} style={{
                                            flex: 1,
                                            background: `rgba(16, 185, 129, ${week.score / 100})`,
                                            height: `${Math.max(10, week.score / 2)}%`,
                                            borderRadius: '2px',
                                            minHeight: '4px'
                                        }}></div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Reviews List */}
                <div>
                    {/* Write Review Section */}
                    {(canReview && showForm) && (
                        <ReviewForm productId={productId} onReviewSubmitted={() => { setShowForm(false); fetchReviews(); }} />
                    )}
                    {canReview && !showForm && reviews.length > 0 && (
                        <button
                            onClick={() => setShowForm(true)}
                            style={{
                                width: '100%',
                                padding: '12px 24px',
                                marginBottom: '16px',
                                background: '#6366f1',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            ✍️ Write a Review
                        </button>
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
                            No reviews yet. Be the first to{' '}
                            {canReview ? (
                                <button
                                    onClick={() => setShowForm(true)}
                                    style={{
                                        color: '#6366f1',
                                        fontWeight: '600',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    share your thoughts!
                                </button>
                            ) : (
                                <span>share your thoughts!</span>
                            )}
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

                                    {/* Sentiment/AI Badge */}
                                    {review.sentiment && (
                                        <div style={{ marginTop: '8px' }}>
                                            <span style={{
                                                fontSize: '0.7rem',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                background: review.sentiment === 'positive' ? '#ecfdf5' : review.sentiment === 'negative' ? '#fef2f2' : '#f3f4f6',
                                                color: review.sentiment === 'positive' ? '#047857' : review.sentiment === 'negative' ? '#b91c1c' : '#4b5563',
                                                fontWeight: '600'
                                            }}>
                                                AI Analysis: {review.sentiment.charAt(0).toUpperCase() + review.sentiment.slice(1)}
                                            </span>
                                        </div>
                                    )}

                                    {/* Tags */}
                                    {review.ai_tags && review.ai_tags.length > 0 && (
                                        <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                                            {review.ai_tags.map(tag => (
                                                <span key={tag} className="badge" style={{ fontSize: '0.75rem', padding: '2px 8px', background: '#f3f4f6', color: '#6b7280' }}>
                                                    #{tag}
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
