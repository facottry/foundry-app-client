import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const blogPosts = [
    {
        slug: 'how-to-get-early-users-for-saas',
        title: 'How to Get Early Users for Your SaaS Without Paid Ads',
        date: '2026-01-20',
        excerpt: 'Discovery platforms, communities, and organic channels that actually work for early-stage products.',
        category: 'Product Discovery',
        readTime: '6 min read'
    },
    {
        slug: 'launching-as-solo-founder',
        title: 'Launching as a Solo Founder: What Actually Matters',
        date: '2026-01-15',
        excerpt: 'Cut through the noise. Focus on the fundamentals that move the needle when you are building alone.',
        category: 'Founder Playbooks',
        readTime: '8 min read'
    },
    {
        slug: 'product-discovery-without-noise',
        title: 'Product Discovery Without the Noise',
        date: '2026-01-10',
        excerpt: 'Why structured discovery beats algorithmic feeds for finding tools that actually solve problems.',
        category: 'Product Discovery',
        readTime: '5 min read'
    },
    {
        slug: 'choosing-right-early-tools',
        title: 'Choosing the Right Early Tools for Your Startup',
        date: '2026-01-05',
        excerpt: 'A framework for evaluating tools when you are pre-revenue and every decision counts.',
        category: 'Founder Playbooks',
        readTime: '7 min read'
    }
];

const Blog = () => {
    return (
        <>
            <SEOHead
                title="Blog - Insights for Independent Builders"
                description="Insights on building, launching, and growing independent SaaS products. Product discovery, founder playbooks, and real-world case studies."
            />

            <div style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h1 style={{ marginBottom: '16px' }}>Blog</h1>
                    <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '60px' }}>
                        Insights on building, launching, and growing independent SaaS products.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        {blogPosts.map((post) => (
                            <Link
                                key={post.slug}
                                to={`/blog/${post.slug}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <article className="card" style={{
                                    padding: '32px',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                }}>
                                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.category}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h2 style={{ fontSize: '1.75rem', marginBottom: '12px', color: 'var(--text-primary)' }}>
                                        {post.title}
                                    </h2>
                                    <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                                        {post.excerpt}
                                    </p>
                                    <div style={{ marginTop: '20px', color: 'var(--accent-primary)', fontWeight: '600', fontSize: '0.95rem' }}>
                                        Read more →
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

export default Blog;
