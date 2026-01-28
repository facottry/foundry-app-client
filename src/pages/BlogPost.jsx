import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { blogContent, authors } from '../data/blogData';

const BlogPost = () => {
    const { slug } = useParams();
    const post = blogContent[slug];

    if (!post) {
        return (
            <div style={{ paddingTop: '60px', textAlign: 'center' }}>
                <h1>Post Not Found</h1>
                <Link to="/blog" className="btn btn-primary" style={{ marginTop: '24px' }}>
                    Back to Blog
                </Link>
            </div>
        );
    }

    const author = authors[post.authorId];

    return (
        <>
            <SEOHead
                title={post.title}
                description={post.content.substring(0, 160)}
            />

            <div style={{ paddingTop: '40px', paddingBottom: '60px' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <Breadcrumbs items={[
                        { label: 'Home', href: '/' },
                        { label: 'Blog', href: '/blog' },
                        { label: post.title }
                    ]} />

                    <article>
                        {/* Hero Image */}
                        {post.image && (
                            <div style={{
                                width: '100%',
                                height: '400px',
                                backgroundColor: '#f3f4f6',
                                backgroundImage: `url(${post.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '16px',
                                marginBottom: '40px',
                                border: '1px solid #eee'
                            }} />
                        )}

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
                            {/* Tags */}
                            {post.tags && post.tags.map(tag => (
                                <span key={tag} style={{
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    color: 'var(--text-secondary)',
                                    background: '#f3f4f6',
                                    padding: '6px 16px',
                                    borderRadius: '20px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '1rem', color: 'var(--text-muted)' }}>
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.category}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                        </div>
                        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '32px', lineHeight: '1.1' }}>{post.title}</h1>

                        <div style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            color: 'var(--text-primary)',
                            whiteSpace: 'pre-line'
                        }}>
                            {post.content.split('\n## ').map((section, index) => {
                                if (index === 0) {
                                    return <p key={index} style={{ marginBottom: '32px' }}>{section.trim()}</p>;
                                }
                                const [heading, ...content] = section.split('\n');
                                return (
                                    <div key={index} style={{ marginBottom: '40px' }}>
                                        <h2 style={{ fontSize: '1.75rem', marginBottom: '16px' }}>{heading}</h2>
                                        <div style={{ whiteSpace: 'pre-line' }}>{content.join('\n').trim()}</div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Author Box */}
                        {author && (
                            <div style={{
                                marginTop: '60px',
                                padding: '32px',
                                background: '#f9fafb',
                                borderRadius: '12px',
                                border: '1px solid #eee',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '24px'
                            }}>
                                <Link to={`/blog/author/${post.authorId}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '24px', alignItems: 'center' }}>
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        background: '#fff',
                                        fontSize: '2.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid #e5e7eb'
                                    }}>
                                        {author.avatar}
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '4px', fontWeight: '700' }}>
                                            {author.name}
                                        </h3>
                                        <p style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '8px' }}>
                                            {author.role}
                                        </p>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                                            {author.bio}
                                        </p>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', textDecoration: 'underline' }}>
                                            View all posts by {author.name}
                                        </div>
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
                                            marginLeft: 'auto',
                                            padding: '8px 16px',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '6px',
                                            textDecoration: 'none',
                                            whiteSpace: 'nowrap'
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        LinkedIn ↗
                                    </a>
                                )}
                            </div>
                        )}

                        <div style={{
                            marginTop: '40px',
                            paddingTop: '40px',
                            borderTop: '1px solid var(--border-subtle)',
                            display: 'flex',
                            gap: '16px',
                            justifyContent: 'center'
                        }}>
                            <Link to="/blog" className="btn btn-secondary">
                                ← Back to Blog
                            </Link>
                            <Link to="/category/all" className="btn btn-primary">
                                Explore Products
                            </Link>
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
};

export default BlogPost;
