import React, { useState } from 'react';
import api from '../utils/api';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.post('/contact', formData);
            setSubmitted(true);
        } catch (err) {
            setError(err.message || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ paddingTop: '60px', paddingBottom: '60px' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '16px' }}>Get in Touch</h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '48px' }}>
                    Have questions? We'd love to hear from you.
                </p>

                {submitted ? (
                    <div className="card" style={{ padding: '40px', textAlign: 'center', background: '#E6F4EA', border: '1px solid #A8D5BA' }}>
                        <h3 style={{ color: '#1E6F3E', marginBottom: '16px' }}>Message Sent!</h3>
                        <p style={{ color: '#2E7D32' }}>We'll get back to you as soon as possible.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="card">
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Subject</label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div style={{ marginBottom: '32px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Message</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                                rows="6"
                                style={{ width: '100%', resize: 'vertical' }}
                            />
                        </div>
                        {error && (
                            <div style={{ padding: '12px', background: '#fef2f2', color: '#991b1b', borderRadius: '6px', marginBottom: '16px' }}>
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '14px' }}
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Contact;
