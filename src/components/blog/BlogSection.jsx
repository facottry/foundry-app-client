import React from 'react';

const BlogSection = ({ heading, paragraphs, quote, image }) => {
    const quoteStyles = {
        insight: {
            borderColor: '#3b82f6',
            background: '#eff6ff'
        },
        warning: {
            borderColor: '#f59e0b',
            background: '#fffbeb'
        },
        reflection: {
            borderColor: '#8b5cf6',
            background: '#f5f3ff'
        }
    };

    // Parse inline formatting: **bold**, *italic*, [link](url)
    const parseRichText = (text) => {
        if (!text) return '';
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" style="color: var(--accent-primary); text-decoration: underline;">$1</a>');
    };

    return (
        <section style={{ marginBottom: '48px' }}>
            {heading && (
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    marginBottom: '24px',
                    marginTop: '48px',
                    color: 'var(--text-primary)',
                    lineHeight: '1.3'
                }}>
                    {heading}
                </h2>
            )}

            {paragraphs && paragraphs.map((p, idx) => (
                <p key={idx} style={{
                    fontSize: '1.125rem',
                    lineHeight: '1.8',
                    marginBottom: '20px',
                    color: 'var(--text-primary)'
                }} dangerouslySetInnerHTML={{
                    __html: parseRichText(typeof p === 'string' ? p : p.text)
                }} />
            ))}

            {quote && (
                <blockquote style={{
                    borderLeft: `4px solid ${quoteStyles[quote.tone]?.borderColor || '#6b7280'}`,
                    paddingLeft: '24px',
                    margin: '40px 0',
                    fontStyle: 'italic',
                    fontSize: '1.25rem',
                    color: 'var(--text-primary)',
                    background: quoteStyles[quote.tone]?.background || '#f9fafb',
                    padding: '28px 28px 28px 32px',
                    borderRadius: '0 12px 12px 0',
                    lineHeight: '1.6'
                }}>
                    "{quote.text}"
                </blockquote>
            )}

            {image && (
                <figure style={{ margin: '40px 0' }}>
                    <div style={{
                        width: '100%',
                        paddingBottom: '60%',
                        backgroundColor: '#f3f4f6',
                        backgroundImage: `url(${image.url || '/images/blog/placeholder_v2_inline.jpg'})`,
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
        </section>
    );
};

export default BlogSection;
