import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, LayoutDashboard, User } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';

const MobileBottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { openProfileSheet, isProfileSheetOpen } = useUI();
    const { user } = useAuth();

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const navItems = [
        {
            label: 'Home',
            icon: Home,
            path: '/',
            action: () => navigate('/')
        },
        {
            label: 'Search',
            icon: Search,
            path: '/search',
            action: () => navigate('/search')
        },
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            path: '/founder/dashboard',
            action: () => navigate(user && user.role === 'FOUNDER' ? '/founder/dashboard' : '/login')
        },
        {
            label: 'Profile',
            icon: User,
            path: '#profile',
            action: () => openProfileSheet(),
            active: isProfileSheetOpen
        }
    ];

    return (
        <div
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe"
            style={{
                // 2. Footer Gradient & 4. Temperature Alignment
                // - Warmer top edge (#F5F4F0) echoing header warmth but very light
                // - Micro-contrast at top (slightly darker than pure white)
                // - Fades to base off-white (#FAF9F6)
                background: 'linear-gradient(to bottom, #F5F4F0 0%, #FAF9F6 100%)',
                // 1. Top Separator remains (neutral anchor)
                borderTop: '1px solid rgba(0,0,0,0.06)',
                width: 'auto' // Prevent fixed positioning bleeding
            }}
        >
            <div className="flex justify-around items-center h-[60px]">
                {navItems.map((item) => {
                    const active = item.path === '#profile' ? isProfileSheetOpen : isActive(item.path);
                    const activeColor = 'var(--accent-primary)';
                    const inactiveColor = '#9ca3af';

                    return (
                        <button
                            key={item.label}
                            onClick={item.action}
                            className="flex flex-col items-center justify-center w-full h-full focus:outline-none touch-manipulation relative"
                            style={{
                                color: active ? activeColor : 'var(--text-secondary)'
                            }}
                        >
                            {/* 1. Active Tab "Home Base" */}
                            {active && (
                                <div style={{
                                    position: 'absolute',
                                    top: '6px',
                                    bottom: '6px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '64px',
                                    // Rounded rectangle, not pill
                                    borderRadius: '12px',
                                    backgroundColor: activeColor,
                                    // Opacity 6-8%
                                    opacity: 0.08,
                                    pointerEvents: 'none'
                                }} />
                            )}

                            <item.icon
                                size={24}
                                strokeWidth={active ? 2.5 : 2}
                                color={active ? activeColor : inactiveColor}
                                // 3. Tighten vertical rhythm: Pull label closer
                                // Removed marginBottom
                                style={{ display: 'block' }}
                            />
                            <span style={{
                                fontSize: '11px',
                                // 3. Tighten vertical rhythm: Reduced marginTop
                                marginTop: '2px',
                                fontWeight: '500',
                                letterSpacing: '0.01em',
                                // 3. Tighten line-height
                                lineHeight: '1.0',
                                color: active ? activeColor : inactiveColor
                            }}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileBottomNav;
