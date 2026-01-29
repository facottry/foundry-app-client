import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import AuthContext from '../context/AuthContext';

const LoginOTP = () => {
    const [method, setMethod] = useState('EMAIL'); // EMAIL, PHONE
    const [identifier, setIdentifier] = useState(''); // Email or Phone
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('INPUT'); // INPUT, OTP
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [warning, setWarning] = useState(null);
    const { loginWithOTP, loginWithPhone } = useContext(AuthContext);
    const navigate = useNavigate();

    // Reset state when switching methods
    const handleMethodChange = (newMethod) => {
        setMethod(newMethod);
        // INDIA RESTRICTION: Pre-populate +91 for phone
        if (newMethod === 'PHONE') {
            setIdentifier('+91 ');
        } else {
            setIdentifier('');
        }
        setOtp('');
        setStep('INPUT');
        setError(null);
        setWarning(null);
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError(null);
        setWarning(null);
        setLoading(true);
        try {
            if (method === 'EMAIL') {
                const res = await api.post('/auth/send-otp', { email: identifier });
                if (res.data?.warning === 'EMAIL_FAILED') {
                    setWarning('Email service is currently unavailable. Please use the Master OTP to login.');
                }
            } else {
                // PHONE
                await api.post('/auth/send-phone-otp', { phone: identifier, intent: 'LOGIN' });
            }
            setStep('OTP');
        } catch (err) {
            setError(err.message || `Error sending code to ${method.toLowerCase()}.`);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            let user;
            if (method === 'EMAIL') {
                user = await loginWithOTP(identifier, otp);
            } else {
                user = await loginWithPhone(identifier, otp);
            }

            if (user.role === 'FOUNDER') navigate('/founder/dashboard');
            else if (user.role === 'CUSTOMER') navigate('/dashboard/customer');
            else navigate('/change-password');
        } catch (err) {
            setError(err.message || 'Invalid verification code.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {step === 'INPUT' ? 'Login to your account' : `Code sent to ${identifier}`}
                    </p>
                </div>

                {/* Tabs */}
                {step === 'INPUT' && (
                    <div style={{ display: 'flex', marginBottom: '24px', borderBottom: '1px solid #E5E7EB' }}>
                        <button
                            onClick={() => handleMethodChange('EMAIL')}
                            style={{
                                flex: 1,
                                padding: '12px',
                                border: 'none',
                                background: 'transparent',
                                borderBottom: method === 'EMAIL' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                                color: method === 'EMAIL' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Email
                        </button>
                        <button
                            onClick={() => handleMethodChange('PHONE')}
                            style={{
                                flex: 1,
                                padding: '12px',
                                border: 'none',
                                background: 'transparent',
                                borderBottom: method === 'PHONE' ? '2px solid var(--accent-primary)' : '2px solid transparent',
                                color: method === 'PHONE' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Phone
                        </button>
                    </div>
                )}

                {error && (
                    <div style={{
                        backgroundColor: '#FEF2F2',
                        border: '1px solid #DC2626',
                        color: '#B91C1C',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                {warning && (
                    <div style={{
                        backgroundColor: '#FFFBEB',
                        border: '1px solid #D97706',
                        color: '#B45309',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '0.9rem'
                    }}>
                        <strong>Notice:</strong> {warning}
                    </div>
                )}

                {step === 'INPUT' ? (
                    <form onSubmit={handleSendOTP}>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '0.9rem' }}>
                                {method === 'EMAIL' ? 'Email Address' : 'Phone Number'}
                            </label>
                            <input
                                type={method === 'EMAIL' ? 'email' : 'tel'}
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder={method === 'EMAIL' ? 'name@company.com' : '+91 9876543210'}
                                required
                                style={{ width: '100%', boxSizing: 'border-box', padding: '12px', borderRadius: '8px', border: '1px solid #E5E5E5' }}
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}
                            style={{ width: '100%', padding: '14px' }}
                            disabled={loading}
                        >
                            {loading ? 'Sending Code...' : `Continue with ${method === 'EMAIL' ? 'Email' : 'Phone'}`}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '0.9rem' }}>Verification Code</label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="123456"
                                required
                                style={{ width: '100%', boxSizing: 'border-box', letterSpacing: '4px', textAlign: 'center', fontSize: '1.2rem', padding: '12px', borderRadius: '8px', border: '1px solid #E5E5E5' }}
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}
                            style={{ width: '100%', padding: '14px', marginBottom: '16px' }}
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Verify & Login'}
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ width: '100%', padding: '10px', border: 'none', background: 'transparent' }}
                            onClick={() => { setStep('INPUT'); setError(null); setWarning(null); }}
                            disabled={loading}
                        >
                            Back to {method === 'EMAIL' ? 'Email' : 'Phone'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginOTP;
