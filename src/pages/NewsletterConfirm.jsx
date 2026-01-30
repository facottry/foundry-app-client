import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

const NewsletterConfirm = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const id = searchParams.get('id');
    const [status, setStatus] = useState('verifying'); // verifying, success, error, already_confirmed
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token || !id) {
            setStatus('error');
            setMessage('Invalid link parameters.');
            return;
        }

        const confirmSubscription = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const res = await axios.get(`${apiUrl}/subscribe/confirm?token=${token}&id=${id}`);

                if (res.data.message.includes('Already confirmed')) {
                    setStatus('already_confirmed');
                } else {
                    setStatus('success');
                }
                setMessage(res.data.message);
            } catch (error) {
                console.error('Confirmation failed', error);
                setStatus('error');
                setMessage(error.response?.data?.error || 'Verification failed. The link might be expired.');
            }
        };

        confirmSubscription();
    }, [token, id]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl text-center border border-white/50 backdrop-blur-sm">

                {status === 'verifying' && (
                    <div className="animate-pulse">
                        <div className="h-16 w-16 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <span className="text-3xl">🔄</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">Verifying...</h2>
                        <p className="text-gray-500">Connecting to the mothership.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="animate-fade-in-up">
                        <div className="h-20 w-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center shadow-inner">
                            <span className="text-4xl">✨</span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 mb-4">You're In!</h2>
                        <p className="text-gray-600 mb-8 text-lg">Subscription confirmed. Get ready for some awesome updates.</p>
                        <Link to="/" className="inline-block w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition transform hover:-translate-y-1 shadow-lg">
                            Start Exploring 🚀
                        </Link>
                    </div>
                )}

                {status === 'already_confirmed' && (
                    <div className="animate-fade-in-up">
                        <div className="h-20 w-20 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <span className="text-4xl">✅</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Already Verified</h2>
                        <p className="text-gray-600 mb-8">{message}</p>
                        <Link to="/" className="inline-block w-full py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition">
                            Back to Home
                        </Link>
                    </div>
                )}

                {status === 'error' && (
                    <div className="animate-shake">
                        <div className="h-20 w-20 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                            <span className="text-4xl">💔</span>
                        </div>
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Oops!</h2>
                        <p className="text-gray-600 mb-8">{message}</p>
                        <Link to="/" className="text-gray-500 underline hover:text-gray-800">
                            Return to Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsletterConfirm;
