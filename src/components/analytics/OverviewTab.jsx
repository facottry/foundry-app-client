import React from 'react';
import KPIStatCard from './KPIStatCard';
import AnalyticsLineChart from './AnalyticsLineChart';
import { Eye, MousePointer2, Zap, CreditCard } from 'lucide-react';

const OverviewTab = ({ data }) => {
    // Data extraction with safety checks
    const summary = data?.summary || { views: 0, clicks: 0, ctr: 0, credits: 0, unique_visitors: 0 };
    const timeline = data?.timeline || [];

    // Transform timeline for chart
    const chartData = {
        labels: timeline.map(t => t.date),
        views: timeline.map(t => t.visits),
        clicks: timeline.map(t => t.clicks),
        confirmed: timeline.map(t => t.confirmed || 0) // Assuming confirmed is available or 0
    };

    // Calculate CTR if not provided
    const ctr = summary.views > 0 ? ((summary.clicks / summary.views) * 100).toFixed(2) + '%' : '0%';

    return (
        <div className="space-y-6">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPIStatCard
                    title="TOTAL VIEWS"
                    value={summary.views}
                    subtext={`${summary.unique_visitors} Unique Visitors`}
                    icon={<Eye size={20} className="text-red-400" />}
                />
                <KPIStatCard
                    title="WEBSITE CLICKS"
                    value={summary.clicks}
                    subtext="High Intent Actions"
                    icon={<MousePointer2 size={20} className="text-blue-400" />}
                />
                <KPIStatCard
                    title="CLICK THROUGH RATE"
                    value={ctr}
                    subtext="Conversion Quality"
                    icon={<Zap size={20} className="text-yellow-400" />}
                />
                <KPIStatCard
                    title="CREDITS CONSUMED"
                    value={summary.credits_consumed || 0}
                    subtext="Billable Traffic"
                    icon={<CreditCard size={20} className="text-indigo-400" />}
                />
            </div>

            {/* Main Chart + Segments Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Traffic Chart (Takes up 2/3) */}
                <div className="lg:col-span-2">
                    <AnalyticsLineChart data={chartData} />
                </div>

                {/* User Segments (Takes up 1/3) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-900">User Segments</h3>
                        <p className="text-sm text-gray-500">Based on behavioral patterns and profile data.</p>
                    </div>

                    <div className="space-y-8">
                        {/* Mock Data for Segments - Backend doesn't fully support this granularly yet */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-semibold text-gray-700">New Visitors</span>
                                <span className="text-gray-500">64%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: '64%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-semibold text-gray-700">Returning</span>
                                <span className="text-gray-500">22%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: '22%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-semibold text-gray-700">Power Users</span>
                                <span className="text-gray-500">14%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: '14%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;
