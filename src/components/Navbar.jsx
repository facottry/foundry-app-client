import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import SearchBox from './SearchBox';

const Navbar = () => {
    console.log('Navbar rendering...');
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-brand">
                    Foundry
                </Link>

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

                {/* Search Box - Visible on Desktop, Stacked on Mobile */}
                <div style={{ flex: 1, maxWidth: '500px', margin: '0 20px', display: isOpen ? 'none' : 'block' }} className="desktop-search">
                    <SearchBox />
                </div>

                <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
                    {/* Mobile Search - Only inside menu when active */}
                    {isOpen && (
                        <div style={{ marginBottom: '1rem' }}>
                            <SearchBox />
                        </div>
                    )}

                    <Link to="/category/all">Browse</Link>

                    {user ? (
                        <>
                            {user.role === 'FOUNDER' && <Link to="/dashboard/founder">Dashboard</Link>}
                            <Link to="/saved">Saved</Link>
                            <Link to="/profile">My Profile</Link>
                            <span onClick={handleLogout} style={{ cursor: 'pointer', marginLeft: '32px', fontWeight: '500', color: '#595959' }}>Logout</span>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup" className="btn btn-primary" style={{ marginLeft: '20px', color: '#fff' }}>Sign Up</Link>
                        </>
                    )}
                </div>
            </div >
        </nav >
    );
};

export default Navbar;
