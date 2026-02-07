import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { jobs } from '../data/jobsData';
import BRAND from '../config/brand';

const Jobs = () => {
    return (
        <>
            <SEOHead
                title={`Careers at ${BRAND.publicName} - Hiring Support & Engineering`}
                description={`Join the ${BRAND.publicName} team. We are hiring for Support, Community, and Engineering roles to build the decision layer for software.`}
            />

            <div style={{ paddingTop: '60px', paddingBottom: '80px', maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                        Join the Mission
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                        We are building the decision layer for the software ecosystem. <br />
                        Help us reduce discovery friction for millions of founders.
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {jobs.map(job => (
                        <Link
                            key={job.id}
                            to={`/jobs/${job.slug}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="card" style={{
                                padding: '32px',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                border: '1px solid #e5e7eb',
                                borderRadius: '12px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '20px'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)';
                                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'none';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.borderColor = '#e5e7eb';
                                }}
                            >
                                <div>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
                                        {job.title}
                                    </h2>
                                    <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                        <span>📍 {job.location}</span>
                                        <span>💼 {job.type}</span>
                                        <span>🏷️ {job.department}</span>
                                    </div>
                                </div>

                                <div style={{
                                    padding: '10px 24px',
                                    background: 'var(--text-primary)',
                                    color: 'white',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    fontSize: '0.95rem'
                                }}>
                                    View Role
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div style={{ marginTop: '80px', padding: '40px', background: '#f9fafb', borderRadius: '16px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>
                        Don't see a fit?
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                        We are always looking for exceptional engineers and product thinkers.
                    </p>
                    <a href="mailto:admin@edutainverse.com?subject=General Application" style={{
                        color: 'var(--accent-primary)',
                        fontWeight: '600',
                        textDecoration: 'none',
                        borderBottom: '2px solid var(--accent-primary)'
                    }}>
                        Email us your resume →
                    </a>
                </div>
            </div>
        </>
    );
};

export default Jobs;
