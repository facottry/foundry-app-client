import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CategoryCollectionTabs = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const tabs = [
        { label: 'All Products', path: '/product' },
        { label: 'Categories', path: '/category' },
        { label: 'Collections', path: '/collection' }
    ];

    return (
        <div style={{ display: 'flex', borderBottom: '1px solid #eee', marginBottom: '32px' }}>
            {tabs.map((tab) => {
                // Check if active. Note: currentPath might be /category/something, but for the index page switch it should strictly match or be parent?
                // For these index pages, we usually want strict match or just base match.
                // Assuming these tabs are only on the index pages.
                const isActive = currentPath === tab.path || (tab.path === '/product' && currentPath === '/category/all');

                return (
                    <div
                        key={tab.path}
                        style={{
                            marginRight: '32px',
                            paddingBottom: '12px',
                            borderBottom: isActive ? '2px solid #f97316' : '2px solid transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '-1px' // Sit on the line
                        }}
                    >
                        <Link
                            to={tab.path}
                            style={{
                                textDecoration: 'none',
                                color: isActive ? '#f97316' : '#666',
                                fontWeight: isActive ? '600' : '500',
                                fontSize: '1.1rem',
                                transition: 'color 0.2s'
                            }}
                        >
                            {tab.label}
                        </Link>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(tab.path, '_blank');
                            }}
                            title="Open in new tab"
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#999',
                                transition: 'all 0.2s',
                                borderRadius: '4px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#f97316';
                                e.currentTarget.style.backgroundColor = '#fff7ed';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#999';
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default CategoryCollectionTabs;
