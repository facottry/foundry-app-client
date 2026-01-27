import React from 'react';

const BreakdownCard = ({ title, data, icon }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
            <span className="text-lg text-gray-400">{icon}</span>
            <h3 className="font-bold text-gray-900">{title}</h3>
        </div>
        <div className="space-y-3">
            {data && data.length > 0 ? (
                data.map((item, i) => {
                    // Calc percentage if possible, else just bar visual
                    // Assume max is first item since sorted
                    const max = data[0].count;
                    const width = (item.count / max) * 100;

                    return (
                        <div key={i} className="group">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 font-medium truncate pr-4">
                                    {item._id || <span className="italic text-gray-400">Unknown</span>}
                                </span>
                                <span className="text-gray-900 font-bold">{item.count}</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gray-300 group-hover:bg-blue-500 transition-colors rounded-full"
                                    style={{ width: `${width}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="text-sm text-gray-400 italic">Detecting...</div>
            )}
        </div>
    </div>
);

const AudienceGrid = ({ distributions }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BreakdownCard title="Top Countries" icon="🌍" data={distributions.country} />
            <BreakdownCard title="Top Cities" icon="🏙️" data={distributions.city} />
            <BreakdownCard title="Device" icon="📱" data={distributions.device} />
            <BreakdownCard title="OS" icon="💻" data={distributions.os} />
        </div>
    );
};

export default AudienceGrid;
