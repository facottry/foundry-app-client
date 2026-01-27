import React, { useState } from 'react';
import api from '../../../utils/api';

const PersonalInfoSection = ({ user, authToken, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: user.name || '',
        bio: user.bio || '',
        company_name: user.company_name || '',
        role_title: user.role_title || '',
        location: user.location || '',
        timezone: user.timezone || '',
        website: user.website || '',
        linkedin: user.linkedin || '',
        twitter: user.twitter || ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        try {
            const res = await api.put('/profile/me', formData);
            if (onUpdate) onUpdate(res.data.user);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error('Update failed:', err);
            alert('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const InputGroup = ({ label, name, type = 'text', placeholder }) => (
        <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>{label}</label>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    rows={4}
                    placeholder={placeholder}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db' }}
                />
            )}
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="card" style={{ padding: '32px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '1.25rem' }}>Personal Information</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <InputGroup label="Full Name" name="name" placeholder="Your name" />
                <InputGroup label="Role / Title" name="role_title" placeholder="e.g. CEO, Developer" />
            </div>

            <InputGroup label="Bio" name="bio" type="textarea" placeholder="Tell us a bit about yourself..." />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <InputGroup label="Company Name" name="company_name" placeholder="Company Inc." />
                <InputGroup label="Location" name="location" placeholder="City, Country" />
                <InputGroup label="Timezone" name="timezone" placeholder="e.g. EST" />
                <InputGroup label="Website" name="website" placeholder="https://" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <InputGroup label="LinkedIn URL" name="linkedin" placeholder="https://linkedin.com/in/..." />
                <InputGroup label="Twitter Handle" name="twitter" placeholder="@username" />
            </div>

            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
                {success && <span style={{ color: '#10b981', fontWeight: '500' }}>Changes saved!</span>}
            </div>
        </form>
    );
};

export default PersonalInfoSection;
