import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

const Unsubscribe = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [step, setStep] = useState('intercept'); // intercept, feedback, confirm, success, error
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!id) {
            setStep('error');
        }
    }, [id]);

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
            await axios.post(`${apiUrl}/feedback`, {
                id,
                reason,
                message
            });
            // Show Thanks state or go to final check?
            // User said: "Process unsubscribe only after ACK"
            // If they give feedback, we thank them.
            // Then offering "Unsubscribe anyway" option in a "Thanks" view seems best.
            setStep('feedback_sent');
        } catch (error) {
            console.error('Feedback failed', error);
            // Even if feedback fails, allow user to proceed
            setStep('confirm');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUnsubscribe = async () => {
        setIsSubmitting(true);
        try {
            const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
            await axios.get(`${apiUrl}/subscribe/unsubscribe?id=${id}`);
            setStep('success');
        } catch (error) {
            console.error('Unsubscribe failed', error);
            setStep('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (step === 'error') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                    <p className="text-gray-600 mb-6">Invalid link or server error.</p>
                    <Link to="/" className="inline-block px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    if (step === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">You’ve been unsubscribed.</h2>
                    <p className="text-gray-600 mb-6">You won’t receive updates from us anymore.</p>
                    <Link to="/" className="inline-block px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
            <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">

                {/* Step 1: Intercept */}
                {step === 'intercept' && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Before you go</h2>
                        <p className="text-gray-600 mb-8">
                            We send these emails to help you discover great products. <br />
                            If they aren't useful, could you tell us why?
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => setStep('feedback')}
                                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors border-b-4 border-blue-800 active:border-b-0 active:translate-y-1"
                            >
                                Give feedback (30 seconds)
                            </button>
                            <button
                                onClick={() => setStep('confirm')}
                                className="w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-500 font-medium rounded-lg transition-colors text-sm"
                            >
                                Continue to unsubscribe (No thanks)
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Feedback */}
                {step === 'feedback' && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Help us improve</h2>
                        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                                    <input type="radio" name="reason" value="Too many emails" onChange={(e) => setReason(e.target.value)} className="h-4 w-4 text-blue-600" />
                                    <span className="text-gray-700">Too many emails</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                                    <input type="radio" name="reason" value="Not relevant" onChange={(e) => setReason(e.target.value)} className="h-4 w-4 text-blue-600" />
                                    <span className="text-gray-700">Not relevant</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                                    <input type="radio" name="reason" value="Content quality" onChange={(e) => setReason(e.target.value)} className="h-4 w-4 text-blue-600" />
                                    <span className="text-gray-700">Content quality</span>
                                </label>
                                <label className="flex items-center space-x-3 cursor-pointer p-3 border rounded-lg hover:bg-gray-50">
                                    <input type="radio" name="reason" value="Other" onChange={(e) => setReason(e.target.value)} className="h-4 w-4 text-blue-600" />
                                    <span className="text-gray-700">Other</span>
                                </label>
                            </div>

                            <textarea
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                rows="3"
                                placeholder="Any additional details? (Optional)"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>

                            <div className="pt-4 flex flex-col gap-3">
                                <button
                                    type="submit"
                                    disabled={!reason || isSubmitting}
                                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send feedback'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep('confirm')}
                                    className="text-gray-400 hover:text-gray-600 text-sm font-medium"
                                >
                                    Unsubscribe anyway
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Step 2b: Feedback Sent (Thank you) */}
                {step === 'feedback_sent' && (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                            ✓
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Thanks for your feedback!</h2>
                        <p className="text-gray-600 mb-8">We appreciate you helping us verify our content quality.</p>

                        <div className="flex flex-col gap-3">
                            <Link to="/" className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors">
                                Return to Home
                            </Link>
                            <button
                                onClick={() => setStep('confirm')}
                                className="text-gray-400 hover:text-red-500 text-sm font-medium mt-2"
                            >
                                I still want to unsubscribe
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Confirm */}
                {step === 'confirm' && (
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Are you sure you want to unsubscribe?</h2>
                        <p className="text-gray-600 mb-8">You won’t receive updates from us anymore.</p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleUnsubscribe}
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg border border-red-200 transition-colors"
                            >
                                {isSubmitting ? 'Unsubscribing...' : 'Yes, unsubscribe'}
                            </button>
                            <Link
                                to="/"
                                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                            >
                                Keep me subscribed
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Unsubscribe;
