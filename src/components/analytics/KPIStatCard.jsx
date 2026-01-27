import React from 'react';

const KPIStatCard = ({ title, value, subtext, trend, trendValue, icon }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-gray-500 uppercase text-xs font-semibold tracking-wider">{title}</h3>
                {icon && <span className="text-xl opacity-80">{icon}</span>}
            </div>

            <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
                <div className="flex items-center text-sm">
                    {trendValue && (
                        <span className={`font-medium mr-2 ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {trendValue}
                        </span>
                    )}
                    <span className="text-gray-400">{subtext}</span>
                </div>
            </div>
        </div>
    );
};

export default KPIStatCard;
