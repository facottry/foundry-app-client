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
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    // Close mobile menu whenever the route changes
    useEffect(() => {
        // setIsOpen(false); // No longer needed
    }, [location]);

    const handleLogout = () => {
        logout();
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'flex-end', marginLeft: 'auto' }}>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {user ? (
                            <>
                                <div className="hidden md:flex items-center gap-4">
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
                                </div>
                                {/* Mobile: Only showing Profile Avatar here might be redundant if we have bottom nav, 
                                    but good for consistent branding. Or we can hide actions on mobile top bar entirely.
                                    PRD says "Bottom App Navigation... Hidden on desktop".
                                    Let's keep the Navbar clean on mobile - maybe just Logo.
                                */}
                                <div className="md:hidden">
                                    {/* Intentionally Empty or minimal actions if needed */}
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" style={{ fontWeight: '600', color: 'rgba(255,255,255,0.95)', fontSize: '1rem', whiteSpace: 'nowrap' }} className="hidden md:block">Login</Link>
                                <Link to="/signup" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.95rem', fontWeight: '600', whiteSpace: 'nowrap' }}>Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Dropdown REMOVED - Using Bottom Nav */}
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
