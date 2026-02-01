import React from 'react';

const AudienceAnalytics = ({ data, onFilter }) => {
    if (!data || !data.distributions) return <div style={{ padding: '20px' }}>No audience data available yet.</div>;

    const { summary, distributions } = data;

    const DistributionTable = ({ title, data, label = 'Metric', filterKey }) => (
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden', marginBottom: '24px' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>{title}</h4>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f3f4f6', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <th style={{ padding: '10px 16px', textAlign: 'left', color: '#6b7280', fontWeight: '500' }}>{label}</th>
                        <th style={{ padding: '10px 16px', textAlign: 'right', color: '#6b7280', fontWeight: '500' }}>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((item, idx) => (
                            <tr
                                key={idx}
                                style={{ borderBottom: '1px solid #e5e7eb', cursor: 'pointer', transition: 'background 0.1s' }}
                                onClick={() => onFilter && onFilter(filterKey, item._id)}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#f0f9ff'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <td style={{ padding: '12px 16px', color: '#1f2937' }}>{item._id || 'Unknown'}</td>
                                <td style={{ padding: '12px 16px', textAlign: 'right', color: '#1f2937', fontWeight: '500' }}>{item.count}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" style={{ padding: '16px', textAlign: 'center', color: '#9ca3af' }}>No data</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div>
            {/* High Level Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Views', value: summary.views },
                    { label: 'Outbound Clicks', value: summary.clicks },
                    { label: 'Ratings', value: summary.ratings },
                    { label: 'Reviews', value: summary.reviews }
                ].map((stat, idx) => (
                    <div key={idx} style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '4px' }}>{stat.label}</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>{stat.value}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DistributionTable title="Views by Country" data={distributions.views.country} label="Country" filterKey="country" />
                <DistributionTable title="Views by City" data={distributions.views.city} label="City" filterKey="city" />
                <DistributionTable title="Views by Browser" data={distributions.views.browser} label="Browser" filterKey="browser" />
                <DistributionTable title="Device Breakdown (All Events)" data={distributions.all.device} label="Device Type" filterKey="device" />
            </div>
        </div>
    );
};

export default AudienceAnalytics;
