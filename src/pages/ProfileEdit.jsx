import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getProfile, updateProfile } from '../utils/api';
import ImageUploader from '../components/common/ImageUploader';
import SEOHead from '../components/SEOHead';
import LoadingState from '../components/common/LoadingState';
import PhoneMapper from '../components/PhoneMapper';

const ProfileEdit = ({ isEmbedded = false }) => {
    const { updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        avatar_url: '',
        bio: '',
        company_name: '',
        role_title: '',
        location: '',
        website: '',
        twitter: '',
        linkedin: '',
        timezone: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getProfile();
                // Merge fetched data with state, handling nulls
                const p = res.data.user;
                setFormData({
                    name: p.name || '',
                    avatar_url: p.avatar_url || '',
                    bio: p.bio || '',
                    company_name: p.company_name || '',
                    role_title: p.role_title || '',
                    location: p.location || '',
                    website: p.website || '',
                    twitter: p.twitter || '',
                    linkedin: p.linkedin || '',
                    timezone: p.timezone || '',
                    phone: p.phone || ''
                });
            } catch (err) {
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await updateProfile(formData);
            updateUser(res.data.user); // Update context
            if (!isEmbedded) navigate('/profile');
            // If embedded, maybe show toast? For now just stay on page.
        } catch (err) {
            console.error('Error updating profile:', err);
            // Could add toast notification here
        } finally {
            setSaving(false);
        }
    };

    const formGroupStyle = { marginBottom: '20px' };
    const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '0.9rem' };
    const inputStyle = { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)' };

    if (loading) return <LoadingState />;

    return (
        <div style={isEmbedded ? {} : { paddingTop: '40px', paddingBottom: '80px', maxWidth: '600px', margin: '0 auto' }}>
            <SEOHead title="Edit Profile" />

            {!isEmbedded && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '2rem', margin: 0 }}>Edit Profile</h1>
                    <button
                        type="button"
                        onClick={() => navigate('/profile')}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="card">
                {/* Basic Info */}
                <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>Basic Info</h3>

                <div style={formGroupStyle}>
                    <label style={labelStyle}>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={formGroupStyle}>
                    <label style={labelStyle}>Profile Picture</label>
                    <ImageUploader
                        label="Avatar"
                        type="avatar"
                        currentUrl={formData.avatar_url}
                        onUpload={(result) => {
                            const url = result.url || result;
                            const key = result.key;
                            setFormData({
                                ...formData,
                                avatar_url: url,
                                profileImageKey: key
                            });
                        }}
                    />
                </div>

                <div style={formGroupStyle}>
                    <label style={labelStyle}>Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Tell us about yourself..."
                        style={{ ...inputStyle, fontFamily: 'inherit' }}
                    />
                </div>

                {/* Professional Info */}
                <h3 style={{ marginBottom: '20px', marginTop: '30px', fontSize: '1.2rem', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>Professional Details</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Role/Job Title</label>
                        <input
                            type="text"
                            name="role_title"
                            value={formData.role_title}
                            onChange={handleChange}
                            placeholder="e.g. Founder, CEO"
                            style={inputStyle}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Company Name</label>
                        <input
                            type="text"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={formGroupStyle}>
                    <label style={labelStyle}>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. San Francisco, CA"
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Timezone</label>
                    <input
                        type="text"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        placeholder="e.g. UTC-8"
                        style={inputStyle}
                    />
                </div>

                {/* Account Security / Phone */}
                <h3 style={{ marginBottom: '20px', marginTop: '30px', fontSize: '1.2rem', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>Account Security</h3>
                <PhoneMapper
                    currentPhone={formData.phone}
                    onUpdate={(updatedUser) => {
                        setFormData({ ...formData, phone: updatedUser.phone });
                        updateUser(updatedUser);
                    }}
                />

                {/* Social Links */}
                <h3 style={{ marginBottom: '20px', marginTop: '30px', fontSize: '1.2rem', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>Social Links</h3>

                <div style={formGroupStyle}>
                    <label style={labelStyle}>Website / Portfolio</label>
                    <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://"
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>Twitter Handle</label>
                        <input
                            type="text"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleChange}
                            placeholder="@username"
                            style={inputStyle}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>LinkedIn URL</label>
                        <input
                            type="url"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/..."
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
                    <button
                        type="submit"
                        className={`btn btn-primary ${saving ? 'btn-disabled' : ''}`}
                        disabled={saving}
                        style={{ flex: 1 }}
                    >
                        {saving ? 'Saving...' : 'Save Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEdit;
