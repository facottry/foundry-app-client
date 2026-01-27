import React from 'react';

const SimpleLine = ({ data, color, max, height, label }) => {
    if (!data || data.length === 0) return null;

    // Normalize points
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - ((val / max) * 100);
        return `${x},${y}`;
    }).join(' ');

    return (
        <>
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="2"
                points={points}
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-300"
            />
            {/* Hover area logic can be complex in pure SVG, keeping simple list legend instead */}
        </>
    );
};

const AnalyticsLineChart = ({ data }) => {
    // data: { labels: [], views: [], clicks: [], confirmed: [] }
    if (!data || !data.labels || data.labels.length === 0) {
        return <div className="h-64 flex items-center justify-center text-gray-400 italic">No trend data available</div>;
    }

    const maxViews = Math.max(...data.views, 1);
    const maxClicks = Math.max(...data.clicks, 1);
    const maxConfirmed = Math.max(...data.confirmed, 1);

    // Scale all to same chart? Or separate Y-axis?
    // Usually standard analytics scales everything to max of views (since views > clicks)
    // so lines don't overlap too confusingly.
    const grandMax = Math.max(maxViews, maxClicks, maxConfirmed) * 1.1; // 10% buffer

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Traffic Performance</h3>
                <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Views</div>
                    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Clicks</div>
                    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-500"></span> Confirmed</div>
                </div>
            </div>

            <div className="relative h-64 w-full">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="0" x2="100" y2="0" stroke="#f3f4f6" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                    <line x1="0" y1="25" x2="100" y2="25" stroke="#f3f4f6" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#f3f4f6" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                    <line x1="0" y1="75" x2="100" y2="75" stroke="#f3f4f6" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                    <line x1="0" y1="100" x2="100" y2="100" stroke="#f3f4f6" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />

                    {/* Lines */}
                    <SimpleLine data={data.views} color="#3b82f6" max={grandMax} />
                    <SimpleLine data={data.clicks} color="#10b981" max={grandMax} />
                    <SimpleLine data={data.confirmed} color="#a855f7" max={grandMax} />
                </svg>
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-400 px-1">
                <span>{data.labels[0]}</span>
                <span>{data.labels[Math.floor(data.labels.length / 2)]}</span>
                <span>{data.labels[data.labels.length - 1]}</span>
            </div>
        </div>
    );
};

export default AnalyticsLineChart;
