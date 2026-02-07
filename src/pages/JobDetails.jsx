import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { jobs } from '../data/jobsData';
import Breadcrumbs from '../components/Breadcrumbs';
import BRAND from '../config/brand';

const JobDetails = () => {
    const { slug } = useParams();
    const job = jobs.find(j => j.slug === slug);

    if (!job) {
        return (
            <div style={{ paddingTop: '80px', textAlign: 'center' }}>
                <h1>Job Not Found</h1>
                <Link to="/jobs" style={{ color: 'var(--accent-primary)' }}>View all open roles</Link>
            </div>
        );
    }

    const handleApply = () => {
        const subject = encodeURIComponent(`Application for ${job.title} - [Your Name]`);
        const body = encodeURIComponent(`Hi Clicktory Team,\n\nI am writing to apply for the ${job.title} position.\n\n[Please attach your resume and tell us why you are a good fit]\n\nBest,\n[Your Name]`);
        window.location.href = `mailto:${job.applyEmail}?subject=${subject}&body=${body}`;
    };

    return (
        <>
            <SEOHead
                title={`${job.title} at ${BRAND.publicName} - Careers`}
                description={`We are hiring a ${job.title} in ${job.location}. Join Clicktory and build the future of software discovery.`}
            />

            <div style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto' }}>
                <Breadcrumbs items={[
                    { label: 'Home', href: '/' },
                    { label: 'Careers', href: '/jobs' },
                    { label: job.title }
                ]} />

                <div style={{ marginTop: '40px', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px', lineHeight: '1.2' }}>
                        {job.title}
                    </h1>
                    <div style={{ display: 'flex', gap: '20px', color: 'var(--text-secondary)', fontSize: '1.1rem', flexWrap: 'wrap' }}>
                        <span>📍 {job.location}</span>
                        <span>💼 {job.type}</span>
                        <span>🏷️ {job.department}</span>
                    </div>
                </div>

                <div style={{
                    padding: '32px',
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '16px' }}>Role Description</h3>
                        <p style={{ whiteSpace: 'pre-line', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            {job.description.trim()}
                        </p>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '16px' }}>Qualifications</h3>
                        <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            {job.qualifications.map((q, i) => (
                                <li key={i} style={{ marginBottom: '8px' }}>{q}</li>
                            ))}
                        </ul>
                    </div>

                    <div style={{
                        marginTop: '40px',
                        padding: '32px',
                        background: '#f9fafb',
                        borderRadius: '12px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '12px' }}>
                            Ready to apply?
                        </h3>
                        <p style={{ marginBottom: '24px', color: 'var(--text-secondary)' }}>
                            We'd love to hear from you.
                        </p>
                        <button
                            onClick={handleApply}
                            style={{
                                padding: '16px 40px',
                                background: 'var(--accent-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                                transition: 'transform 0.1s'
                            }}
                            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Apply via Email
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobDetails;
