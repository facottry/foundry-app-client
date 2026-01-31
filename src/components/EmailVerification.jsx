import React, { useState } from 'react';
import api from '../utils/api';

const EmailVerification = ({ user, onUpdate }) => {
    // If already verified, show simple verified state
    const [step, setStep] = useState(user.verified ? 'VERIFIED' : 'INIT'); // INIT, VERIFY, VERIFIED
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSendOTP = async (e) => {
        if (e) e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await api.post('/auth/send-verification-otp', {});
            setStep('VERIFY');
            setSuccess('Verification code sent to ' + user.email);
        } catch (err) {
            setError(err.message || 'Error sending OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await api.post('/auth/verify-email', { otp });
            setSuccess('Email verified successfully!');
            setStep('VERIFIED');
            // Optimistic update of local user object + parent callback
            if (onUpdate) {
                onUpdate({ ...user, verified: true });
            }
        } catch (err) {
            setError(err.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    if (step === 'VERIFIED') {
        return (
            <div style={{ padding: '20px', backgroundColor: '#F0FDF4', borderRadius: '8px', border: '1px solid #BBF7D0', marginTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#166534', marginBottom: '4px' }}>Email Status</label>
                        <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#15803D', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>Verified</span>
                            <span style={{ fontSize: '1.2rem' }}>✓</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', marginTop: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '1.1rem' }}>Email Verification</h3>

            {error && <div style={{ marginBottom: '16px', color: '#EF4444', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '6px', fontSize: '0.9rem' }}>{error}</div>}
            {success && <div style={{ marginBottom: '16px', color: '#15803D', backgroundColor: '#F0FDF4', padding: '10px', borderRadius: '6px', fontSize: '0.9rem' }}>{success}</div>}

            {step === 'INIT' ? (
                <div>
                    <p style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '16px' }}>
                        Your email <strong>{user.email}</strong> is currently unverified. Verify it to unlock all features.
                    </p>
                    <button
                        onClick={handleSendOTP}
                        className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Verify Now'}
                    </button>
                </div>
            ) : (
                <form onSubmit={handleVerify}>
                    <div style={{ marginBottom: '16px' }}>
                        <div style={{ marginBottom: '12px', fontSize: '0.95rem' }}>
                            Code sent to <strong>{user.email}</strong>
                        </div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '0.9rem' }}>Enter Verification Code</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="123456"
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E5E5E5', letterSpacing: '2px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`} disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify Email'}
                        </button>
                        <button type="button" onClick={() => setStep('INIT')} className="btn btn-secondary">
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EmailVerification;
