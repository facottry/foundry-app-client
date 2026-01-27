import React from 'react';

const ProfileLayout = ({ activeTab, onTabChange, children }) => {
    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'personal', label: 'Personal Info', icon: '👤' },
        { id: 'account', label: 'Account', icon: '🔒' },
        { id: 'preferences', label: 'Preferences', icon: '⚙️' },
        { id: 'activity', label: 'Activity', icon: '🕒' },
        { id: 'founder', label: 'Founder Stats', icon: '🚀', role: 'FOUNDER' }, // Only show if founder
    ];

    return (
        <div className="profile-layout" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '32px', alignItems: 'start' }}>
            {/* Sidebar */}
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb', fontWeight: '600', color: '#111827' }}>
                    Profile Settings
                </div>
                <nav style={{ display: 'flex', flexDirection: 'column' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={activeTab === tab.id ? 'active' : ''}
                            style={{
                                display: tab.role && tab.role !== 'FOUNDER' ? 'none' : 'flex', // Logic handled in parent, but simple filter here
                                alignItems: 'center',
                                gap: '12px',
                                padding: '16px 20px',
                                background: activeTab === tab.id ? '#f3f4f6' : 'transparent',
                                border: 'none',
                                borderLeft: activeTab === tab.id ? '3px solid #2563eb' : '3px solid transparent',
                                textAlign: 'left',
                                fontSize: '0.95rem',
                                color: activeTab === tab.id ? '#1d4ed8' : '#4b5563',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content Area */}
            <div style={{ minHeight: '500px' }}>
                {children}
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .profile-layout {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ProfileLayout;
