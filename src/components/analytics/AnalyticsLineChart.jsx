import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 text-sm">
                <p className="font-semibold text-gray-900 mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 mb-1 last:mb-0">
                        <span style={{ color: entry.color }} className="font-medium text-xs uppercase tracking-wide">
                            {entry.name} :
                        </span>
                        <span className="font-bold text-gray-700">
                            {entry.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const AnalyticsLineChart = ({ data }) => {
    // data: { labels: [], views: [], clicks: [], confirmed: [] }
    if (!data || !data.labels || data.labels.length === 0) {
        return <div className="h-64 flex items-center justify-center text-gray-400 italic">No trend data available</div>;
    }

    // Transform data for Recharts
    const chartData = data.labels.map((label, index) => ({
        name: label, // Date usually
        views: data.views[index] || 0,
        clicks: data.clicks[index] || 0,
        confirmed: data.confirmed[index] || 0
    }));

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Traffic Performance</h3>
                {/* Custom Legend is handled by Recharts Legend or we can keep custom header if we prefer 
                    The screenshot had a legend top right. Recharts Legend can do this.
                */}
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 10,
                            left: -20, // Adjust for axis labels if needed
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            dy={10}
                            minTickGap={30}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e5e7eb', strokeWidth: 2 }} />
                        <Legend
                            align="right"
                            verticalAlign="top"
                            wrapperStyle={{ paddingBottom: '20px', fontSize: '14px', fontWeight: 500 }}
                            iconType="circle"
                        />

                        <Line
                            type="monotone"
                            dataKey="views"
                            name="Views"
                            stroke="#3b82f6" // blue-500
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="clicks"
                            name="Clicks"
                            stroke="#10b981" // emerald-500
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="confirmed"
                            name="Confirmed"
                            stroke="#8b5cf6" // violet-500
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AnalyticsLineChart;
