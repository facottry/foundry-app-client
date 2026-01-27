import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';

const AccountSection = ({ user }) => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="card" style={{ padding: '32px' }}>
                <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '1.25rem' }}>Account Details</h3>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#6b7280', fontSize: '0.9rem' }}>Email Address</label>
                    <div style={{ fontWeight: '500' }}>{user.email}</div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#6b7280', fontSize: '0.9rem' }}>User Role</label>
                    <div style={{ display: 'inline-block', padding: '4px 12px', background: '#f3f4f6', borderRadius: '4px', fontWeight: '500', fontSize: '0.9rem' }}>{user.role}</div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#6b7280', fontSize: '0.9rem' }}>User ID</label>
                    <div style={{ fontFamily: 'monospace', background: '#f9fafb', padding: '8px', borderRadius: '4px', display: 'inline-block' }}>{user._id}</div>
                </div>

                <button onClick={handleLogout} className="btn" style={{ border: '1px solid #ef4444', color: '#ef4444', background: 'white' }}>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default AccountSection;
