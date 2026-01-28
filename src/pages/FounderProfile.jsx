import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import SEO from '../components/SEO';
import { getImageUrl } from '../utils/getImageUrl';

const FounderProfile = () => {
    const { founderId } = useParams();
    const [profile, setProfile] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFounder = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/founder/public/${founderId}`);
                setProfile(res.data.profile);
                setProducts(res.data.products);
            } catch (err) {
                console.error('Failed to load founder profile:', err);
                setError('Founder not found or API error.');
            } finally {
                setLoading(false);
            }
        };

        if (founderId) {
            fetchFounder();
        }
    }, [founderId]);

    if (loading) return <div style={{ padding: '60px', textAlign: 'center' }}>Loading...</div>;
    if (error || !profile) return (
        <div style={{ padding: '60px', textAlign: 'center' }}>
            <h1>Founder Not Found</h1>
            <p>The profile you are looking for does not exist.</p>
            <Link to="/" className="btn btn-secondary" style={{ marginTop: '20px' }}>Go Home</Link>
        </div>
    );

    return (
        <div style={{ paddingBottom: '80px' }}>
            <SEO
                title={`${profile.name} - Founder Profile`}
                description={`Check out products built by ${profile.name} on Foundry.`}
            />

            {/* Profile Header */}
            <div style={{
                background: '#fff',
                borderBottom: '1px solid #eee',
                padding: '60px 20px',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                    {/* Avatar */}
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        margin: '0 auto 24px',
                        overflow: 'hidden',
                        border: '4px solid #fff',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        background: '#f3f4f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem',
                        color: '#9ca3af'
                    }}>
                        {profile.profileImageUrl ? (
                            <img
                                src={profile.profileImageUrl}
                                alt={profile.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <span>{profile.name.charAt(0)}</span>
                        )}
                    </div>

                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', fontWeight: '800' }}>{profile.name}</h1>
                    {(profile.role_title || profile.company_name) && (
                        <p style={{ fontSize: '1.1rem', color: '#4b5563', marginBottom: '16px', fontWeight: '500' }}>
                            {profile.role_title} {profile.role_title && profile.company_name && ' at '} {profile.company_name}
                        </p>
                    )}

                    {profile.bio && (
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#6b7280',
                            lineHeight: '1.6',
                            maxWidth: '600px',
                            margin: '0 auto 24px'
                        }}>
                            {profile.bio}
                        </p>
                    )}

                    {/* Social Links */}
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {profile.portfolio_url && (
                            <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary">
                                🌐 Website
                            </a>
                        )}
                        {profile.website && (
                            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary">
                                🌐 Website
                            </a>
                        )}
                        {profile.twitter && (
                            <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{ background: '#000', color: '#fff' }}>
                                𝕏 Twitter
                            </a>
                        )}
                        {profile.linkedin && (
                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-sm" style={{ background: '#0077b5', color: '#fff', border: 'none' }}>
                                LinkedIn
                            </a>
                        )}
                    </div>

                </div>
            </div>

            {/* Products Grid */}
            <div style={{ maxWidth: '1200px', margin: '60px auto 0', padding: '0 20px' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '32px', textAlign: 'center' }}>
                    Products by {profile.name}
                </h2>

                {products.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', background: '#f9fafb', borderRadius: '12px' }}>
                        <p style={{ color: '#6b7280' }}>No public products listed yet.</p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '24px'
                    }}>
                        {products.map(product => {
                            const logoUrl = product.logoUrl || getImageUrl(product.logoKey || product.logo_url) || '';
                            return (
                                <Link to={`/product/${product.slug}`} key={product._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                                            <div style={{
                                                width: '64px', height: '64px', borderRadius: '12px', background: '#f3f4f6', overflow: 'hidden', flexShrink: 0,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#9ca3af'
                                            }}>
                                                {logoUrl ? <img src={logoUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : product.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', margin: 0, marginBottom: '4px' }}>{product.name}</h3>
                                                <div style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: '#6b7280' }}>
                                                    {product.categories && product.categories[0] && (
                                                        <span style={{ background: '#f3f4f6', padding: '2px 8px', borderRadius: '4px' }}>
                                                            {product.categories[0]}
                                                        </span>
                                                    )}
                                                    {product.avg_rating > 0 && <span>⭐ {product.avg_rating.toFixed(1)}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: '1.5', flex: 1 }}>
                                            {product.tagline}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FounderProfile;
