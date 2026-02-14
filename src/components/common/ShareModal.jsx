
import React, { useState, useEffect } from 'react';
import { Copy, Check, X, Twitter, Linkedin, MessageCircle, Share2, Link as LinkIcon } from 'lucide-react';
import BRAND from '../../config/brand'; // Adjusted path
import { generateShareUrl, shareNative } from '../../utils/shareUtils';
import { getImageUrl } from '../../utils/getImageUrl';

/**
 * ShareModal
 * 
 * Generic modal for sharing content.
 * 
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {Object} data - { 
 *   title: string, 
 *   text: string, 
 *   url: string, 
 *   type: 'profile' | 'product', 
 *   imageUrl: string,
 *   subline: string
 * }
 */
const ShareModal = ({ isOpen, onClose, data }) => {
    const [copied, setCopied] = useState(false);
    const [isNativeAvailable, setIsNativeAvailable] = useState(false);

    useEffect(() => {
        setIsNativeAvailable(!!navigator.share);

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setCopied(false);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            setCopied(false);
        };
    }, [isOpen]);

    if (!isOpen || !data) return null;

    const brandName = BRAND.publicName || 'Clicktory'; // Fix for brand.name undefined

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(data.url);
            setCopied(true);

            // Fire tracking (fire and forget)
            // if (navigator.sendBeacon) navigator.sendBeacon('/api/share/track', JSON.stringify({ type: 'copy', url: data.url }));

            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const handleSocialShare = (platform) => {
        if (platform === 'native') {
            shareNative(data);
            return;
        }

        const shareUrl = generateShareUrl(platform, data);
        window.open(shareUrl, '_blank', 'width=600,height=400');

        // Track
        // if (navigator.sendBeacon) navigator.sendBeacon('/api/share/track', JSON.stringify({ type: platform, url: data.url }));
    };

    // Construct Preview
    const previewImage = data.imageUrl || null;
    const previewInitials = data.title ? data.title.charAt(0).toUpperCase() : '?';

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease-out'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '440px',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div style={{ padding: '24px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>Share</h2>
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
                            transition: 'background 0.2s'
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div style={{ padding: '24px' }}>

                    {/* Premium Preview Card */}
                    <div style={{
                        borderRadius: '16px',
                        border: '1px solid #e5e7eb',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '24px',
                        background: 'linear-gradient(to bottom right, #ffffff, #f9fafb)'
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '12px',
                            background: '#f3f4f6',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#9ca3af',
                            flexShrink: 0
                        }}>
                            {previewImage ? (
                                <img src={previewImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span>{previewInitials}</span>
                            )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '1rem', fontWeight: '700', color: '#111827', truncate: true }}>
                                {data.title}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></span>
                                {data.subline || `${brandName} Link`}
                            </div>
                        </div>
                    </div>

                    {/* Copy Link Section */}
                    <div style={{ marginBottom: '24px' }}>
                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            background: '#f9fafb',
                            border: '1px solid #d1d5db',
                            borderRadius: '12px',
                            padding: '8px 8px 8px 16px',
                            alignItems: 'center'
                        }}>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                                <LinkIcon size={16} className="text-gray-400" />
                                <span style={{
                                    fontSize: '0.9rem',
                                    color: '#4b5563',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {data.url}
                                </span>
                            </div>
                            <button
                                onClick={handleCopy}
                                style={{
                                    background: copied ? '#10b981' : '#111827',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    transition: 'all 0.2s',
                                    minWidth: '90px',
                                    justifyContent: 'center'
                                }}
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                    </div>

                    {/* Action Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: isNativeAvailable ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr', gap: '12px' }}>

                        <SocialButton
                            icon={<MessageCircle size={24} />}
                            label="WhatsApp"
                            color="#22c55e"
                            bgColor="#f0fdf4"
                            onClick={() => handleSocialShare('whatsapp')}
                        />

                        <SocialButton
                            icon={<Linkedin size={24} />}
                            label="LinkedIn"
                            color="#0a66c2"
                            bgColor="#f0f9ff"
                            onClick={() => handleSocialShare('linkedin')}
                        />

                        <SocialButton
                            icon={<Twitter size={24} />}
                            label="X"
                            color="#000000"
                            bgColor="#f9fafb"
                            onClick={() => handleSocialShare('twitter')}
                        />

                        {isNativeAvailable && (
                            <SocialButton
                                icon={<Share2 size={24} />}
                                label="More"
                                color="#6b7280"
                                bgColor="#f3f4f6"
                                onClick={() => handleSocialShare('native')}
                            />
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div style={{ background: '#f9fafb', padding: '12px', textAlign: 'center', borderTop: '1px solid #e5e7eb' }}>
                    <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>
                        Protected by {brandName}
                    </p>
                </div>
            </div>
            <style>
                {`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                `}
            </style>
        </div>
    );
};

const SocialButton = ({ icon, label, color, bgColor, onClick }) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 8px',
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            color: color
        }}
        onMouseEnter={e => {
            e.currentTarget.style.borderColor = color;
            e.currentTarget.style.background = bgColor;
        }}
        onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.background = 'white';
        }}
    >
        {icon}
        <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#374151' }}>{label}</span>
    </button>
);

export default ShareModal;
