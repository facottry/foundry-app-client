import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { blogPosts } from '../data/blogPosts';
import Breadcrumbs from '../components/Breadcrumbs';
import BRAND from '../config/brand';

const TagBlog = () => {
    const { slug } = useParams();
    // primitive slug matching: replace dashes with spaces for display, but filtering might need to be looser or exact
    // The user said "Tag are always without space". 
    // In db they are "AI Infrastructure". 
    // Slug is "ai-infrastructure". 
    // implementation: check if tag.toLowerCase().replace(/\s+/g, '-') === slug

    const displayTag = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const filteredPosts = useMemo(() => {
        return blogPosts.filter(post => {
            const allTags = [
                post.taxonomy.primary,
                ...(post.taxonomy.secondary || []),
                ...(post.taxonomy.tags || [])
            ];

            return allTags.some(tag =>
                tag.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
            );
        }).sort((a, b) => new Date(b.meta.publishedAt || b.date) - new Date(a.meta.publishedAt || a.date));
    }, [slug]);

    return (
        <>
            <SEOHead
                title={`${displayTag} Articles | ${BRAND.publicName}`}
                description={`Read the latest ${displayTag} articles and insights on ${BRAND.publicName}.`}
            />

            <div style={{ paddingTop: '40px', paddingBottom: '60px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <Breadcrumbs items={[
                        { label: 'Home', href: '/' },
                        { label: 'Blog', href: '/blog' },
                        { label: displayTag }
                    ]} />

                    <div style={{ marginBottom: '40px', marginTop: '20px' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '8px' }}>
                            {displayTag}
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                            {filteredPosts.length} articles found
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post) => (
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
                                            backgroundImage: `url(${post.hero.image?.url || '/images/blog/placeholder_v2_hero.jpg'})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            borderBottom: '1px solid #eee'
                                        }} />

                                        <div style={{ padding: '32px' }}>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                                                {/* Tags */}
                                                {(post.taxonomy?.tags || []).map(tag => (
                                                    <Link
                                                        key={tag}
                                                        to={`/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                                                        style={{ textDecoration: 'none' }}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <span style={{
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
                                                    </Link>
                                                ))}
                                            </div>

                                            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                                <span>{new Date(post.meta.publishedAt).toLocaleDateString()}</span>
                                                <span>•</span>
                                                <span>{post.meta.readTime}</span>
                                            </div>
                                            <h2 style={{ fontSize: '1.75rem', marginBottom: '12px', color: 'var(--text-primary)' }}>
                                                {post.hero.title}
                                            </h2>
                                            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                                                {post.hero.subtitle}
                                            </p>
                                            <div style={{ marginTop: '20px', color: 'var(--accent-primary)', fontWeight: '600', fontSize: '0.95rem' }}>
                                                Read more →
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))
                        ) : (
                            <p>No articles found for this tag.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TagBlog;
