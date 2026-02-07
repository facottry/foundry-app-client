import React from 'react';
import { Link } from 'react-router-dom';

const BlogClosing = ({ takeaway, image, internalLinks }) => {
    return (
        <footer style={{
            marginTop: '80px',
            paddingTop: '60px',
            borderTop: '1px solid var(--border-subtle)'
        }}>
            {/* Closing Image */}
            {image && (
                <figure style={{ marginBottom: '40px' }}>
                    <div style={{
                        width: '100%',
                        paddingBottom: '40%',
                        backgroundColor: '#f3f4f6',
                        backgroundImage: `url(${image.url || '/images/blog/placeholder_v2_closing.jpg'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '12px'
                    }} />
                    {image.alt && (
                        <figcaption style={{
                            textAlign: 'center',
                            marginTop: '12px',
                            fontSize: '0.9rem',
                            color: 'var(--text-muted)',
                            fontStyle: 'italic'
                        }}>
                            {image.alt}
                        </figcaption>
                    )}
                </figure>
            )}

            {/* Takeaway Box */}
            <div style={{
                background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
                border: '1px solid var(--border-subtle)',
                padding: '48px',
                borderRadius: '16px',
                textAlign: 'center',
                marginBottom: '48px'
            }}>
                <h3 style={{
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--text-secondary)',
                    marginBottom: '16px',
                    fontWeight: 600
                }}>
                    The Takeaway
                </h3>
                <p style={{
                    fontSize: '1.4rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    maxWidth: '800px',
                    margin: '0 auto',
                    lineHeight: '1.5'
                }}>
                    {takeaway}
                </p>
            </div>

            {/* Internal Links CTA */}
            {internalLinks && (Object.keys(internalLinks).length > 0) && (
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '16px',
                    justifyContent: 'center',
                    marginTop: '32px'
                }}>
                    {internalLinks.categories?.map(cat => (
                        <Link
                            key={cat}
                            to={`/category/${cat}`}
                            style={{
                                padding: '12px 24px',
                                background: 'var(--bg-secondary)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: '8px',
                                color: 'var(--text-primary)',
                                textDecoration: 'none',
                                fontSize: '0.95rem',
                                fontWeight: 500,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Explore {cat}
                        </Link>
                    ))}
                    {internalLinks.products?.length > 0 && (
                        <Link
                            to="/products"
                            style={{
                                padding: '12px 24px',
                                background: 'var(--accent-primary)',
                                color: 'white',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Browse Products →
                        </Link>
                    )}
                </div>
            )}
        </footer>
    );
};

export default BlogClosing;
