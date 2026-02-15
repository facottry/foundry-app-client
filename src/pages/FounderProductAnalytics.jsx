import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import OverviewTab from '../components/analytics/OverviewTab';
import AudienceAnalytics from '../components/AudienceAnalytics';
import ReviewsAnalytics from '../components/analytics/ReviewsAnalytics';
import ActivityTable from '../components/analytics/ActivityTable';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { Download, Calendar, ChevronDown } from 'lucide-react';

const FounderProductAnalytics = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        product: null,
        traffic: null,
        audience: null,
        reviews: [],
        activity: []
    });
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    // Tabs: 'overview', 'audience', 'reviews', 'realtime'

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Parallel data fetching for a comprehensive dashboard
            // In a real huge app, we might split this by tab, but for 'Overview' we need bits of everything
            const [productRes, trafficRes, timelineRes, audienceRes, activityRes] = await Promise.all([
                api.get(`/products/${id}`),
                api.get(`/founder/traffic/${id}/summary`),
                api.get(`/founder/traffic/${id}/timeline`),
                api.get(`/founder/products/${id}/audience`),
                // We might need a reviews endpoint, for now we can rely on what we have or mock if missing specific endpoint
                // Assuming audience endpoint returns some reviews stats or we fetch separately
                // Adding activity log fetch
                api.get(`/founder/products/${id}/activity`) // Assuming this exists or we fallback
            ]).catch(err => {
                // If specific non-critical endpoints fail, we can handle gracefully
                console.warn("Some analytics endpoints might be missing", err);
                return [null, null, null, null, null];
            });

            // Handle potential failures in specific requests
            if (!productRes?.data) throw new Error("Failed to load product");

            setData({
                product: productRes?.data,
                traffic: {
                    summary: trafficRes?.data?.total,
                    today: trafficRes?.data?.today,
                    timeline: timelineRes?.data?.timeline
                },
                audience: audienceRes?.data,
                activity: activityRes?.data?.activity || []
            });

        } catch (err) {
            console.error('Error fetching analytics:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} onRetry={fetchData} />;

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'audience', label: 'Audience' },
        { id: 'reviews', label: 'Reviews & Sentiment' },
        { id: 'realtime', label: 'Real-time Activity' }
    ];

    return (
        <div style={{ paddingTop: '40px', paddingBottom: '60px' }}>
            {/* Header / Nav Back */}
            <div className="mb-8">
                <Link to="/founder/dashboard" className="text-gray-500 hover:text-gray-900 text-sm font-medium mb-4 inline-block">
                    &larr; Back to Products
                </Link>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analytics Dashboard</h1>
                        <p className="text-gray-500 mt-1">Monetization & Performance Intelligence for <span className="font-semibold text-gray-700">{data.product.name}</span></p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
                            Last 30 Days
                            <ChevronDown size={14} className="text-gray-400" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
                            <Download size={16} className="text-gray-500" />
                            Export CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
                <nav className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar" aria-label="Tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                                ${activeTab === tab.id
                                    ? 'border-[#D97757] text-[#D97757]'  /* Brand Primary Color */
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {activeTab === 'overview' && (
                    <OverviewTab data={data.traffic} />
                )}

                {activeTab === 'audience' && (
                    <AudienceAnalytics data={data.audience} />
                )}

                {activeTab === 'reviews' && (
                    <ReviewsAnalytics data={data.audience} />
                    /* Assuming reviews data is nested in audience response for now or we mock it in the component */
                )}

                {activeTab === 'realtime' && (
                    <ActivityTable activity={data.activity} />
                )}
            </div>
        </div>
    );
};

export default FounderProductAnalytics;
