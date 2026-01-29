import React, { useState } from 'react';
import api from '../utils/api';

const PhoneMapper = ({ currentPhone, onUpdate }) => {
    // INDIA RESTRICTION: Pre-populate +91
    const [phone, setPhone] = useState(currentPhone || '+91 ');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(currentPhone ? 'VIEW' : 'INPUT'); // VIEW, INPUT, VERIFY
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            // Intent MAPPING enforces auth check on backend if we implemented it, 
            // but here we just send phone. 
            await api.post('/auth/send-phone-otp', { phone, intent: 'MAPPING' });
            setStep('VERIFY');
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
            const res = await api.post('/auth/verify-phone-mapping', { phone, otp });
            setSuccess('Phone number verified and linked!');
            setStep('VIEW');
            if (onUpdate) onUpdate(res.data.user);
        } catch (err) {
            setError(err.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setStep('INPUT');
        // Keep current phone or reset to +91 if none
        if (!currentPhone) setPhone('+91 ');
        setSuccess(null);
        setError(null);
    };

    if (step === 'VIEW') {
        return (
            <div style={{ padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#6B7280', marginBottom: '4px' }}>Linked Phone Number</label>
                        <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#111827' }}>{phone}</div>
                    </div>
                    {/* <button type="button" onClick={handleEdit} className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                        Change
                    </button> */}
                    {/* For now, maybe disable changing? Or allow it. Let's allow it. */}
                    <button type="button" onClick={handleEdit} className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                        Change
                    </button>
                </div>
                {success && <div style={{ marginTop: '10px', color: 'green', fontSize: '0.9rem' }}>{success}</div>}
            </div>
        );
    }

    return (
        <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '16px', fontSize: '1.1rem' }}>Phone Number Verification</h3>

            {error && <div style={{ marginBottom: '16px', color: '#EF4444', backgroundColor: '#FEF2F2', padding: '10px', borderRadius: '6px', fontSize: '0.9rem' }}>{error}</div>}

            {step === 'INPUT' ? (
                <form onSubmit={handleSendOTP}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '0.9rem' }}>Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 9876543210"
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E5E5E5' }}
                        />
                        <p style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '6px' }}>
                            We'll send a verification code to this number.
                        </p>
                    </div>
                    <div>
                        <button type="submit" className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`} disabled={loading}>
                            {loading ? 'Sending...' : 'Send Verification Code'}
                        </button>
                        {currentPhone && (
                            <button type="button" onClick={() => setStep('VIEW')} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            ) : (
                <form onSubmit={handleVerify}>
                    <div style={{ marginBottom: '16px' }}>
                        <div style={{ marginBottom: '12px', fontSize: '0.95rem' }}>
                            Code sent to <strong>{phone}</strong> <span onClick={() => setStep('INPUT')} style={{ color: 'blue', cursor: 'pointer', fontSize: '0.85rem', marginLeft: '8px' }}>(Change)</span>
                        </div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '0.9rem' }}>Enter OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="123456"
                            required
                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E5E5E5', letterSpacing: '2px' }}
                        />
                    </div>
                    <button type="submit" className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`} disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify & Save'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default PhoneMapper;
