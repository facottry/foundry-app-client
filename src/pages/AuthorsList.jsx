import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { authors } from '../data/blogData';

const AuthorsList = () => {
    const authorList = Object.entries(authors).map(([id, author]) => ({
        id,
        ...author
    }));

    return (
        <>
            <SEOHead
                title="Our Writers - Foundry Blog"
                description="Meet the industry experts, founders, and engineers behind the Foundry blog."
            />

            <div style={{ paddingTop: '40px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <Breadcrumbs items={[
                        { label: 'Home', href: '/' },
                        { label: 'Blog', href: '/blog' },
                        { label: 'Authors' }
                    ]} />

                    <div style={{ textAlign: 'center', marginBottom: '60px', marginTop: '40px' }}>
                        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '16px' }}>
                            Meet Our Writers
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            Voices from the intersection of product, engineering, and growth.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '32px'
                    }}>
                        {authorList.map((author) => (
                            <Link
                                key={author.id}
                                to={`/blog/author/${author.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <article className="card" style={{
                                    padding: '40px',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                }}>
                                    <div style={{
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: '50%',
                                        background: '#f9fafb',
                                        fontSize: '4rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid #e5e7eb',
                                        marginBottom: '24px'
                                    }}>
                                        {author.avatar}
                                    </div>

                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
                                        {author.name}
                                    </h2>
                                    <p style={{
                                        color: 'var(--primary-color)',
                                        fontWeight: '600',
                                        marginBottom: '16px',
                                        fontSize: '0.95rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {author.role}
                                    </p>
                                    <p style={{
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.6',
                                        marginBottom: '24px',
                                        fontSize: '1rem'
                                    }}>
                                        {author.bio}
                                    </p>

                                    <div style={{ marginTop: 'auto', color: 'var(--accent-primary)', fontWeight: '600' }}>
                                        View Profile &rarr;
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthorsList;
