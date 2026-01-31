import React, { useState } from 'react';
import api from '../../utils/api';

// Helper to extract domain for display guidance
const getDomain = (url) => {
    try {
        let domain = url.toLowerCase().trim();
        if (!domain.startsWith('http')) domain = 'http://' + domain;
        const hostname = new URL(domain).hostname;
        return hostname.startsWith('www.') ? hostname.substring(4) : hostname;
    } catch (e) {
        return url;
    }
};

const ProductVerificationModal = ({ product, onClose, onSuccess }) => {
    const [step, setStep] = useState('INIT'); // INIT, OTP, SUCCESS
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const domain = getDomain(product.website_url);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // Client-side domain check (soft check)
        const emailDomain = email.split('@')[1];
        if (emailDomain && emailDomain.toLowerCase() !== domain) {
            setError(`Email must end with @${domain}`);
            setLoading(false);
            return;
        }

        try {
            await api.post(`/products/${product._id}/verify/init`, { email });
            setStep('OTP');
        } catch (err) {
            setError(err.message || 'Failed to send verification code');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await api.post(`/products/${product._id}/verify/confirm`, { otp });
            setStep('SUCCESS');
            if (onSuccess) onSuccess(product._id);
        } catch (err) {
            setError(err.message || 'Invalid code');
        } finally {
            setLoading(false);
        }
    };

    if (step === 'SUCCESS') {
        return (
            <div className="modal-overlay">
                <div className="modal-content" style={{ textAlign: 'center', padding: '40px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
                    <h2 style={{ marginBottom: '16px', color: '#166534' }}>Verification Complete!</h2>
                    <p style={{ color: '#6B7280', marginBottom: '24px' }}>
                        <strong>{product.name}</strong> is now a verified product.
                        This increases trust and visibility.
                    </p>
                    <button onClick={onClose} className="btn btn-primary">
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '450px' }}>
                <div className="modal-header">
                    <h3>Verify Domain Ownership</h3>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>

                <div className="modal-body">
                    <div style={{ background: '#F9FAFB', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', color: '#4B5563' }}>
                        To verify <strong>{product.name}</strong>, you must prove ownership of the domain:
                        <div style={{ fontWeight: 'bold', color: '#111827', marginTop: '4px' }}>{domain}</div>
                    </div>

                    {error && <div className="error-message" style={{ marginBottom: '16px', color: '#EF4444', background: '#FEF2F2', padding: '10px', borderRadius: '6px' }}>{error}</div>}

                    {step === 'INIT' ? (
                        <form onSubmit={handleSendOTP}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Domain Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={`name@${domain}`}
                                    required
                                    className="form-control"
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                                />
                                <p style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '6px' }}>
                                    Enter any valid email address ending in <strong>@{domain}</strong>.
                                    We will send a one-time code to this address.
                                </p>
                            </div>
                            <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                                <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Sending...' : 'Send Code'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleVerify}>
                            <div className="form-group">
                                <div style={{ marginBottom: '12px', fontSize: '0.9rem' }}>
                                    Code sent to <strong>{email}</strong>
                                    <button type="button" onClick={() => setStep('INIT')} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', marginLeft: '6px', fontSize: '0.8rem' }}>(Change)</button>
                                </div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Verification Code</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="123456"
                                    required
                                    className="form-control"
                                    style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', letterSpacing: '2px', fontSize: '1.2rem', textAlign: 'center' }}
                                />
                            </div>
                            <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                                <button type="button" onClick={() => setStep('INIT')} className="btn btn-secondary">Back</button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Verifying...' : 'Verify Product'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <style>{`
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .modal-content {
                    background: white;
                    padding: 24px;
                    borderRadius: 12px;
                    width: 90%;
                    max-width: 500px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .modal-header h3 {
                    margin: 0;
                    font-size: 1.25rem;
                }
                .close-btn {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #6B7280;
                }
            `}</style>
        </div>
    );
};

export default ProductVerificationModal;
