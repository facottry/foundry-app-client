import React from 'react';
import { Link } from 'react-router-dom';
import BRAND from '../config/brand';

const About = () => {
    return (
        <div style={{ paddingTop: '60px', paddingBottom: '60px' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ marginBottom: '32px', fontSize: '2.5rem' }}>Built to Help Independent Builders Get Discovered</h1>

                <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)' }}>
                    <p style={{ marginBottom: '28px' }}>
                        {BRAND.publicName} is a modern discovery platform designed for independent SaaS founders, developers, and builders who want visibility without noise.
                    </p>

                    <p style={{ marginBottom: '28px' }}>
                        We believe good products deserve to be found based on clarity, usefulness, and intent — not hype, aggressive marketing, or inflated claims. {BRAND.publicName} helps early-stage and growing products surface to the right audience at the right time.
                    </p>

                    <p style={{ marginBottom: '28px' }}>
                        Unlike traditional directories or ad-heavy platforms, {BRAND.publicName} focuses on structured discovery. Products are presented with context, categories, and signals that help users understand what they are exploring and why it matters.
                    </p>

                    <p style={{ marginBottom: '28px' }}>
                        {BRAND.publicName} is built for long-term credibility. Clean URLs, transparent metrics, and simple tools that respect both founders and users.
                    </p>

                    <div style={{
                        marginTop: '60px',
                        padding: '40px',
                        background: 'var(--bg-secondary)',
                        borderRadius: '12px',
                        borderLeft: '4px solid var(--accent-primary)'
                    }}>
                        <p style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0, color: 'var(--text-primary)' }}>
                            {BRAND.publicName} is where serious builders show up — and get discovered.
                        </p>
                    </div>

                    <div style={{ marginTop: '60px', display: 'flex', gap: '24px', justifyContent: 'center' }}>
                        <Link to="/products" className="btn btn-primary">Explore Products</Link>
                        <Link to="/pricing" className="btn btn-secondary">View Pricing</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
