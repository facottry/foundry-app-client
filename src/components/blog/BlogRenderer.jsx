import React from 'react';
import { Link } from 'react-router-dom';
import BlogHero from './BlogHero';
import BlogSection from './BlogSection';
import BlogClosing from './BlogClosing';

const BlogRenderer = ({ post, author }) => {
    return (
        <article className="blog-v2-container">
            <BlogHero
                title={post.hero.title}
                subtitle={post.hero.subtitle}
                image={post.hero.image}
                author={author}
                voiceTagline={post.author.voiceTagline}
                date={new Date(post.meta.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
                readTime={post.meta.readTime}
                intent={post.meta.intent}
                taxonomy={post.taxonomy}
            />

            <div className="blog-content" style={{ maxWidth: '750px', margin: '0 auto', padding: '0 20px' }}>
                {post.sections.map((section, index) => (
                    <BlogSection
                        key={index}
                        heading={section.heading}
                        paragraphs={section.paragraphs}
                        quote={section.quote}
                        image={section.image}
                    />
                ))}
            </div>

            {post.closing && (
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
                    <BlogClosing
                        takeaway={post.closing.takeaway}
                        image={post.closing.image}
                        internalLinks={post.internalLinks}
                    />
                </div>
            )}
        </article>
    );
};

export default BlogRenderer;
