import React from 'react';

const Changelog = () => {
    const updates = [
        {
            version: '1.2.0',
            date: '2026-01-20',
            changes: [
                'Added breadcrumb navigation for better SEO',
                'Improved category landing pages with production copy',
                'Enhanced footer with 4-column layout',
                'Added structured data (schema.org) for all pages'
            ]
        },
        {
            version: '1.1.0',
            date: '2026-01-15',
            changes: [
                'Launched blog with founder playbooks and discovery insights',
                'Added SEO-optimized About and Pricing pages',
                'Implemented react-helmet-async for meta tags',
                'Created category slogans and intro copy'
            ]
        },
        {
            version: '1.0.0',
            date: '2026-01-10',
            changes: [
                'Initial platform launch',
                'Product listing and discovery',
                'Founder dashboard with analytics',
                'Credit-based boost system',
                'Wallet and transaction history'
            ]
        }
    ];

    return (
        <div style={{ paddingTop: '60px', paddingBottom: '60px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '16px' }}>Changelog</h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '60px' }}>
                    Track updates, improvements, and new features as we build Foundry.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                    {updates.map((update) => (
                        <div key={update.version} className="card" style={{ padding: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>
                                    Version {update.version}
                                </h2>
                                <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                                    {update.date}
                                </span>
                            </div>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px'
                            }}>
                                {update.changes.map((change, index) => (
                                    <li key={index} style={{
                                        paddingLeft: '28px',
                                        position: 'relative',
                                        fontSize: '1.05rem',
                                        lineHeight: '1.6'
                                    }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: 0,
                                            color: 'var(--accent-primary)',
                                            fontWeight: 'bold'
                                        }}>
                                            •
                                        </span>
                                        {change}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div style={{
                    marginTop: '60px',
                    padding: '32px',
                    background: 'var(--bg-secondary)',
                    borderRadius: '12px',
                    textAlign: 'center'
                }}>
                    <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', margin: 0 }}>
                        Have a feature request or found a bug? <a href="/contact" style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>Let us know</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Changelog;
