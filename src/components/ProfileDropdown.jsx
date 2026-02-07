import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ShareProfileModal from './ShareProfileModal';

const ProfileDropdown = ({ user, logout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="profile-dropdown-container" ref={dropdownRef} style={{ position: 'relative' }}>
            <div
                onClick={toggleDropdown}
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#E09F7D', // accent-secondary
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    border: '2px solid white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
            >
                {getInitials(user.name || user.email)}
            </div>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 12px)',
                    right: 0,
                    width: '280px',
                    backgroundColor: 'white',
                    borderRadius: '16px', // Google-style rounded
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    padding: '8px 0',
                    zIndex: 1000,
                    border: '1px solid rgba(0,0,0,0.05)',
                    transformOrigin: 'top right',
                    animation: 'scaleIn 0.1s ease-out'
                }}>
                    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <div style={{ fontWeight: '600', fontSize: '1rem', color: '#2C2C2C' }}>{user.name || 'Founder'}</div>
                        <div style={{ fontSize: '0.85rem', color: '#595959' }}>{user.email}</div>
                    </div>

                    <div style={{ height: '1px', backgroundColor: '#F0F0F0', margin: '4px 0' }}></div>

                    <Link
                        to={`/founder/${user._id || user.id}`}
                        onClick={() => setIsOpen(false)}
                        style={{ display: 'block', padding: '10px 20px', fontSize: '0.9rem', color: '#2C2C2C', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#F7F7F7'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                        Public Profile
                    </Link>

                    <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        style={{ display: 'block', padding: '10px 20px', fontSize: '0.9rem', color: '#2C2C2C', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#F7F7F7'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                        Settings
                    </Link>

                    <button
                        onClick={() => {
                            setIsShareModalOpen(true);
                            setIsOpen(false);
                        }}
                        style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            padding: '10px 20px',
                            fontSize: '0.9rem',
                            color: '#2C2C2C',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: 'inherit'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#F7F7F7'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                        Share Profile
                    </button>

                    <div style={{ height: '1px', backgroundColor: '#F0F0F0', margin: '4px 0' }}></div>

                    <div
                        onClick={handleLogout}
                        style={{
                            padding: '10px 20px',
                            fontSize: '0.9rem',
                            color: '#D93025',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#FFF0F0'} // Subtle red hover
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                        Logout
                    </div>
                </div>
            )}

            <ShareProfileModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                user={user}
            />
        </div>
    );
};

export default ProfileDropdown;
