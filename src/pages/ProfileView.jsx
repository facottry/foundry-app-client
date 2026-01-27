import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getProfile } from '../utils/api';
import SEOHead from '../components/SEOHead';
import LoadingState from '../components/common/LoadingState';

import ProfileLayout from '../components/profile/ProfileLayout';
import OverviewSection from '../components/profile/sections/OverviewSection';
import PersonalInfoSection from '../components/profile/sections/PersonalInfoSection';
import AccountSection from '../components/profile/sections/AccountSection';
import PreferencesSection from '../components/profile/sections/PreferencesSection';
import ActivitySection from '../components/profile/sections/ActivitySection';
import SavedProductsSection from '../components/profile/sections/SavedProductsSection';
// Note: Security section is currently merged into Account or can be added separate.
// For now we map Security -> Account or a simple password change helper.

import { Link } from 'react-router-dom';

const ProfileView = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    // Handle hash navigation
    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
            const tab = location.hash.replace('#', '');
            if (['overview', 'personal', 'account', 'preferences', 'activity'].includes(tab)) {
                setActiveTab(tab);
            }
        }
    }, [location]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getProfile();
                setProfile(res.data.user);
                setStats(res.data.stats);
            } catch (err) {
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleProfileUpdate = (updatedUser) => {
        setProfile(updatedUser);
        updateUser(updatedUser);
    };

    if (loading) return <LoadingState />;
    if (!profile) return <div>Error loading profile</div>;

    const renderSection = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewSection user={profile} stats={stats} />;
            case 'personal':
                return <PersonalInfoSection user={profile} onUpdate={handleProfileUpdate} />;
            case 'account':
            case 'security': // Shared for now
                return <AccountSection user={profile} />;
            case 'preferences':
                return <PreferencesSection user={profile} />;
            case 'activity':
                return <ActivitySection />;
            case 'saved':
                return <SavedProductsSection />;
            case 'founder':
                // Redirect or show detailed stats
                return (
                    <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚀</div>
                        <h3>Founder Analytics</h3>
                        <p style={{ marginBottom: '24px', color: '#6b7280' }}>View detailed analytics for your products.</p>
                        <Link to="/founder/dashboard" className="btn btn-primary">Go to Founder Dashboard</Link>
                    </div>
                );
            default:
                return <OverviewSection user={profile} stats={stats} />;
        }
    };

    return (
        <div style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '1200px', margin: '0 auto' }}>
            <SEOHead title="Account Settings" />
            <h1 style={{ marginBottom: '32px' }}>Account Control Center</h1>

            <ProfileLayout activeTab={activeTab} onTabChange={setActiveTab}>
                {renderSection()}
            </ProfileLayout>
        </div>
    );
};

export default ProfileView;
