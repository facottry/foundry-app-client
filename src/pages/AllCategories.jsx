import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORY_TITLES, CATEGORY_INTROS } from '../constants/categories';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import CategoryCollectionTabs from '../components/CategoryCollectionTabs';

const AllCategories = () => {
    const categories = Object.keys(CATEGORY_TITLES).filter(c => c !== 'all');

    return (
        <div style={{ paddingTop: '40px' }}>
            <SEO
                title="All Categories - Clicktory"
                description="Browse all product categories on Clicktory. Find the best tools for developers, productivity, marketing, and more."
                canonical="/category"
            />
            <Breadcrumbs items={[
                { label: 'Home', href: '/' },
                { label: 'Products' }
            ]} />

            <CategoryCollectionTabs />

            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', lineHeight: '1.2' }}>
                    Explore Products
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px' }}>
                    Browse our directory of curated tools and resources organized by category.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px'
            }}>
                {categories.map(slug => (
                    <Link
                        key={slug}
                        to={`/category/${slug}`}
                        style={{
                            display: 'block',
                            backgroundColor: '#fff',
                            border: '1px solid var(--border-color)',
                            borderRadius: '12px',
                            padding: '24px',
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: '600' }}>
                                {slug}
                            </h2>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(`/category/${slug}`, '_blank');
                                }}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    color: '#999',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '4px',
                                    transition: 'color 0.2s, background 0.2s'
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-primary)'; e.currentTarget.style.background = '#f0f0f0'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = '#999'; e.currentTarget.style.background = 'transparent'; }}
                                title="Open in new tab"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                    <polyline points="15 3 21 3 21 9"></polyline>
                                    <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                            </button>
                        </div>
                        <h3 style={{ fontSize: '0.95rem', color: '#666', marginBottom: '8px', fontWeight: '500' }}>
                            {CATEGORY_TITLES[slug]}
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {CATEGORY_INTROS[slug]}
                        </p>
                        <div style={{ marginTop: '16px', color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: '500' }}>
                            View Products &rarr;
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllCategories;
