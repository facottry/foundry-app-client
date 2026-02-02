import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateSlug } from '../utils/slugUtils';
import ReviewList from './reviews/ReviewList';

const ProductTabs = ({ productId, product, user }) => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📋' },
        { id: 'reviews', label: 'Reviews', icon: '⭐' },
        { id: 'alternatives', label: 'Alternatives', icon: '🔄' },
        { id: 'team', label: 'Team', icon: '👥' },
        { id: 'awards', label: 'Awards', icon: '🏆' },
        { id: 'more', label: 'More', icon: '➕' }
    ];

    return (
        <div>
            {/* Tab Navigation */}
            <div style={{
                borderBottom: '2px solid #E5E5E5',
                marginBottom: '30px',
                display: 'flex',
                gap: '8px',
                overflowX: 'auto'
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '14px 24px',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === tab.id ? '3px solid #1a1a1a' : '3px solid transparent',
                            color: activeTab === tab.id ? '#1a1a1a' : '#666',
                            fontWeight: activeTab === tab.id ? '600' : '500',
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <span style={{ marginRight: '8px' }}>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'overview' && <OverviewTab product={product} />}
                {activeTab === 'reviews' && <ReviewsTab productId={productId} user={user} product={product} slug={product.slug} />}
                {activeTab === 'alternatives' && <AlternativesTab productId={productId} />}
                {activeTab === 'team' && <TeamTab productId={productId} />}
                {activeTab === 'awards' && <AwardsTab productId={productId} />}
                {activeTab === 'more' && <MoreTab product={product} />}
            </div>
        </div>
    );
};

// Overview Tab
const OverviewTab = ({ product }) => (
    <div>
        <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>About</h3>
            <p style={{ lineHeight: '1.8', color: '#333' }}>{product.description}</p>
        </div>

        {product.screenshots && product.screenshots.length > 0 && (
            <div style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Screenshots</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                    {product.screenshots.map((screenshot, idx) => (
                        <img key={idx} src={screenshot} alt={`Screenshot ${idx + 1}`} style={{ width: '100%', borderRadius: '8px', border: '1px solid #E5E5E5' }} />
                    ))}
                </div>
            </div>
        )}

        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
            {product.categories && product.categories.length > 0 && (
                <div>
                    <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>Categories</h4>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {product.categories.map((cat, idx) => (
                            <Link
                                key={idx}
                                to={`/category/${generateSlug(cat)}`}
                                style={{
                                    padding: '6px 12px',
                                    background: '#f3f4f6',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    textDecoration: 'none',
                                    color: '#1a1a1a',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#e5e7eb'}
                                onMouseLeave={(e) => e.target.style.background = '#f3f4f6'}
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {product.tags && product.tags.length > 0 && (
                <div>
                    <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>Tags</h4>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {product.tags.map((tag, idx) => (
                            <Link
                                key={idx}
                                to={`/tag/${generateSlug(tag)}`}
                                style={{
                                    padding: '6px 12px',
                                    background: '#e0e7ff',
                                    borderRadius: '6px',
                                    fontSize: '0.85rem',
                                    color: '#3730a3',
                                    textDecoration: 'none',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.background = '#c7d2fe'}
                                onMouseLeave={(e) => e.target.style.background = '#e0e7ff'}
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
);

const ReviewsTab = ({ productId, user, product, slug }) => (
    <div style={{ padding: '0 10px' }}>
        <ReviewList productId={productId} user={user} productOwnerId={product && product.owner_user_id} slug={slug} isFullPage={false} />
    </div>
);

// Alternatives Tab
const AlternativesTab = ({ productId }) => {
    const [alternatives, setAlternatives] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchAlternatives = async () => {
            try {
                const res = await fetch(`/api/products/${productId}/alternatives`);
                const data = await res.json();
                setAlternatives(data.data || []);
            } catch (error) {
                console.error('Error fetching alternatives:', error);
            }
            setLoading(false);
        };
        fetchAlternatives();
    }, [productId]);

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading alternatives...</div>;

    if (alternatives.length === 0) {
        return (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔄</div>
                <h3>No alternatives found</h3>
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {alternatives.map(alt => (
                <div key={alt._id} style={{ border: '1px solid #E5E5E5', borderRadius: '8px', padding: '16px' }}>
                    {alt.logo_url && <img src={alt.logo_url} alt={alt.name} style={{ width: '60px', height: '60px', borderRadius: '8px', marginBottom: '12px' }} />}
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{alt.name}</h4>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '12px' }}>{alt.tagline}</p>
                    {alt.avg_rating > 0 && (
                        <div style={{ fontSize: '0.85rem', color: '#666' }}>
                            ⭐ {alt.avg_rating.toFixed(1)} ({alt.ratings_count} reviews)
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// Team Tab
const TeamTab = ({ productId }) => {
    const [team, setTeam] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await fetch(`/api/products/${productId}/team`);
                const data = await res.json();
                setTeam(data.data || []);
            } catch (error) {
                console.error('Error fetching team:', error);
            }
            setLoading(false);
        };
        fetchTeam();
    }, [productId]);

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading team...</div>;

    if (team.length === 0) {
        return (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>👥</div>
                <h3>No team members listed</h3>
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {team.map((member, idx) => (
                <div key={idx} style={{ border: '1px solid #E5E5E5', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
                    {member.avatar_url && <img src={member.avatar_url} alt={member.name} style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '12px' }} />}
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{member.name}</h4>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '12px' }}>{member.role}</p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        {member.twitter_url && <a href={member.twitter_url} target="_blank" rel="noopener noreferrer" style={{ color: '#1da1f2' }}>Twitter</a>}
                        {member.linkedin_url && <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5' }}>LinkedIn</a>}
                    </div>
                </div>
            ))}
        </div>
    );
};

// Awards Tab
const AwardsTab = ({ productId }) => {
    const [awards, setAwards] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchAwards = async () => {
            try {
                const res = await fetch(`/api/products/${productId}/awards`);
                const data = await res.json();
                setAwards(data.data || []);
            } catch (error) {
                console.error('Error fetching awards:', error);
            }
            setLoading(false);
        };
        fetchAwards();
    }, [productId]);

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading awards...</div>;

    if (awards.length === 0) {
        return (
            <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏆</div>
                <h3>No awards listed</h3>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {awards.map((award, idx) => (
                <div key={idx} style={{ border: '1px solid #E5E5E5', borderRadius: '8px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ fontSize: '2rem' }}>🏆</div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{award.title}</h4>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>{award.source} • {award.year}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

// More Tab
const MoreTab = ({ product }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
            <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>Website</h4>
            <a href={product.website_url} target="_blank" rel="noopener noreferrer" style={{ color: '#1a1a1a', fontSize: '1.05rem' }}>
                {product.website_url}
            </a>
        </div>
        <div>
            <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>Launch Date</h4>
            <p style={{ fontSize: '1.05rem' }}>{new Date(product.created_at).toLocaleDateString()}</p>
        </div>
        <div>
            <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '8px' }}>Status</h4>
            <span style={{
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: '600',
                background: product.status === 'approved' ? '#d1fae5' : product.status === 'pending' ? '#fef9c3' : '#fef2f2',
                color: product.status === 'approved' ? '#065f46' : product.status === 'pending' ? '#854d0e' : '#991b1b'
            }}>
                {product.status.toUpperCase()}
            </span>
        </div>
    </div>
);

export default ProductTabs;
