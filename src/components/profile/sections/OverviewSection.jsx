import React from 'react';
import { getImageUrl } from '../../../utils/getImageUrl';

const OverviewSection = ({ user, stats }) => {
    // Determine avatar URL using helper or fallbacks
    // Backend now returns profileImageUrl but we also support legacy avatar_url
    // We can pass user.profileImageUrl || user.avatar_url to helper just to be safe about full URLs
    // But backend puts full URL in profileImageUrl.
    // If we have profileImageKey, we technically could resolve it here if backend didn't.
    // But backend is returning `profileImageUrl`.
    // So: use user.profileImageUrl || user.avatar_url.
    // The helper `getImageUrl` handles string checks.

    // User might have `profileImageKey` but maybe not `profileImageUrl` if I didn't verify backend fully?
    // I did verify `profile.js` updates.

    const avatarUrl = user.profileImageUrl || getImageUrl(user.profileImageKey || user.avatar_url);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Identity Card */}
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '32px' }}>
                <div style={{
                    width: '100px', height: '100px', borderRadius: '50%', background: '#f3f4f6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold', color: '#9ca3af', overflow: 'hidden'
                }}>
                    {avatarUrl ? <img src={avatarUrl} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : user.name.charAt(0)}
                </div>
                <div>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>{user.name}</h2>
                    <div style={{ color: '#6b7280', marginBottom: '12px' }}>{user.email}</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ padding: '4px 12px', background: '#e0f2fe', color: '#0369a1', borderRadius: '16px', fontSize: '0.85rem', fontWeight: '600' }}>{user.role}</span>
                        {user.company_name && <span style={{ padding: '4px 12px', background: '#f3f4f6', color: '#4b5563', borderRadius: '16px', fontSize: '0.85rem' }}>{user.company_name}</span>}
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                {user.role === 'FOUNDER' && stats ? (
                    <>
                        <div className="card" style={{ padding: '24px' }}>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '8px' }}>Products Listed</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.products || 0}</div>
                        </div>
                        <div className="card" style={{ padding: '24px' }}>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '8px' }}>Total Clicks</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.total_clicks || 0}</div>
                        </div>
                        <div className="card" style={{ padding: '24px' }}>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '8px' }}>Credits</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{stats.credits || 0}</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="card" style={{ padding: '24px' }}>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '8px' }}>Member Since</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{new Date(user.created_at).getFullYear()}</div>
                        </div>
                        {/* Placeholder for customer stats */}
                        <div className="card" style={{ padding: '24px' }}>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '8px' }}>Activity</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#6b7280' }}>Active Member</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default OverviewSection;
