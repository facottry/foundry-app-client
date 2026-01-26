import React from 'react';
import { Link } from 'react-router-dom';

const Pricing = () => {
    return (
        <div style={{ paddingTop: '60px', paddingBottom: '60px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ marginBottom: '24px', fontSize: '2.5rem' }}>Simple Pricing. No Guesswork.</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.7' }}>
                        Foundry pricing is designed to stay predictable as you grow. No forced upgrades, no hidden fees, and no artificial limits that block progress.
                    </p>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginTop: '16px' }}>
                        Start free. Pay only when visibility matters.
                    </p>
                </div>

                {/* Pricing Philosophy */}
                <div style={{
                    background: 'var(--bg-secondary)',
                    padding: '48px',
                    borderRadius: '16px',
                    marginBottom: '60px',
                    border: '1px solid var(--border-subtle)'
                }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '32px', textAlign: 'center' }}>Pricing Philosophy</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
                        <div>
                            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>✓</div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Free listing for all products</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>Every product gets a permanent, crawlable page</p>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>✓</div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Credits-based boosts</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>Pay only for controlled visibility when you need it</p>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>✓</div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No subscription lock-in</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>Credits never expire. Use them when ready</p>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>✓</div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Transparent tracking</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0 }}>See exactly where every click comes from</p>
                        </div>
                    </div>
                </div>

                {/* Main Pricing Card */}
                <div className="card" style={{ padding: '60px 40px', maxWidth: '550px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
                        Pay As You Go
                    </div>
                    <div style={{ fontSize: '4rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1', marginBottom: '8px' }}>
                        1 <span style={{ fontSize: '2rem', color: 'var(--text-secondary)' }}>credit</span>
                    </div>
                    <div style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '48px' }}>
                        = 1 Qualified Outbound Click
                    </div>

                    <div style={{
                        background: 'var(--bg-secondary)',
                        padding: '32px',
                        borderRadius: '12px',
                        marginBottom: '40px',
                        textAlign: 'left'
                    }}>
                        <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                            <strong>1000 Starter Credits</strong>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Free on signup</div>
                        </div>
                        <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                            <strong>Full analytics dashboard</strong>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Track clicks, saves, and performance</div>
                        </div>
                        <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                            <strong>Credits never expire</strong>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Use them at your own pace</div>
                        </div>
                        <div>
                            <strong>No monthly fees</strong>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Pay only for what you use</div>
                        </div>
                    </div>

                    <Link to="/signup" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}>
                        Get Started Free
                    </Link>

                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '24px', fontStyle: 'italic' }}>
                        Use Foundry when you want discovery to feel intentional — not transactional.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
