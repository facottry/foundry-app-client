import React, { useState, useEffect } from 'react';
import { Copy, Check, X, Twitter, Linkedin, Share2 } from 'lucide-react';
import BRAND from '../config/brand';

const ShareProfileModal = ({ isOpen, onClose, user }) => {
    const [copied, setCopied] = useState(false);
    const profileUrl = `https://www.clicktory.in/founder/${user._id || user.id}`;

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(profileUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const handleShare = async (platform) => {
        const text = `Check out my profile on ${BRAND.name}`;

        if (platform === 'native') {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: `${user.name} on ${BRAND.name}`,
                        text: text,
                        url: profileUrl,
                    });
                } catch (err) {
                    // Fallback to copy if share fails or is cancelled
                    if (err.name !== 'AbortError') handleCopy();
                }
            } else {
                handleCopy();
            }
            return;
        }

        let url = '';
        switch (platform) {
            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(profileUrl)}`;
                break;
            case 'linkedin':
                url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;
                break;
            case 'whatsapp':
                url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + profileUrl)}`;
                break;
            default:
                break;
        }

        if (url) {
            window.open(url, '_blank', 'width=600,height=400');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            backdropFilter: 'blur(4px)'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '480px',
                position: 'relative',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }} onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                            <h2 style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                color: '#111827',
                                marginBottom: '4px',
                                letterSpacing: '-0.025em'
                            }}>
                                Share your public profile
                            </h2>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                                This is how others see you on {BRAND.name}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                padding: '8px',
                                borderRadius: '50%',
                                border: 'none',
                                background: '#f3f4f6',
                                color: '#4b5563',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
                            onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div style={{ padding: '24px' }}>
                    {/* Preview Card */}
                    <div style={{
                        background: 'linear-gradient(to bottom right, #ffffff, #f9fafb)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '16px',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '24px'
                    }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '50%',
                            background: '#E09F7D',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            flexShrink: 0,
                            border: '3px solid white',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}>
                            {user.name ? user.name.charAt(0).toUpperCase() : 'F'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h3 style={{
                                fontWeight: '700',
                                fontSize: '1.1rem',
                                color: '#111827',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {user.name || 'Founder'}
                            </h3>
                            <p style={{
                                color: '#6b7280',
                                fontSize: '0.9rem',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                Writer & Founder
                            </p>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                marginTop: '4px',
                                fontSize: '0.8rem',
                                color: '#D97757',
                                fontWeight: '500'
                            }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span>
                                {BRAND.name} Profile
                            </div>
                        </div>
                    </div>

                    {/* Copy Link Input */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '8px'
                        }}>
                            Profile Link
                        </label>
                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            background: '#f9fafb',
                            border: '1px solid #d1d5db',
                            borderRadius: '12px',
                            padding: '6px 6px 6px 16px',
                            alignItems: 'center'
                        }}>
                            <input
                                type="text"
                                readOnly
                                value={profileUrl}
                                style={{
                                    flex: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    color: '#4b5563',
                                    fontSize: '0.95rem',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            />
                            <button
                                onClick={handleCopy}
                                style={{
                                    background: copied ? '#10b981' : '#111827',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    transition: 'all 0.2s',
                                    minWidth: '100px',
                                    justifyContent: 'center'
                                }}
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                        {copied && (
                            <div style={{
                                marginTop: '8px',
                                fontSize: '0.875rem',
                                color: '#10b981',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                animation: 'fadeIn 0.2s'
                            }}>
                                <Check size={14} /> Link ready to share
                            </div>
                        )}
                    </div>

                    {/* Share Action Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                        <button
                            onClick={() => handleShare('whatsapp')}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '16px',
                                background: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = '#22c55e';
                                e.currentTarget.style.background = '#f0fdf4';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = '#e5e7eb';
                                e.currentTarget.style.background = 'white';
                            }}
                        >
                            <div style={{ color: '#22c55e' }}>
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                            </div>
                            <span style={{ fontSize: '0.85rem', fontWeight: '500', color: '#374151' }}>WhatsApp</span>
                        </button>

                        <button
                            onClick={() => handleShare('linkedin')}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '16px',
                                background: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = '#0a66c2';
                                e.currentTarget.style.background = '#f0f9ff';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = '#e5e7eb';
                                e.currentTarget.style.background = 'white';
                            }}
                        >
                            <Linkedin size={24} color="#0a66c2" fill="#0a66c2" strokeWidth={0} />
                            <span style={{ fontSize: '0.85rem', fontWeight: '500', color: '#374151' }}>LinkedIn</span>
                        </button>

                        <button
                            onClick={() => handleShare('twitter')}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '16px',
                                background: 'white',
                                border: '1px solid #e5e7eb',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'black';
                                e.currentTarget.style.background = '#f9fafb';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = '#e5e7eb';
                                e.currentTarget.style.background = 'white';
                            }}
                        >
                            <Twitter size={24} color="black" fill="black" strokeWidth={0} />
                            <span style={{ fontSize: '0.85rem', fontWeight: '500', color: '#374151' }}>X (Twitter)</span>
                        </button>
                    </div>

                    {/* Native Share Fallback */}
                    {navigator.share && (
                        <div style={{ marginTop: '16px', textAlign: 'center' }}>
                            <button
                                onClick={() => handleShare('native')}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#6b7280',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <Share2 size={14} /> More options...
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <style>
                {`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                `}
            </style>
        </div>
    );
};

export default ShareProfileModal;
