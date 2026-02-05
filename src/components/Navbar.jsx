import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBox from './SearchBox';
import { useBot } from '../context/BotContext';
import BRAND from '../config/brand';

const REXLink = ({ onClick }) => {
    const { isEligible } = useBot();

    if (!isEligible) return null;

    return (
        <Link to="/founder/rex" onClick={onClick} style={{
            color: '#6366f1',
            fontWeight: '600',
            marginRight: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
        }}>
            REX
        </Link>
    );
};

const Navbar = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                {/* LEFT: Toggle + Brand + Desktop Nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                            className="navbar-toggle"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle navigation"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                {isOpen ? (
                                    <path d="M18 6L6 18M6 6l12 12" />
                                ) : (
                                    <line x1="3" y1="12" x2="21" y2="12"></line>
                                )}
                                {!isOpen && <line x1="3" y1="6" x2="21" y2="6"></line>}
                                {!isOpen && <line x1="3" y1="18" x2="21" y2="18"></line>}
                            </svg>
                        </button>

                        <Link to="/" className="navbar-brand">
                            {BRAND.publicName}
                        </Link>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="desktop-only" style={{ display: 'flex', gap: '24px', marginLeft: '12px' }}>
                        <Link to="/" style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>Home</Link>
                        <Link to="/category/all" style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>Browse</Link>
                    </div>
                </div>

                {/* RIGHT: Search + Auth */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1, justifyContent: 'flex-end', marginLeft: '24px' }}>

                    {/* Search Box (Desktop) - Pushed to right but before auth */}
                    <div className="desktop-search" style={{ flex: 1, maxWidth: '400px', display: isOpen ? 'none' : 'block' }}>
                        <SearchBox />
                    </div>

                    {/* Desktop Auth Links */}
                    <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '20px', whiteSpace: 'nowrap' }}>
                        {user ? (
                            <>
                                {user.role === 'FOUNDER' && (
                                    <>
                                        <Link to="/founder/dashboard" style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>Dashboard</Link>
                                        <REXLink />
                                    </>
                                )}
                                <Link to="/saved" style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>Saved</Link>
                                <Link to="/profile" style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>My Profile</Link>
                                <span onClick={handleLogout} style={{ cursor: 'pointer', fontWeight: '500', color: 'var(--text-muted)' }}>Logout</span>
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>Login</Link>
                                <Link to="/signup" className="btn btn-primary" style={{ color: '#fff', padding: '8px 20px', fontSize: '0.9rem' }}>Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <SearchBox />
                    </div>

                    <Link to="/">Home</Link>
                    <Link to="/category/all">Browse</Link>

                    {user ? (
                        <>
                            {user.role === 'FOUNDER' && (
                                <>
                                    <Link to="/founder/dashboard">Dashboard</Link>
                                    <REXLink />
                                    <Link to="/founder/products">My Products</Link>
                                </>
                            )}
                            <Link to="/saved">Saved</Link>
                            <Link to="/profile">My Profile</Link>
                            <span onClick={handleLogout} style={{ cursor: 'pointer', padding: '12px 0', display: 'block', color: 'var(--text-secondary)' }}>Logout</span>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup" style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>Sign Up</Link>
                        </>
                    )}
                </div>
            </div >
        </nav >
    );
};

export default Navbar;
