import React, { useState } from 'react';
import StarRating from './StarRating';
import api from '../../utils/api';

const ReviewForm = ({ productId, onReviewSubmitted, initialData = null, onCancel }) => {
    const [rating, setRating] = useState(initialData?.rating || 0);
    const [title, setTitle] = useState(initialData?.title || '');
    const [text, setText] = useState(initialData?.text || '');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (rating === 0) {
            setError('Please select a star rating.');
            return;
        }

        setSubmitting(true);
        try {
            if (initialData) {
                // Edit Mode
                await api.put(`/reviews/${initialData._id}`, {
                    rating,
                    title,
                    text
                });
            } else {
                // Create Mode
                await api.post('/reviews', {
                    productId,
                    rating,
                    title,
                    text,
                    sessionId: localStorage.getItem('session_id') || 'unknown'
                });
            }

            onReviewSubmitted();
            if (!initialData) {
                setRating(0);
                setTitle('');
                setText('');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="card" style={{ marginBottom: '24px', background: '#f9fafb', border: '1px solid #e5e7eb' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>{initialData ? 'Update your review' : 'Write a Review'}</h3>

            {error && <div style={{ color: '#dc2626', marginBottom: '12px', fontSize: '0.9rem' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '500' }}>Rating</label>
                    <StarRating rating={rating} size={24} interactive={true} onChange={setRating} />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '500' }}>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Summarize your experience"
                        maxLength={100}
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '500' }}>Review</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="What did you like or dislike?"
                        rows={4}
                        required
                        maxLength={2000}
                        style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                    >
                        {submitting ? 'Submitting...' : (initialData ? 'Update Review' : 'Submit Review')}
                    </button>
                    {initialData && onCancel && (
                        <button
                            type="button"
                            className="btn btn-outline"
                            onClick={onCancel}
                            style={{ background: 'transparent', border: '1px solid #d1d5db', color: '#374151' }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
