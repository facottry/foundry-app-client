import React from 'react';

const ActivityTable = ({ activity }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Recent Activity Stream</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Time</th>
                            <th className="px-6 py-4 font-semibold">Event</th>
                            <th className="px-6 py-4 font-semibold">Location</th>
                            <th className="px-6 py-4 font-semibold">Device</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {activity && activity.length > 0 ? (
                            activity.map((log, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(log.created_at).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                            ${log.event_type === 'CLICK' ? 'bg-blue-100 text-blue-800' :
                                                log.event_type === 'VIEW' ? 'bg-gray-100 text-gray-800' :
                                                    'bg-green-100 text-green-800'}`}>
                                            {log.event_type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {log.city || 'Unknown'}, {log.country || 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                                        {log.device_type || 'Unknown'} • {log.browser || 'Unknown'}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-gray-400 italic">
                                    No recent activity
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ActivityTable;
