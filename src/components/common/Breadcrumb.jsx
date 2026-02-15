import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Breadcrumb navigation component
 * Displays hierarchical navigation path with chevron separators
 */
const Breadcrumb = ({ items }) => {
    return (
        <nav
            aria-label="Breadcrumb"
            style={{
                padding: '12px 0',
                fontSize: '14px',
                color: '#6b7280'
            }}
        >
            <ol style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                flexWrap: 'wrap'
            }}>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            {item.href && !isLast ? (
                                <Link
                                    to={item.href}
                                    style={{
                                        color: '#6b7280',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = '#374151';
                                        e.target.style.textDecoration = 'underline';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = '#6b7280';
                                        e.target.style.textDecoration = 'none';
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span style={{
                                    color: isLast ? '#374151' : '#6b7280',
                                    fontWeight: isLast ? '600' : '400'
                                }}>
                                    {item.label}
                                </span>
                            )}

                            {!isLast && (
                                <span
                                    aria-hidden="true"
                                    style={{
                                        color: '#d1d5db',
                                        userSelect: 'none'
                                    }}
                                >
                                    ›
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

Breadcrumb.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            href: PropTypes.string
        })
    ).isRequired
};

export default Breadcrumb;
