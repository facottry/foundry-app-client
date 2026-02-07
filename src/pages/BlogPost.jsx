import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { getBlogBySlug, authors } from '../data/blogPosts';
import BlogRenderer from '../components/blog/BlogRenderer';

const BlogPost = () => {
    const { slug } = useParams();
    const post = getBlogBySlug(slug);

    if (!post) {
        return (
            <div style={{ paddingTop: '100px', textAlign: 'center', minHeight: '60vh' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Post Not Found</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                    The blog post you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/blog" className="btn btn-primary">
                    ← Back to Blog
                </Link>
            </div>
        );
    }

    const author = authors[post.author.id];

    return (
        <>
            <SEOHead
                title={post.seo.title}
                description={post.seo.description}
                keywords={post.seo.keywords?.join(', ')}
                canonical={post.seo.canonical}
            />

            <div style={{ paddingTop: '40px', paddingBottom: '80px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
                    <Breadcrumbs items={[
                        { label: 'Home', href: '/' },
                        { label: 'Blog', href: '/blog' },
                        { label: post.hero.title }
                    ]} />
                </div>

                <BlogRenderer post={post} author={author} />

                {/* Author Card */}
                {author && (
                    <div style={{ maxWidth: '750px', margin: '60px auto 0', padding: '0 20px' }}>
                        <div style={{
                            padding: '32px',
                            background: 'var(--bg-secondary)',
                            borderRadius: '16px',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '24px',
                            flexWrap: 'wrap'
                        }}>
                            <Link
                                to={`/blog/author/${post.author.id}`}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    display: 'flex',
                                    gap: '20px',
                                    alignItems: 'center',
                                    flex: 1,
                                    minWidth: '250px'
                                }}
                            >
                                <div style={{
                                    width: '72px',
                                    height: '72px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    fontSize: '2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    flexShrink: 0
                                }}>
                                    {author.avatar}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.15rem', marginBottom: '4px', fontWeight: '700' }}>
                                        {author.name}
                                    </h3>
                                    <p style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '6px' }}>
                                        {author.role}
                                    </p>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                        {author.bio}
                                    </p>
                                </div>
                            </Link>
                            {author.linkedin && (
                                <a
                                    href={author.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        fontSize: '0.9rem',
                                        color: '#0077b5',
                                        fontWeight: '500',
                                        padding: '10px 20px',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        whiteSpace: 'nowrap',
                                        background: 'white'
                                    }}
                                >
                                    LinkedIn ↗
                                </a>
                            )}
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div style={{
                    marginTop: '48px',
                    paddingTop: '40px',
                    maxWidth: '750px',
                    margin: '48px auto 0',
                    padding: '40px 20px 0',
                    borderTop: '1px solid var(--border-subtle)',
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Link to="/blog" className="btn btn-secondary">
                        ← Back to Blog
                    </Link>
                    <Link to="/products" className="btn btn-primary">
                        Explore Products
                    </Link>
                </div>
            </div>
        </>
    );
};

export default BlogPost;
