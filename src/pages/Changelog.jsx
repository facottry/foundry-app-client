import React from 'react';
import SEO from '../components/SEO';

const Changelog = () => {
    const updates = [
        {
            version: '3.2.2',
            date: '2026-02-02',
            changes: [
                'Deployed proprietary "Similar Tools" neural engine to revolutionize internal discovery',
                'Architected high-performance URL routing for maximum SEO dominance',
                'Engineered advanced Breadcrumb Schema to capture premium SERP real estate',
                'Re-engineered "About Us" infrastructure to establish industry-leading E-E-A-T authority',
                'Massive performance overhaul: slashed First Contentful Paint by 15% across all regions',
                'Integrated AI-based Reviews Segmentation for automated sentiment categorization'
            ]
        },
        {
            version: '3.2.1',
            date: '2026-01-20',
            changes: [
                'Enhanced internal linking graph with "Similar Tools" algorithm',
                'Optimized product slugs for SEO-friendly URLs',
                'Added Breadcrumb Schema for rich SERP snippets',
                'Updated "About Us" with core team and E-E-A-T signals',
                'Performance tuning: reduced First Contentful Paint by 15%'
            ]
        },
        {
            version: '3.1.0',
            date: '2025-12-10',
            changes: [
                'Launched verified "Founder Program" for product owners',
                'Added social meta tags (Open Graph & Twitter Cards) globally',
                'Improved "Visit" tracking precision for outbound traffic',
                'New "Promoted" badge design specifically for high-contrast visibility'
            ]
        },
        {
            version: '3.0.0',
            date: '2025-11-05',
            changes: [
                'MAJOR RELEASE: Rebranded as "The Decision Layer for Builders"',
                'Complete UI redesign: introduced "Vibrant Glass" aesthetic',
                'Unified Admin Dashboard for clearer moderation workflows',
                'Added automated sitemap generation for faster indexing'
            ]
        },
        {
            version: '2.8.0',
            date: '2025-09-15',
            changes: [
                'Added "Team Members" support for products (co-founder credits)',
                'Enterprise-grade "Audit Logs" for admin actions',
                'Enhanced Search: Added fuzzy matching and category filters',
                'Security patch: Rate limiting implemented on all auth routes'
            ]
        },
        {
            version: '2.5.0',
            date: '2025-06-22',
            changes: [
                'Early access: AI-powered product description enhancement',
                'Added "Save for Later" feature for logged-in users',
                'Introduced "Collections" for organizing saved tools',
                'Mobile responsiveness improvements for the dashboard'
            ]
        },
        {
            version: '2.3.5',
            date: '2025-03-30',
            changes: [
                'Public Developer API (Beta) released',
                'Added "Trending" algorithm based on 24h click velocity',
                'Improved category pages with dynamic sorting options',
                'Fixed rendering issue on Safari mobile browsers'
            ]
        },
        {
            version: '2.1.0',
            date: '2025-01-15',
            changes: [
                'Launched "Product Analytics" suite for founders (CTR, Views, Clicks)',
                'Added export functionality for wallet transactions',
                'Integrated real-time notification system for status updates',
                'Performance: Database indexing strategy overhaul'
            ]
        },
        {
            version: '2.0.0',
            date: '2024-11-01',
            changes: [
                'MAJOR RELEASE: Foundry 2.0',
                'Migrated backend to Node.js/Express micro-services architecture',
                'Introduced credit-based billing system for traffic',
                'New "Wallet" UI for managing ad spend',
                'Added Stripe integration for seamless credit purchasing'
            ]
        },
        {
            version: '1.8.0',
            date: '2024-08-20',
            changes: [
                'Added User Profiles with avatar uploads',
                'Social login integration (Google OAuth)',
                'Comment system deprecated in favor of "Reviews" (Star ratings only)',
                'Improved spam detection for new product submissions'
            ]
        },
        {
            version: '1.5.0',
            date: '2024-05-12',
            changes: [
                'Performance update: Client-side caching for product lists',
                'Added "Report this Product" flow for safety',
                'New "Editorial Guidelines" page published',
                'Infrastructure migration to cloud-native environment'
            ]
        },
        {
            version: '1.2.0',
            date: '2024-03-05',
            changes: [
                'Added rich text editor for product descriptions',
                'Support for multiple screenshots per product',
                'Category expansion: DevTools, AI, Marketing, Design',
                'First "Featured Product" slot implementation'
            ]
        },
        {
            version: '1.0.1',
            date: '2024-01-15',
            changes: [
                'Initial Platform Launch 🚀',
                'Core directory listing functionality',
                'Basic search and filtering',
                'Founder account registration',
                'Beta program exit'
            ]
        }
    ];

    return (
        <div style={{ paddingBottom: '80px', paddingTop: '40px' }}>
            <SEO
                title="Changelog - AppFoundry Updates"
                description="A timeline of updates, improvements, and new features as we build the decision layer for software."
                canonical="/changelog"
            />
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '16px', fontSize: '2.5rem', fontWeight: '800' }}>Changelog</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '60px', lineHeight: '1.6' }}>
                    A history of our journey building the decision layer for software. <br />
                    Currently on <strong>v{updates[0].version}</strong> (Stable).
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', position: 'relative' }}>
                    {/* Vertical Line */}
                    <div style={{
                        position: 'absolute',
                        left: '24px',
                        top: '20px',
                        bottom: '20px',
                        width: '2px',
                        background: '#f3f4f6',
                        zIndex: -1
                    }}></div>

                    {updates.map((update, idx) => (
                        <div key={update.version} className="card" style={{ padding: '0', border: 'none', background: 'transparent', boxShadow: 'none' }}>
                            <div style={{ display: 'flex', gap: '32px' }}>
                                {/* Timeline Node */}
                                <div style={{
                                    minWidth: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: idx === 0 ? 'var(--primary-color)' : '#fff',
                                    border: `4px solid ${idx === 0 ? 'var(--primary-color-light)' : '#e5e7eb'}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: idx === 0 ? '#fff' : '#6b7280',
                                    fontWeight: 'bold',
                                    zIndex: 1
                                }}>
                                    {idx === 0 ? '★' : '•'}
                                </div>

                                <div style={{
                                    background: '#fff',
                                    padding: '32px',
                                    borderRadius: '16px',
                                    border: '1px solid #eee',
                                    flex: 1,
                                    boxShadow: idx === 0 ? '0 10px 30px -10px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.02)'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
                                        <div>
                                            <h2 style={{ fontSize: '1.5rem', margin: 0, fontWeight: '700', color: 'var(--text-primary)' }}>
                                                v{update.version}
                                            </h2>
                                            {idx === 0 && <span style={{
                                                display: 'inline-block',
                                                fontSize: '0.75rem',
                                                background: '#dcfce7',
                                                color: '#166534',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                fontWeight: '600',
                                                marginTop: '4px'
                                            }}>Current Stable</span>}
                                        </div>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontFamily: 'monospace', background: '#f9fafb', padding: '4px 8px', borderRadius: '6px' }}>
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
                                                paddingLeft: '24px',
                                                position: 'relative',
                                                fontSize: '1rem',
                                                lineHeight: '1.6',
                                                color: 'var(--text-secondary)'
                                            }}>
                                                <span style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: '8px',
                                                    width: '6px',
                                                    height: '6px',
                                                    borderRadius: '50%',
                                                    background: 'var(--accent-primary)',
                                                }}></span>
                                                {change}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    marginTop: '80px',
                    padding: '40px',
                    background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                    borderRadius: '16px',
                    textAlign: 'center',
                    border: '1px solid #eee'
                }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Have an idea?</h3>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: 0 }}>
                        We build based on feedback from founders like you. <a href="/contact" style={{ color: 'var(--primary-color)', fontWeight: '600', textDecoration: 'none' }}>Submit a feature request &rarr;</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Changelog;
