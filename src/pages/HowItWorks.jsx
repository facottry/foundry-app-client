import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import BRAND from '../config/brand';

const HowItWorks = () => {
    return (
        <div style={{ paddingBottom: '80px', paddingTop: '40px' }}>
            <SEO
                title={`How ${BRAND.publicName} Works - The Rules of the Game`}
                description={`Understand the core economic laws, discovery philosophy, and business rules that govern ${BRAND.publicName}.`}
                canonical="/how-it-works"
            />

            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                        How {BRAND.publicName} Works
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        No black boxes. No vanity metrics. Just a simple, transparent system for software discovery.
                    </p>
                </div>

                <div className="card" style={{ padding: '40px', marginBottom: '40px', borderLeft: '4px solid var(--primary-color)' }}>
                    <h2 style={{ marginTop: '0', fontSize: '1.75rem', marginBottom: '16px' }}>The Core Economic Law</h2>
                    <p style={{ fontSize: '1.5rem', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        1 Credit = 1 Qualified Outbound Click (QOC)
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        That's it. Nothing else is billable. You don't pay for impressions, you don't pay to be listed, and you don't pay for "brand awareness". You only pay when a verified user clicks to visit your website.
                    </p>
                </div>

                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '32px' }}>For Founders</h2>
                    <div style={{ display: 'grid', gap: '24px' }}>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ fontSize: '2rem', background: '#f3f4f6', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', flexShrink: 0 }}>🎯</div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>Qualified Traffic Only</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                    We verify user intent. A "misclick" that immediately bounces doesn't count. We focus on sending you users who actually want to see your product.
                                </p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ fontSize: '2rem', background: '#f3f4f6', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', flexShrink: 0 }}>🚫</div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>No Pay-to-Rank</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                    You can't buy your way to the top of the organic search results. Ranking is based on merit: click-through rates, saves, and freshness.
                                </p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ fontSize: '2rem', background: '#f3f4f6', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', flexShrink: 0 }}>📊</div>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' }}>Real Numbers</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                    Our dashboards show the truth. We don't inflate numbers to make you feel good. If traffic is low, we tell you, so you can fix your listing.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '32px' }}>The Rules of the Platform</h2>
                    <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: '16px', overflow: 'hidden' }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid #eee' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ color: '#ef4444' }}>✕</span> No Social Gravity
                            </h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                No likes, no follows, no feeds. Software isn't a popularity contest. It's about utility.
                            </p>
                        </div>
                        <div style={{ padding: '24px', borderBottom: '1px solid #eee' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ color: '#10b981' }}>✓</span> Immutable History
                            </h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                We never delete click logs or transaction history. Our data is a permanent record of what happened.
                            </p>
                        </div>
                        <div style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ color: '#10b981' }}>✓</span> Discovery by Merit
                            </h3>
                            <p style={{ color: 'var(--text-secondary)' }}>
                                Products are discovered via problem solving, use cases, and categories—not by who screams the loudest on Twitter.
                            </p>
                        </div>
                    </div>
                </section>

                <div style={{ textAlign: 'center', marginTop: '80px', padding: '40px', background: '#f9fafb', borderRadius: '16px' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '16px' }}>Ready to list your product?</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                        Join hundreds of other founders building in public.
                    </p>
                    <Link to="/signup" className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '1.1rem' }}>
                        Start for Free
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
