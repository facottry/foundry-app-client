import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { organizationSchema } from '../utils/seo';
import CategoryDiscoveryGrid from '../components/home/CategoryDiscoveryGrid';

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
                <div className="hero-section">
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
                    <h1 className="hero-title">
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

                    <div className="hero-buttons">
                        <Link to="/category/all" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                            Explore Products
                        </Link>
                        <Link to="/pricing" className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                            View Pricing
                        </Link>
                    </div>
                </div>

                {/* Categories Grid (Redesigned) */}
                <div style={{ marginTop: '80px' }}>
                    <CategoryDiscoveryGrid />
                </div>

                {/* Value Props */}
                <div className="value-props-section">
                    <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '60px' }}>
                        Built for Long-Term Credibility
                    </h2>
                    <div className="value-props-grid">
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
