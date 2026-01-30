import React, { useState } from 'react';
import axios from 'axios';

const NewsletterSignup = () => {
    const [email, setEmail] = useState('');
    const [submittedEmail, setSubmittedEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            await axios.post(`${apiUrl}/subscribe`, { email, source: 'landing_page' });

            setStatus('success');
            setSubmittedEmail(email);
            setEmail('');
        } catch (error) {
            setStatus('error');
            setMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
        }
    };

    if (status === 'success') {
        return (
            <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    📩
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Check your inbox!</h3>
                <p className="text-gray-600">We've sent a confirmation link to <strong>{submittedEmail}</strong>.</p>
                <button onClick={() => setStatus('idle')} className="mt-4 text-sm text-blue-600 font-semibold hover:underline">
                    Subscribe another email
                </button>
            </div>
        );
    }

    return (
        <div className="newsletter-signup">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                <div className="relative">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                    />
                </div>
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {status === 'loading' ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </>
                    ) : (
                        'Join Free'
                    )}
                </button>
            </form>

            {status === 'error' && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                    <span>⚠️</span> {message}
                </div>
            )}

            <p className="text-xs text-gray-400 mt-4 text-center">
                Strictly no spam. Unsubscribe at any time.
            </p>
        </div>
    );
};

export default NewsletterSignup;
