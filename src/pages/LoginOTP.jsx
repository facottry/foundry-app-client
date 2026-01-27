import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';

const LoginOTP = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const { loginWithOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const sendOTP = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            await api.post('/auth/send-otp', { email });
            setOtpSent(true);
            setSuccess('OTP sent to your email');
        } catch (err) {
            setError(err.response?.data?.msg || 'Error sending OTP');
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            const user = await loginWithOTP(email, otp);
            if (user.role === 'FOUNDER') navigate('/founder/dashboard');
            else if (user.role === 'CUSTOMER') navigate('/dashboard/customer');
            else navigate('/change-password'); // Default for other roles or forgot password flow
        } catch (err) {
            setError(err.response?.data?.msg || 'Invalid OTP');
        }
    };

    // Simple ErrorState component for demonstration, as it was not defined in the original code
    const ErrorState = ({ error }) => (
        <div style={{
            backgroundColor: '#FEE2E2',
            border: '1px solid #EF4444',
            borderRadius: '8px',
            padding: '16px',
            color: '#EF4444'
        }}>
            <strong>Error!</strong> {error}
        </div>
    );

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>{otpSent ? 'Enter OTP' : 'Login with OTP'}</h2>

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

            {!otpSent ? (
                <form onSubmit={sendOTP}>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send OTP</button>
                </form>
            ) : (
                <form onSubmit={onSubmit}>
                    <p>OTP sent to {email}</p>
                    <div style={{ marginBottom: '15px' }}>
                        <label>One Time Password</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Verify & Login</button>
                </form>
            )}
        </div>
    );
};

export default LoginOTP;
