import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
    return (
        <nav aria-label="Breadcrumb" style={{
            marginBottom: '32px',
            fontSize: '0.9rem'
        }}>
            <ol style={{
                display: 'flex',
                listStyle: 'none',
                padding: 0,
                margin: 0,
                gap: '8px',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                {items.map((item, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {item.href ? (
                            <Link
                                to={item.href}
                                style={{
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'}
                                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                                {item.label}
                            </span>
                        )}
                        {index < items.length - 1 && (
                            <span style={{ color: 'var(--text-muted)', userSelect: 'none' }}>→</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
