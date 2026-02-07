import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBox from './SearchBox';
import ProfileDropdown from './ProfileDropdown';
import { useBot } from '../context/BotContext';
import BRAND from '../config/brand';
import { Home, Box, Layers, Tag, LayoutDashboard, Bookmark, LogOut, User } from 'lucide-react';

import ShareProfileModal from './ShareProfileModal';

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
    const location = useLocation(); // Hook to detect route changes
    const [isOpen, setIsOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    // Close mobile menu whenever the route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const handleLogout = () => {
        logout();
        setIsOpen(false); // Ensure menu closes on logout
        navigate('/');
    };

    // ... styles (navLinkStyle, mobileLinkStyle) kept same ...

    const navLinkStyle = {
        fontWeight: '600',
        color: '#FFFFFF', // Pure white for contrast
        fontSize: '1.05rem', // Larger font
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none',
        padding: '8px 12px',
        borderRadius: '8px',
        transition: 'background 0.2s ease',
        cursor: 'pointer'
    };

    const mobileLinkStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 0',
        color: 'var(--text-secondary)', // Keep mobile dark text on white bg
        fontWeight: '500',
        fontSize: '1rem',
        textDecoration: 'none',
        borderBottom: '1px solid rgba(0,0,0,0.04)'
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container" style={{ maxWidth: '100%', padding: '0 24px' }}>
                {/* LEFT: Logo + Brand + Nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Link to="/" className="navbar-brand" style={{ color: 'white', fontSize: '1.6rem' }}>
                            {BRAND.publicName}
                        </Link>
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="desktop-only" style={{ display: 'flex', gap: '16px', marginLeft: '12px' }}>
                        <Link to="/" style={navLinkStyle}>
                            <Home size={20} color="#38bdf8" strokeWidth={2.5} /> {/* Light Blue */}
                            Home
                        </Link>
                        <Link to="/product" style={navLinkStyle}>
                            <Box size={20} color="#c084fc" strokeWidth={2.5} /> {/* Purple */}
                            Product List
                        </Link>
                        <Link to="/collection" style={navLinkStyle}>
                            <Layers size={20} color="#fbbf24" strokeWidth={2.5} /> {/* Amber */}
                            Collections
                        </Link>
                        <Link to="/category" style={navLinkStyle}>
                            <Tag size={20} color="#4ade80" strokeWidth={2.5} /> {/* Green */}
                            Categories
                        </Link>
                    </div>
                </div>

                {/* CENTER: Search Box */}
                <div style={{ flex: 1, maxWidth: '600px', margin: '0 48px', display: 'flex', justifyContent: 'center' }} className="desktop-only">
                    <SearchBox />
                </div>

                {/* RIGHT: Actions + Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'flex-end' }}>
                    {/* Mobile Toggle */}
                    <button
                        className="navbar-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle navigation"
                        style={{ color: 'white' }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {isOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <line x1="3" y1="12" x2="21" y2="12"></line>}
                            {!isOpen && <line x1="3" y1="6" x2="21" y2="6"></line>}
                            {!isOpen && <line x1="3" y1="18" x2="21" y2="18"></line>}
                        </svg>
                    </button>

                    <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {user ? (
                            <>
                                {user.role === 'FOUNDER' && (
                                    <Link to="/founder/dashboard" style={navLinkStyle}>
                                        <LayoutDashboard size={20} color="#f472b6" strokeWidth={2.5} /> {/* Pink */}
                                        Dashboard
                                    </Link>
                                )}
                                <Link to="/saved" style={navLinkStyle}>
                                    <Bookmark size={20} color="#ffffff" strokeWidth={2.5} />
                                    Saved
                                </Link>

                                <div style={{ marginLeft: '12px' }}>
                                    <ProfileDropdown user={user} logout={handleLogout} />
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={{ fontWeight: '600', color: 'rgba(255,255,255,0.95)', fontSize: '1rem' }}>Login</Link>
                                <Link to="/signup" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '1rem', fontWeight: '600' }}>Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <SearchBox />
                    </div>

                    <Link to="/" style={mobileLinkStyle}>
                        <Home size={18} color="#38bdf8" /> Home
                    </Link>
                    <Link to="/product" style={mobileLinkStyle}>
                        <Box size={18} color="#c084fc" /> Product List
                    </Link>
                    <Link to="/collection" style={mobileLinkStyle}>
                        <Layers size={18} color="#fbbf24" /> Collections
                    </Link>
                    <Link to="/category" style={mobileLinkStyle}>
                        <Tag size={18} color="#4ade80" /> Categories
                    </Link>

                    {user ? (
                        <>
                            {user.role === 'FOUNDER' && (
                                <>
                                    <Link to="/founder/dashboard" style={mobileLinkStyle}>
                                        <LayoutDashboard size={18} color="#f472b6" /> Dashboard
                                    </Link>
                                    <div style={mobileLinkStyle}><REXLink /></div>
                                    <Link to={`/founder/${user._id || user.id}`} style={mobileLinkStyle}>
                                        <User size={18} /> Public Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsShareModalOpen(true);
                                            setIsOpen(false);
                                        }}
                                        style={{
                                            ...mobileLinkStyle,
                                            background: 'none',
                                            border: 'none', // Remove extra border
                                            cursor: 'pointer',
                                            color: 'var(--accent-primary)',
                                            width: '100%',
                                            textAlign: 'left'
                                        }}
                                    >
                                        Share Profile
                                    </button>
                                    <Link to="/founder/products" style={mobileLinkStyle}>My Products</Link>
                                </>
                            )}
                            <Link to="/saved" style={mobileLinkStyle}>
                                <Bookmark size={18} /> Saved
                            </Link>
                            <Link to="/profile" style={mobileLinkStyle}>Settings</Link>
                            <span onClick={handleLogout} style={{ ...mobileLinkStyle, cursor: 'pointer', color: 'var(--text-secondary)' }}>
                                <LogOut size={18} /> Logout
                            </span>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={mobileLinkStyle}>Login</Link>
                            <Link to="/signup" style={{ ...mobileLinkStyle, color: 'var(--accent-primary)', fontWeight: '700' }}>Sign Up</Link>
                        </>
                    )}
                </div>
            </div>

            {user && (
                <ShareProfileModal
                    isOpen={isShareModalOpen}
                    onClose={() => setIsShareModalOpen(false)}
                    user={user}
                />
            )}
        </nav>
    );
};

export default Navbar;
