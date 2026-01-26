import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#F7F6F2',
            borderTop: '1px solid #E5E5E5',
            marginTop: 'auto',
            padding: '80px 0 40px'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '60px',
                    marginBottom: '60px'
                }}>

                    {/* Brand Column */}
                    <div>
                        <h4 style={{
                            fontSize: '1.5rem',
                            marginBottom: '16px',
                            fontWeight: '700',
                            letterSpacing: '-0.02em'
                        }}>
                            Foundry.
                        </h4>
                        <p style={{
                            maxWidth: '280px',
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            color: 'var(--text-secondary)',
                            marginBottom: '8px'
                        }}>
                            A modern discovery platform for independent SaaS founders and builders.
                        </p>
                        <p style={{
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                            lineHeight: '1.5'
                        }}>
                            Find your next tool. Launch your product.
                        </p>
                    </div>

                    {/* Platform Column */}
                    <div>
                        <h5 style={{
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.08em',
                            marginBottom: '24px',
                            fontWeight: '600'
                        }}>
                            Platform
                        </h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <Link to="/" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Home</Link>
                            <Link to="/dashboard/founder" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Dashboard</Link>
                            <Link to="/pricing" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Pricing</Link>
                            <Link to="/category/all" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Explore</Link>
                        </div>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h5 style={{
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.08em',
                            marginBottom: '24px',
                            fontWeight: '600'
                        }}>
                            Company
                        </h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <Link to="/about" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>About</Link>
                            <Link to="/contact" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Contact</Link>
                            <Link to="/blog" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Blog</Link>
                            <Link to="/changelog" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Changelog</Link>
                        </div>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h5 style={{
                            fontSize: '0.8rem',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)',
                            letterSpacing: '0.08em',
                            marginBottom: '24px',
                            fontWeight: '600'
                        }}>
                            Legal
                        </h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <Link to="/privacy" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Privacy Policy</Link>
                            <Link to="/terms" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Terms of Service</Link>
                            <Link to="/cookies" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Cookie Policy</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    textAlign: 'center',
                    paddingTop: '40px',
                    borderTop: '1px solid #E5E5E5',
                    color: '#999',
                    fontSize: '0.85rem'
                }}>
                    &copy; {new Date().getFullYear()} Foundry Inc. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
