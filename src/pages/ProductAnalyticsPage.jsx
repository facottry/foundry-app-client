import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';

import KPIStatCard from '../components/analytics/KPIStatCard';
import AnalyticsLineChart from '../components/analytics/AnalyticsLineChart';
import AudienceGrid from '../components/analytics/AudienceGrid';
import ActivityTable from '../components/analytics/ActivityTable';

const ProductAnalyticsPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null); // Overview dashboard data
    const [error, setError] = useState(null);
    const [range, setRange] = useState('30d');

    // Feature: Tabs & Reviews
    const [activeTab, setActiveTab] = useState('overview'); // overview, audience, reviews, activity
    const [reviewsData, setReviewsData] = useState(null); // { reviews, stats }

    // Fetch Overview Data
    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/analytics/product/${id}/dashboard?range=${range}`);
                setData(res.data);
            } catch (err) {
                console.error("Analytics fetch error:", err);
                setError(err);
            }
            setLoading(false);
        };
        fetchAnalytics();
    }, [id, range]);

    // Fetch Reviews Data (Lazy Load)
    useEffect(() => {
        if (activeTab === 'reviews' && !reviewsData) {
            api.get(`/founder/products/${id}/reviews`)
                .then(res => setReviewsData(res.data.data))
                .catch(err => console.error("Reviews fetch error", err));
        }
    }, [activeTab, id, reviewsData]);

    if (loading) return <div className="p-12"><LoadingState /></div>;
    if (error) return <ErrorState error={error} />;
    if (!data) return null;

    const { summary, trends, distributions, activity, segments } = data;

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-10">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* 1. Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <Link to="/founder/products" className="text-sm text-gray-500 hover:text-gray-900 mb-2 block font-medium">
                            &larr; Back to Products
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analytics Dashboard</h1>
                        <p className="text-gray-500">Monetization & Performance Intelligence</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            value={range}
                            onChange={e => setRange(e.target.value)}
                            className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm"
                        >
                            <option value="24h">Last 24 Hours</option>
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                        </select>
                        <button className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 font-medium rounded-lg text-sm px-4 py-2.5 shadow-sm transition-colors">
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* KPI Strip (Always visible?) - Or maybe only on Overview? Let's keep distinct. */}
                {/* Actually, let's keep KPIs common as context, but maybe smaller? Standard Vertical Vertical Stack implies KPIs top. */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <KPIStatCard title="Total Views" value={summary.views} subtext="Unique Visitors" icon="👁️" trend="up" trendValue={summary.uniqueVisitors} />
                    <KPIStatCard title="Website Clicks" value={summary.clicks} subtext="High Intent Actions" icon="🖱️" trend="neutral" />
                    <KPIStatCard title="Click Through Rate" value={`${summary.ctr}%`} subtext="Conversion Quality" icon="⚡" trend={summary.ctr > 2 ? 'up' : 'neutral'} />
                    <KPIStatCard title="Credits Consumed" value={summary.creditsConsumed} subtext="Billable Traffic" icon="💎" trend="neutral" />
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-8 overflow-x-auto">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {[
                            { id: 'overview', label: 'Overview' },
                            { id: 'audience', label: 'Audience' },
                            { id: 'reviews', label: 'Reviews & Sentiment' }, // New Tab
                            { id: 'activity', label: 'Real-time Activity' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                                    ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* TAB CONTENT */}

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2">
                            <AnalyticsLineChart data={trends} />
                        </div>
                        {/* 3b. User Segments (Side Panel) */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">User Segments</h3>
                            <div className="space-y-4">
                                {segments.map((seg, i) => (
                                    <div key={i} className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-xs font-bold text-blue-600">
                                                {seg.name[0]}
                                            </span>
                                            <span className="font-medium text-gray-700">{seg.name}</span>
                                        </div>
                                        <span className="text-gray-900 font-bold">{seg.count}</span>
                                    </div>
                                ))}
                                <div className="pt-4 border-t border-gray-100 mt-4">
                                    <p className="text-xs text-gray-400">
                                        Based on behavioral patterns and profile data.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Activity Teaser */}
                        <div className="lg:col-span-3">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                            <ActivityTable activity={activity.slice(0, 5)} />
                        </div>
                    </div>
                )}

                {/* AUDIENCE TAB */}
                {activeTab === 'audience' && (
                    <div className="mb-8">
                        <AudienceGrid distributions={distributions} />
                    </div>
                )}

                {/* REVIEWS TAB */}
                {activeTab === 'reviews' && (
                    <div>
                        {!reviewsData ? (
                            <div className="p-8 text-center text-gray-500 bg-white rounded-lg border border-gray-100">Loading reviews...</div>
                        ) : (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    {/* Sentiment Card */}
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Review Sentiment</h3>
                                        <div className="flex items-center gap-4 mt-4">
                                            <div className="text-5xl font-bold text-gray-900">{reviewsData.stats.avg ? reviewsData.stats.avg.toFixed(1) : '0.0'}</div>
                                            <div>
                                                <div className="text-gray-500 font-medium">Average Rating</div>
                                                <div className="text-sm text-gray-400">{reviewsData.stats.total} total reviews</div>
                                            </div>
                                        </div>

                                        <div className="mt-6 space-y-2">
                                            {[5, 4, 3, 2, 1].map(star => {
                                                const count = reviewsData.stats.distribution ? reviewsData.stats.distribution[star] || 0 : 0;
                                                const total = reviewsData.stats.total || 1;
                                                const percent = (count / total) * 100;
                                                return (
                                                    <div key={star} className="flex items-center gap-3">
                                                        <span className="text-xs font-medium w-3">{star}</span>
                                                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                            <div style={{ width: `${percent}%` }} className="h-full bg-yellow-400 rounded-full"></div>
                                                        </div>
                                                        <span className="text-xs text-gray-400 w-6 text-right">{count}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* AI Tag Cloud Card */}
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">AI Insight Tags</h3>
                                        <p className="text-sm text-gray-500 mb-4">Frequently mentioned topics and sentiment drivers.</p>

                                        <div className="flex flex-wrap gap-2">
                                            {reviewsData.stats.top_tags && reviewsData.stats.top_tags.length > 0 ? (
                                                reviewsData.stats.top_tags.map((t, i) => (
                                                    <div key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg">
                                                        #{t.tag} <span className="opacity-60 ml-1">{t.count}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-gray-400 text-sm italic">No tags generated yet.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Reviews Table */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Feedback</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-gray-100 text-sm text-gray-500">
                                                    <th className="py-3 font-medium">Date</th>
                                                    <th className="py-3 font-medium">User</th>
                                                    <th className="py-3 font-medium">Rating</th>
                                                    <th className="py-3 font-medium w-1/2">Review</th>
                                                    <th className="py-3 font-medium text-right">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                {reviewsData.reviews.map(r => (
                                                    <tr key={r._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                                                        <td className="py-4 text-gray-500">{new Date(r.created_at).toLocaleDateString()}</td>
                                                        <td className="py-4 font-medium text-gray-900">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                                    {r.user_id?.name ? r.user_id.name[0] : 'U'}
                                                                </div>
                                                                {r.user_id?.name || 'Anonymous'}
                                                            </div>
                                                        </td>
                                                        <td className="py-4 text-yellow-500 font-bold">{r.rating} ★</td>
                                                        <td className="py-4">
                                                            {r.title && <div className="font-bold text-gray-900 mb-1">{r.title}</div>}
                                                            <div className="text-gray-600 leading-relaxed mb-2">{r.text}</div>
                                                            {r.ai_tags && (
                                                                <div className="flex gap-2">
                                                                    {r.ai_tags.map(tag => (
                                                                        <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">#{tag}</span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="py-4 text-right">
                                                            <span className={`px-2 py-1 rounded text-xs font-medium ${r.status === 'published' ? 'bg-green-100 text-green-700' :
                                                                    r.status === 'hidden' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                                }`}>
                                                                {r.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {reviewsData.reviews.length === 0 && (
                                            <div className="text-center py-8 text-gray-500">No reviews found.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ACTIVITY TAB */}
                {activeTab === 'activity' && (
                    <div>
                        <ActivityTable activity={activity} />
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProductAnalyticsPage;
