import React, { useState } from 'react';
import api from '../utils/api';
import { getOrCreateSessionId } from '../utils/sessionUtils';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(5);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Check auth on render
    const token = localStorage.getItem('token');

    // Auth Guard: Show Login Prompt if not logged in
    if (!token) {
        return (
            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Write a Review</h3>
                <p style={{ color: '#666', marginBottom: '20px' }}>Please log in to share your experience with this product.</p>
                <button
                    onClick={() => window.location.href = '/login'}
                    className="btn btn-primary"
                    style={{ padding: '10px 24px' }}
                >
                    Log In to Review
                </button>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const sessionId = getOrCreateSessionId();
            await api.post('/reviews', {
                productId,
                rating,
                text,
                sessionId
            });
            setSuccess(true);
            setText('');
            if (onReviewSubmitted) onReviewSubmitted();
        } catch (err) {
            console.error('Failed to submit review:', err);
            setError('Failed to submit review. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div style={{ padding: '20px', background: '#ecfdf5', borderRadius: '12px', border: '1px solid #10b981', color: '#065f46' }}>
                <h3>Thank you for your review!</h3>
                <p>Your feedback helps others discover great products.</p>
                <button
                    onClick={() => setSuccess(false)}
                    style={{ marginTop: '10px', background: 'transparent', border: '1px solid #065f46', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', color: '#065f46' }}
                >
                    Write another review
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Write a Review</h3>

            {error && <div style={{ color: '#ef4444', marginBottom: '16px' }}>{error}</div>}

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Rating</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: star <= rating ? '#fbbf24' : '#d1d5db',
                                padding: 0
                            }}
                        >
                            ★
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Review</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    rows={4}
                    placeholder="Share your experience..."
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #d1d5db',
                        fontSize: '1rem',
                        fontFamily: 'inherit'
                    }}
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px' }}
            >
                {loading ? 'Submitting...' : 'Submit Review'}
            </button>
        </form>
    );
};

export default ReviewForm;
