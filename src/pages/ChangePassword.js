import React, { useState } from 'react';
import api from '../utils/api';
import ErrorState from '../components/common/ErrorState';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            await api.post('/auth/change-password', { password });
            setSuccess('Password updated successfully!');
            setPassword('');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Change Password</h2>

            {success && (
                <div style={{
                    backgroundColor: '#E6F4EA',
                    border: '1px solid #A8D5BA',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '20px',
                    color: '#1E6F3E'
                }}>
                    <strong>Success!</strong> {success}
                </div>
            )}

            {error && <div style={{ marginBottom: '20px' }}><ErrorState error={error} /></div>}

            <form onSubmit={onSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>New Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Update Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
