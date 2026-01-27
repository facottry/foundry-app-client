import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getProfile } from '../utils/api';
import SEOHead from '../components/SEOHead';
import LoadingState from '../components/common/LoadingState';

const ProfileView = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getProfile();
                setProfile(res.data.user);
                setStats(res.data.stats);
            } catch (err) {
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <LoadingState />;
    if (!profile) return <div>Error loading profile</div>;

    const isFounder = profile.role === 'FOUNDER';

    return (
        <div style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto' }}>
            <SEOHead title="My Profile" />

            {/* Header Section */}
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: '#eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#888',
                    overflow: 'hidden'
                }}>
                    {profile.avatar_url ? (
                        <img src={profile.avatar_url} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        profile.name.charAt(0).toUpperCase()
                    )}
                </div>
                <div style={{ flex: 1 }}>
                    <h1 style={{ marginBottom: '8px', fontSize: '2rem' }}>{profile.name}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                        <span className="badge badge-active">{profile.role}</span>
                        {profile.company_name && <span>{profile.company_name}</span>}
                    </div>
                </div>
                <Link to="/profile/edit" className="btn btn-secondary">
                    Edit Profile
                </Link>
            </div>

            {/* Founder Stats */}
            {isFounder && stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{stats.products}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Active Products</div>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{stats.total_clicks || 0}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Clicks</div>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{stats.credits}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Credits Balance</div>
                    </div>
                </div>
            )}

            {/* About Section */}
            <div className="card" style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>About</h2>

                <div style={{ display: 'grid', gap: '24px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Bio</label>
                        <div style={{ lineHeight: '1.6', whiteSpace: 'pre-line' }}>{profile.bio || 'No bio provided.'}</div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Role Title</label>
                            <div>{profile.role_title || 'N/A'}</div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Company</label>
                            <div>{profile.company_name || 'N/A'}</div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Location</label>
                            <div>{profile.location || 'N/A'}</div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Timezone</label>
                            <div>{profile.timezone || 'N/A'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Links & Contact */}
            <div className="card">
                <h2 style={{ fontSize: '1.25rem', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>Links & Contact</h2>

                <div style={{ display: 'grid', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Email</label>
                        <div>{profile.email}</div>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Website</label>
                        {profile.website ? (
                            <a href={profile.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>{profile.website}</a>
                        ) : 'N/A'}
                    </div>
                    <div style={{ display: 'flex', gap: '32px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Twitter</label>
                            {profile.twitter ? (
                                <a href={`https://twitter.com/${profile.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>@{profile.twitter.replace('@', '')}</a>
                            ) : 'N/A'}
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>LinkedIn</label>
                            {profile.linkedin ? (
                                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>View Profile</a>
                            ) : 'N/A'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
