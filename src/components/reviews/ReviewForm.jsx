import React, { useState } from 'react';
import StarRating from './StarRating';
import api from '../../utils/api';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
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
            await api.post('/reviews', {
                productId,
                rating,
                title,
                text,
                sessionId: localStorage.getItem('session_id') || 'unknown'
            });
            onReviewSubmitted();
            setRating(0);
            setTitle('');
            setText('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="card" style={{ marginBottom: '24px', background: '#f9fafb', border: '1px solid #e5e7eb' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Write a Review</h3>

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

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
