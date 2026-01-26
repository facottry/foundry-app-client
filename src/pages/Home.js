import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { organizationSchema } from '../utils/seo';

const Home = () => {
    return (
        <>
            <SEOHead
                title="Discovery Platform for Independent Builders"
                description="Foundry is a modern discovery platform for independent SaaS founders and builders. Find tools built with clarity, usefulness, and intent."
                structuredData={organizationSchema}
            />

            <div style={{ paddingBottom: '40px' }}>
                {/* Hero Section */}
                <div style={{
                    textAlign: 'center',
                    padding: '100px 20px 80px',
                    maxWidth: '900px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '6px 16px',
                        background: '#FDF2F8',
                        color: '#BE185D',
                        borderRadius: '50px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        marginBottom: '24px',
                        letterSpacing: '0.02em'
                    }}>
                        For Independent Builders
                    </div>
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: '800',
                        lineHeight: '1.1',
                        color: 'var(--text-primary)',
                        marginBottom: '24px',
                        letterSpacing: '-0.03em'
                    }}>
                        Discover tools built with <span style={{ color: 'var(--accent-primary)' }}>clarity and intent</span>
                    </h1>
                    <p style={{
                        fontSize: '1.3rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '16px',
                        lineHeight: '1.6',
                        maxWidth: '700px',
                        margin: '0 auto 16px'
                    }}>
                        Foundry is where serious builders show up — and get discovered.
                    </p>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-muted)',
                        marginBottom: '48px',
                        maxWidth: '650px',
                        margin: '0 auto 48px'
                    }}>
                        No hype. No noise. Just products presented with context, categories, and signals that help you understand what matters.
                    </p>

                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/category/all" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                            Explore Products
                        </Link>
                        <Link to="/pricing" className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                            View Pricing
                        </Link>
                    </div>
                </div>

                {/* Categories Grid */}
                <div style={{ marginTop: '80px', maxWidth: '1200px', margin: '80px auto 0' }}>
                    <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>Browse by Category</h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                            Structured discovery for every use case
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '24px'
                    }}>
                        {['DevTools', 'Productivity', 'Marketing', 'AI', 'SaaS'].map(cat => (
                            <Link to={`/category/${cat}`} key={cat} style={{ textDecoration: 'none' }}>
                                <div className="card" style={{
                                    padding: '32px',
                                    textAlign: 'center',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid var(--border-subtle)',
                                    background: 'white'
                                }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--text-primary)' }}>{cat}</h3>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>
                                        Explore &rarr;
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Value Props */}
                <div style={{
                    marginTop: '120px',
                    padding: '80px 40px',
                    background: 'var(--bg-secondary)',
                    borderRadius: '16px'
                }}>
                    <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '60px' }}>
                        Built for Long-Term Credibility
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '48px', maxWidth: '1000px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🎯</div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Structured Discovery</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                Products presented with context and clarity, not hype
                            </p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📊</div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Transparent Metrics</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                Clean URLs and honest signals that respect both founders and users
                            </p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>⚡</div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Performance-Based</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                Pay only for qualified clicks. No subscriptions, no lock-in
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
