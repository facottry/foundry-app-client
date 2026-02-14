import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const VisitRedirect = () => {
    const { id } = useParams();
    const [status, setStatus] = useState('loading'); // loading, ready, error
    const [product, setProduct] = useState(null);
    const [targetUrl, setTargetUrl] = useState('');

    useEffect(() => {
        let isMounted = true;

        const initRedirect = async () => {
            try {
                // 1. Fetch Product Details (Instant UI Context)
                // Use slug endpoint which handles both ID and Slug
                const { data: productData } = await api.get(`/products/slug/${id}`);

                if (!isMounted) return;

                if (productData) {
                    setProduct(productData);
                    const url = productData.website_url;
                    const finalUrl = url.startsWith('http') ? url : `https://${url}`;

                    // Add params
                    const dest = new URL(finalUrl);
                    dest.searchParams.append('fid', 'clicktory');

                    setTargetUrl(dest.toString());
                    setStatus('ready');

                    // 2. Fire Async Tracking (Fire and Forget)
                    // We don't await this for the UI update, but we trigger it now.
                    // The backend ?mode=track returns JSON and does logging.
                    api.get(`/r/${id}?mode=track`)
                        .then(res => {
                            if (res.data?.visit_id && isMounted) {
                                // Optionally append visit_id if returned
                                dest.searchParams.append('vid', res.data.visit_id);
                                setTargetUrl(dest.toString());
                            }
                        })
                        .catch(err => console.error("Tracking ping failed", err));

                    // 3. Auto Redirect after premium delay
                    setTimeout(() => {
                        if (isMounted) {
                            window.location.replace(dest.toString());
                        }
                    }, 1200); // 1.2s delay for "Premium Feeel" + allowing visual recognition
                } else {
                    throw new Error('Product not found');
                }

            } catch (err) {
                console.error("Redirect init error", err);
                if (isMounted) setStatus('error');
            }
        };

        initRedirect();

        return () => { isMounted = false; };
    }, [id]);


    // UI RENDER HELPERS
    if (status === 'error') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Destination Unreachable</h3>
                <p className="text-gray-500 mb-6">We couldn't locate the product you are looking for.</p>
                <div className="space-x-4">
                    <button onClick={() => window.location.reload()} className="px-6 py-2 bg-gray-200 rounded-full text-gray-700 font-medium hover:bg-gray-300 transition">Retry</button>
                    <button onClick={() => window.history.back()} className="px-6 py-2 bg-white border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition">Go Back</button>
                </div>
            </div>
        );
    }

    // PREMIUM CARD UI
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 bg-opacity-95 backdrop-blur-sm text-white">
            {/* Background enhancement */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md p-8 bg-gray-800/80 border border-gray-700 shadow-2xl rounded-2xl backdrop-blur-md text-center transform transition-all animate-fadeIn">

                {/* Logo Area */}
                <div className="mb-8 flex justify-center">
                    {product ? (
                        <div className="w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden p-2">
                            {product.logoUrl ? (
                                <img src={product.logoUrl} alt={product.name} className="w-full h-full object-contain" />
                            ) : (
                                <span className="text-3xl font-bold text-indigo-600">{product.name.charAt(0)}</span>
                            )}
                        </div>
                    ) : (
                        // Loading Skeleton
                        <div className="w-20 h-20 bg-gray-700 rounded-xl animate-pulse"></div>
                    )}
                </div>

                {/* Text Context */}
                <div className="mb-8">
                    {product ? (
                        <>
                            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 mb-4">
                                <span className="px-2 py-0.5 border border-gray-600 rounded text-xs uppercase tracking-wide">Leaving Clicktory</span>
                                <span>&rarr;</span>
                                <span className="text-indigo-400 truncate max-w-[150px]">{new URL(targetUrl || 'http://...').hostname}</span>
                            </div>
                            <p className="text-gray-300 text-lg animate-pulse">Opening official website...</p>
                        </>
                    ) : (
                        <div className="space-y-3">
                            <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
                            <div className="h-4 bg-gray-700 rounded w-1/3 mx-auto animate-pulse"></div>
                        </div>
                    )}
                </div>

                {/* Progress / Loader */}
                <div className="w-full bg-gray-700 h-1 mt-6 mb-8 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 animate-progressBar rounded-full" style={{ width: '100%' }}></div>
                </div>


                {/* Manual Actions */}
                <div className="flex flex-col space-y-3">
                    {targetUrl && (
                        <a href={targetUrl} className="text-sm text-indigo-400 hover:text-indigo-300 transition">
                            Click here if not redirected
                        </a>
                    )}
                    <button
                        onClick={() => window.history.back()}
                        className="text-sm text-gray-500 hover:text-white transition mt-4"
                    >
                        Cancel
                    </button>
                </div>

            </div>

            {/* Branding */}
            <div className="absolute bottom-8 text-gray-600 text-sm font-medium">
                Protected by Clicktory
            </div>
        </div>
    );
};

export default VisitRedirect;
