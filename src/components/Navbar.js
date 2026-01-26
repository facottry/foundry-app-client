import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SearchBox from './SearchBox';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav style={{
            background: 'white',
            borderBottom: '1px solid #E5E5E5',
            padding: '16px 0',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: '#1a1a1a' }}>
                    Foundry
                </Link>

                {/* Search Box */}
                <div style={{ flex: 1, maxWidth: '500px' }}>
                    <SearchBox />
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Link to="/category/all" style={{ textDecoration: 'none', color: '#666', fontWeight: '500' }}>
                        Browse
                    </Link>
                    {user ? (
                        <>
                            {user.role === 'FOUNDER' && <Link to="/dashboard/founder" style={{ textDecoration: 'none', color: '#666', fontWeight: '500' }}>Dashboard</Link>}
                            {user.role === 'CUSTOMER' && <Link to="/dashboard/customer" style={{ textDecoration: 'none', color: '#666', fontWeight: '500' }}>Dashboard</Link>}
                            <span onClick={handleLogout} style={{ cursor: 'pointer', fontWeight: '500', color: '#666' }}>Logout</span>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ textDecoration: 'none', color: '#666', fontWeight: '500' }}>Login</Link>
                            <Link to="/signup" className="btn btn-primary" style={{ padding: '8px 20px', textDecoration: 'none' }}>Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
