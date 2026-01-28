import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { blogPosts } from '../data/blogData';

const Blog = () => {
    return (
        <>
            <SEOHead
                title="Blog - Insights for Independent Builders"
                description="Insights on building, launching, and growing independent SaaS products. Product discovery, founder playbooks, and real-world case studies."
            />

            <div style={{ paddingTop: '60px', paddingBottom: '60px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        marginBottom: '60px',
                        flexWrap: 'wrap',
                        gap: '24px'
                    }}>
                        <div>
                            <h1 style={{ marginBottom: '16px' }}>Blog</h1>
                            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', margin: 0 }}>
                                Insights on building, launching, and growing independent SaaS products.
                            </p>
                        </div>
                        <Link to="/blog/author" className="btn btn-secondary">
                            Meet Our Writers
                        </Link>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        {blogPosts.map((post) => (
                            <Link
                                key={post.slug}
                                to={`/blog/${post.slug}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <article className="card" style={{
                                    padding: '0',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    {/* Hero Image */}
                                    <div style={{
                                        width: '100%',
                                        height: '240px',
                                        backgroundColor: '#f3f4f6',
                                        backgroundImage: `url(${post.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        borderBottom: '1px solid #eee'
                                    }} />

                                    <div style={{ padding: '32px' }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                                            {/* Tags */}
                                            {post.tags && post.tags.map(tag => (
                                                <span key={tag} style={{
                                                    fontSize: '0.75rem',
                                                    fontWeight: '600',
                                                    color: 'var(--text-secondary)',
                                                    background: '#f3f4f6',
                                                    padding: '4px 12px',
                                                    borderRadius: '20px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.05em'
                                                }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
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
