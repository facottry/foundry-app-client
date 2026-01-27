import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';

/**
 * Purpose: Display traffic stats and timeline for a specific product.
 * Inputs: Product ID (from URL or Props).
 * Outputs: Visualization of visits/credits.
 */
const TrafficAnalytics = () => {
    const { id } = useParams(); // Product ID from URL
    const [summary, setSummary] = useState(null);
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTraffic = async () => {
            try {
                const [summaryRes, timelineRes] = await Promise.all([
                    api.get(`/founder/traffic/${id}/summary`),
                    api.get(`/founder/traffic/${id}/timeline`)
                ]);
                setSummary(summaryRes.data);
                setTimeline(timelineRes.data.timeline);
            } catch (err) {
                console.error('Traffic stats failed', err);
            } finally {
                setLoading(false);
            }
        };
        fetchTraffic();
    }, [id]);

    if (loading) return <div>Loading traffic data...</div>;
    if (!summary) return <div>No traffic data available.</div>;

    const { today, total } = summary;

    return (
        <div style={{ padding: '24px' }}>
            <h2 style={{ marginBottom: '24px' }}>Traffic Overview</h2>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                <div className="card" style={{ padding: '24px' }}>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '8px' }}>Visits Today</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{today.visits}</div>
                </div>
                <div className="card" style={{ padding: '24px' }}>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '8px' }}>Credits Spent Today</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>{today.credits_consumed}</div>
                </div>
                <div className="card" style={{ padding: '24px' }}>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '8px' }}>Total Visits (All Time)</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{total.totalVisits}</div>
                </div>
                <div className="card" style={{ padding: '24px' }}>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '8px' }}>Total Credits Spent</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>{total.totalCredits}</div>
                </div>
            </div>

            {/* Timeline Table (Simple MVP) */}
            <h3 style={{ marginBottom: '16px' }}>Performance History</h3>
            <div className="card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        <tr>
                            <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '0.85rem', color: '#6b7280' }}>Date</th>
                            <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '0.85rem', color: '#6b7280' }}>Visits</th>
                            <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '0.85rem', color: '#6b7280' }}>Unique</th>
                            <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '0.85rem', color: '#6b7280' }}>Credits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeline.length === 0 ? (
                            <tr><td colSpan="4" style={{ padding: '24px', textAlign: 'center', color: '#9ca3af' }}>No history yet</td></tr>
                        ) : (
                            timeline.map((row) => (
                                <tr key={row.date} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td style={{ padding: '12px 24px' }}>{row.date}</td>
                                    <td style={{ padding: '12px 24px' }}>{row.visits}</td>
                                    <td style={{ padding: '12px 24px' }}>{row.unique_visits}</td>
                                    <td style={{ padding: '12px 24px' }}>{row.credits_consumed}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TrafficAnalytics;
