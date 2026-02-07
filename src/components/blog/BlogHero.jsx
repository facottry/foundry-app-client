import React from 'react';
import { Link } from 'react-router-dom';

const BlogHero = ({ title, subtitle, image, author, voiceTagline, date, readTime, intent, taxonomy }) => {
    const intentColors = {
        educational: '#3b82f6',
        opinion: '#8b5cf6',
        framework: '#10b981',
        contrarian: '#f59e0b'
    };

    return (
        <header style={{ marginBottom: '60px', textAlign: 'center', padding: '0 20px' }}>
            {/* Taxonomy & Intent */}
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {taxonomy?.primary && (
                    <Link
                        to={`/blog/tags/${taxonomy.primary.toLowerCase().replace(/\s+/g, '-')}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <span style={{
                            fontSize: '0.85rem',
                            color: 'var(--accent-primary)',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            {taxonomy.primary}
                        </span>
                    </Link>
                )}
                {taxonomy?.tags && taxonomy.tags.map(tag => (
                    <Link
                        key={tag}
                        to={`/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <span style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            opacity: 0.8
                        }}>
                            #{tag}
                        </span>
                    </Link>
                ))}
            </div>

            {/* Date & Read Time */}
            <div style={{ marginBottom: '24px' }}>
                <span style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.02em'
                }}>
                    {date} • {readTime}
                </span>
            </div>

            {/* Title */}
            <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: '800',
                marginBottom: '16px',
                lineHeight: '1.1',
                color: 'var(--text-primary)'
            }}>
                {title}
            </h1>

            {/* Subtitle */}
            <p style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                color: 'var(--text-secondary)',
                marginBottom: '40px',
                lineHeight: '1.4',
                maxWidth: '800px',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                {subtitle}
            </p>

            {/* Author Card */}
            {author && (
                <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.4rem',
                        color: 'white'
                    }}>
                        {author.avatar}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>
                            {author.name}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            {voiceTagline || author.role}
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Image */}
            {image && (
                <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{
                        width: '100%',
                        paddingBottom: '56.25%', // 16:9 aspect ratio
                        backgroundImage: `url(${image.url || '/images/blog/placeholder_v2_hero.jpg'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '16px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.12)'
                    }} />
                    {image.alt && (
                        <p style={{
                            marginTop: '12px',
                            fontSize: '0.9rem',
                            color: 'var(--text-muted)',
                            fontStyle: 'italic'
                        }}>
                            {image.alt}
                        </p>
                    )}
                </div>
            )}
        </header>
    );
};

export default BlogHero;
