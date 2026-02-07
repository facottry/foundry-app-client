import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { blogPosts } from '../data/blogPosts';
import { authors } from '../data/blogAuthors';
import Breadcrumbs from '../components/Breadcrumbs';
import BRAND from '../config/brand';

const AuthorBlog = () => {
    const { authorId } = useParams();
    const author = authors[authorId];

    // Filter posts by this author
    const authorPosts = useMemo(() => {
        return blogPosts
            .filter(post => post.author.id === authorId)
            // Sort by date descending (newest first)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

    }, [authorId]);

    if (!author) {
        return (
            <div style={{ paddingTop: '60px', textAlign: 'center' }}>
                <h1>Author Not Found</h1>
                <Link to="/blog" className="btn btn-primary" style={{ marginTop: '24px' }}>
                    Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <>
            <SEOHead
                title={`${author.name} - Blog Posts | ${BRAND.publicName}`}
                description={`Read articles by ${author.name}, ${author.role} at ${BRAND.publicName}. ${author.bio}`}
            />

            <div style={{ paddingTop: '40px', paddingBottom: '60px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <Breadcrumbs items={[
                        { label: 'Home', href: '/' },
                        { label: 'Blog', href: '/blog' },
                        { label: author.name }
                    ]} />

                    {/* Author Profile Header */}
                    <div style={{
                        marginTop: '32px',
                        marginBottom: '60px',
                        padding: '40px',
                        background: '#f9fafb',
                        borderRadius: '16px',
                        border: '1px solid #eee',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '32px'
                    }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            background: '#fff',
                            fontSize: '4rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #e5e7eb',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                        }}>
                            {author.avatar}
                        </div>
                        <div>
                            <h1 style={{ fontSize: '2rem', marginBottom: '8px', fontWeight: '800' }}>
                                {author.name}
                            </h1>
                            <p style={{ color: 'var(--primary-color)', fontSize: '1.1rem', fontWeight: '600', marginBottom: '12px' }}>
                                {author.role}
                            </p>
                            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '16px', maxWidth: '600px', lineHeight: '1.6' }}>
                                {author.bio}
                            </p>
                            {author.linkedin && (
                                <a href={author.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.95rem', color: '#0077b5', fontWeight: '600', textDecoration: 'none' }}>
                                    Connect on LinkedIn <span style={{ marginLeft: '4px' }}>→</span>
                                </a>
                            )}
                        </div>
                    </div>

                    <h2 style={{ marginBottom: '32px', fontSize: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
                        Articles by {author.name} ({authorPosts.length})
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        {authorPosts.length > 0 ? (
                            authorPosts.map((post) => (
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
                                                {post.taxonomy?.tags && post.taxonomy.tags.map(tag => (
                                                    <Link
                                                        key={tag}
                                                        to={`/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                                                        style={{ textDecoration: 'none' }}
                                                        onClick={(e) => e.stopPropagation()} // Prevent card click
                                                    >
                                                        <span style={{
                                                            fontSize: '0.75rem',
                                                            fontWeight: '600',
                                                            color: 'var(--text-secondary)',
                                                            background: '#f3f4f6',
                                                            padding: '4px 12px',
                                                            borderRadius: '20px',
                                                            textTransform: 'uppercase',
                                                            letterSpacing: '0.05em',
                                                            transition: 'background 0.2s'
                                                        }}
                                                            onMouseEnter={(e) => e.target.style.background = '#e5e7eb'}
                                                            onMouseLeave={(e) => e.target.style.background = '#f3f4f6'}
                                                        >
                                                            {tag}
                                                        </span>
                                                    </Link>
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
                            ))
                        ) : (
                            <p>No articles found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthorBlog;
