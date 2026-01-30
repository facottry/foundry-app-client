import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

const Unsubscribe = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [status, setStatus] = useState('processing'); // processing, success, error

    useEffect(() => {
        if (!id) {
            setStatus('error');
            return;
        }

        const unsubscribeUser = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
                await axios.get(`${apiUrl}/subscribe/unsubscribe?id=${id}`);
                setStatus('success');
            } catch (error) {
                console.error('Unsubscribe failed', error);
                setStatus('error');
            }
        };

        unsubscribeUser();
    }, [id]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                {status === 'processing' && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Processing...</h2>
                        <p className="text-gray-600">Please wait while we unsubscribe you.</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Unsubscribed</h2>
                        <p className="text-gray-600 mb-6">You have been removed from the mailing list. You won't receive further emails.</p>
                        <Link to="/" className="inline-block px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                            Return to Home
                        </Link>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
                        <p className="text-gray-600 mb-6">We couldn't verify your request. You may already be unsubscribed.</p>
                        <Link to="/" className="inline-block px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                            Back to Home
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Unsubscribe;
