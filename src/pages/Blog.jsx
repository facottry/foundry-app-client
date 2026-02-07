import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { blogPosts, getAllCategories, authors } from '../data/blogPosts';

const Blog = () => {
    const categories = getAllCategories();

    return (
        <>
            <SEOHead
                title="Blog - Insights for Independent Builders | Clicktory"
                description="Founder-led insights on building, launching, and growing independent SaaS products. Real operator perspectives on growth, AI, systems, and longevity."
            />

            <div style={{ paddingTop: '60px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        marginBottom: '48px',
                        flexWrap: 'wrap',
                        gap: '24px'
                    }}>
                        <div>
                            <h1 style={{ marginBottom: '12px', fontSize: '2.5rem' }}>Blog</h1>
                            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '500px' }}>
                                Founder-led insights on building, launching, and growing independent products.
                            </p>
                        </div>
                        <Link to="/blog/author" className="btn btn-secondary">
                            Meet Our Writers
                        </Link>
                    </div>

                    {/* Category Filter */}
                    {categories.length > 0 && (
                        <div style={{
                            display: 'flex',
                            gap: '12px',
                            marginBottom: '48px',
                            flexWrap: 'wrap'
                        }}>
                            {categories.map(cat => (
                                <span
                                    key={cat}
                                    style={{
                                        padding: '8px 16px',
                                        background: 'var(--bg-secondary)',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: '20px',
                                        fontSize: '0.9rem',
                                        color: 'var(--text-secondary)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {blogPosts.length === 0 && (
                        <div style={{
                            textAlign: 'center',
                            padding: '80px 20px',
                            background: 'var(--bg-secondary)',
                            borderRadius: '16px',
                            border: '1px solid var(--border-subtle)'
                        }}>
                            <div style={{ fontSize: '4rem', marginBottom: '24px' }}>📝</div>
                            <h2 style={{ marginBottom: '12px' }}>Coming Soon</h2>
                            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
                                We're crafting founder-led content that matters. Check back soon for insights on building, growth, and systems.
                            </p>
                        </div>
                    )}

                    {/* Blog Grid */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        {blogPosts.map((post) => {
                            const author = authors[post.author.id];
                            return (
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
                                            paddingBottom: '45%',
                                            backgroundColor: '#f3f4f6',
                                            backgroundImage: `url(${post.hero?.image?.url || '/images/blog/placeholder_v2_hero.jpg'})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            borderBottom: '1px solid var(--border-subtle)'
                                        }} />

                                        <div style={{ padding: '28px 32px' }}>
                                            {/* Taxonomy & Meta */}
                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '12px',
                                                marginBottom: '16px',
                                                alignItems: 'center'
                                            }}>
                                                <span style={{
                                                    fontSize: '0.8rem',
                                                    fontWeight: '600',
                                                    color: 'var(--accent-primary)',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.05em'
                                                }}>
                                                    {post.taxonomy.primary}
                                                </span>
                                                <span style={{ color: 'var(--text-muted)' }}>•</span>
                                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                                    {new Date(post.meta.publishedAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                                <span style={{ color: 'var(--text-muted)' }}>•</span>
                                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                                    {post.meta.readTime}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h2 style={{
                                                fontSize: '1.5rem',
                                                marginBottom: '12px',
                                                color: 'var(--text-primary)',
                                                lineHeight: 1.3
                                            }}>
                                                {post.hero.title}
                                            </h2>

                                            {/* Subtitle */}
                                            <p style={{
                                                fontSize: '1rem',
                                                color: 'var(--text-secondary)',
                                                lineHeight: '1.6',
                                                marginBottom: '20px'
                                            }}>
                                                {post.hero.subtitle}
                                            </p>

                                            {/* Author & CTA */}
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                {author && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <span style={{ fontSize: '1.2rem' }}>{author.avatar}</span>
                                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                                            {author.name}
                                                        </span>
                                                    </div>
                                                )}
                                                <span style={{
                                                    color: 'var(--accent-primary)',
                                                    fontWeight: '600',
                                                    fontSize: '0.95rem'
                                                }}>
                                                    Read more →
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blog;
