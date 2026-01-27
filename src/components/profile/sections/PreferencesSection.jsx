import React, { useState } from 'react';
import api from '../../../utils/api';

const PreferencesSection = ({ user }) => {
    const [prefs, setPrefs] = useState({
        email_notifications: user.preferences?.email_notifications ?? true,
        product_updates: user.preferences?.product_updates ?? true,
        weekly_digest: user.preferences?.weekly_digest ?? true
    });
    const [loading, setLoading] = useState(false);

    const handleToggle = async (key) => {
        const newValue = !prefs[key];
        const newPrefs = { ...prefs, [key]: newValue };
        setPrefs(newPrefs);

        try {
            await api.put('/profile/me/preferences', { ...newPrefs });
        } catch (err) {
            console.error('Failed to update preference', err);
            setPrefs(prefs); // Revert on error
        }
    };

    const Toggle = ({ label, desc, checked, onChange }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f3f4f6' }}>
            <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>{label}</div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{desc}</div>
            </div>
            <button
                type="button"
                onClick={onChange}
                style={{
                    width: '48px',
                    height: '24px',
                    borderRadius: '12px',
                    background: checked ? '#2563eb' : '#d1d5db',
                    position: 'relative',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '2px',
                    left: checked ? '26px' : '2px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'white',
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }} />
            </button>
        </div>
    );

    return (
        <div className="card" style={{ padding: '32px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '1.25rem' }}>Preferences</h3>

            <Toggle
                label="Email Notifications"
                desc="Receive essential updates about your account and activity."
                checked={prefs.email_notifications}
                onChange={() => handleToggle('email_notifications')}
            />
            <Toggle
                label="Product Updates"
                desc="Get notified when products you follow release updates."
                checked={prefs.product_updates}
                onChange={() => handleToggle('product_updates')}
            />
            <Toggle
                label="Weekly Digest"
                desc="A weekly summary of your stats and new listings."
                checked={prefs.weekly_digest}
                onChange={() => handleToggle('weekly_digest')}
            />
        </div>
    );
};

export default PreferencesSection;
