import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, promoted }) => {
    return (
        <Link to={`/product/${product.slug || product._id}`} style={{ textDecoration: 'none' }}>
            <div className="card" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                height: '100%',
                border: promoted ? '2px solid var(--accent-secondary)' : '1px solid var(--border-subtle)',
                position: 'relative'
            }}>
                {promoted && (
                    <div style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '20px',
                        background: 'var(--accent-primary)',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                    }}>
                        Promoted
                    </div>
                )}

                <div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                        {product.name}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>
                        {product.tagline}
                    </p>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                        fontSize: '0.85rem',
                        background: '#F3F4F6',
                        color: '#6B7280',
                        padding: '4px 12px',
                        borderRadius: '50px',
                        fontWeight: '500'
                    }}>
                        {product.categories && product.categories[0]}
                    </span>
                    <span style={{
                        fontSize: '0.9rem',
                        color: 'var(--accent-primary)',
                        fontWeight: '600'
                    }}>
                        View &rarr;
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
