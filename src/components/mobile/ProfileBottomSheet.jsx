import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { BRAND } from '../../config/brand';

import {
    User as UserIcon,
    Share2,
    Box,
    Bookmark,
    Settings,
    LogOut,
    CreditCard,
    FileText,
    Info,
    Mail,
    Github,
    Linkedin,
    Twitter
} from 'lucide-react';
// ...
const ProfileBottomSheet = () => {
    const { isProfileSheetOpen, closeProfileSheet } = useUI();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Auto-close on navigation
    React.useEffect(() => {
        if (isProfileSheetOpen) {
            closeProfileSheet();
        }
    }, [location.pathname]);

    // Enforce Modal-Grade Scroll Locking
    useScrollLock(isProfileSheetOpen);

    // Swipe down handler could be added with specialized libraries, 
    // but for now we'll use a drag constraint on framer-motion or simple overlay click.

    if (!isProfileSheetOpen) return null;

    const handleNavigation = (path) => {
        closeProfileSheet();
        navigate(path);
    };

    const handleLogout = () => {
        logout();
        closeProfileSheet();
        navigate('/');
    };

    const LoadingAuth = () => (
        <div className="p-6 text-center">
            <p className="text-gray-500">Please log in to access your profile.</p>
            <button
                onClick={() => handleNavigation('/login')}
                className="mt-4 px-6 py-2 bg-black text-white rounded-lg font-medium w-full"
            >
                Login / Sign Up
            </button>
        </div>
    );

    const MenuItem = ({ icon: Icon, label, onClick, isMeta = false }) => (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-4 py-3.5 px-1 active:bg-gray-50 transition-colors text-left"
            style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}
        >
            <div className={`p-2 rounded-lg ${isMeta ? 'bg-gray-50' : 'bg-gray-100'}`}>
                <Icon size={isMeta ? 18 : 20} className={isMeta ? "text-gray-500" : "text-gray-800"} />
            </div>
            <span className={`flex-1 ${isMeta ? 'text-gray-600 font-normal text-[15px]' : 'text-gray-900 font-medium text-[16px]'}`}>
                {label}
            </span>
        </button>
    );

    return (
        <AnimatePresence>
            {isProfileSheetOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeProfileSheet}
                        className="fixed inset-0 bg-black/40 z-[1040] md:hidden backdrop-blur-sm"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] z-[1050] md:hidden overflow-hidden flex flex-col max-h-[90vh]"
                        style={{
                            boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
                            width: 'auto' // Prevent fixed positioning bleeding
                        }}
                    >
                        {/* Drag Handle */}
                        <div className="w-full flex justify-center pt-3 pb-1" onClick={closeProfileSheet}>
                            <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
                        </div>

                        <div className="overflow-y-auto p-5 pb-safe">

                            {/* Header / User Info */}
                            {user ? (
                                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                                    <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                        {user.avatar_url ? (
                                            <img src={user.avatar_url} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                                                <UserIcon size={24} />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 leading-tight">{user.name}</h3>
                                        <p className="text-sm text-gray-500">@{user.slug || user.name.toLowerCase().replace(/\s+/g, '')}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-6">
                                    <h2 className="text-xl font-bold mb-2">Welcome</h2>
                                    <LoadingAuth />
                                </div>
                            )}

                            {user && (
                                <div className="space-y-1 mb-8">
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">Account</h4>

                                    {user.role === 'FOUNDER' && (
                                        <>
                                            <MenuItem icon={UserIcon} label="Public Profile" onClick={() => handleNavigation(`/founder/${user.id}`)} />
                                            <MenuItem icon={Share2} label="Share Profile" onClick={() => {
                                                // Trigger share modal logic if accessible, or navigate to share view
                                                // For now navigate to profile
                                                handleNavigation(`/founder/${user.id}`);
                                            }} />
                                            <MenuItem icon={Box} label="My Products" onClick={() => handleNavigation('/founder/products')} />
                                        </>
                                    )}

                                    <MenuItem icon={Bookmark} label="Saved" onClick={() => handleNavigation('/saved')} />
                                    <MenuItem icon={Settings} label="Settings" onClick={() => handleNavigation('/profile')} />
                                    <MenuItem icon={LogOut} label="Logout" onClick={handleLogout} />
                                </div>
                            )}

                            {/* Platform Section (Old Footer) */}
                            <div className="space-y-1">
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">Platform</h4>
                                <MenuItem icon={CreditCard} label="Plans & Pricing" onClick={() => handleNavigation('/pricing')} isMeta />
                                <MenuItem icon={FileText} label="Blog" onClick={() => handleNavigation('/blog')} isMeta />
                                <MenuItem icon={Info} label="About & Mission" onClick={() => handleNavigation('/about')} isMeta />
                                <MenuItem icon={Mail} label="Newsletter" onClick={() => handleNavigation('/newsletter')} isMeta />
                            </div>

                            {/* Socials */}
                            <div className="mt-8 pt-6 border-t border-gray-100 flex gap-6 justify-center">
                                {BRAND.socialLinks.github && (
                                    <a href={BRAND.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                                        <Github size={22} />
                                    </a>
                                )}
                                {BRAND.socialLinks.linkedin && (
                                    <a href={BRAND.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                                        <Linkedin size={22} />
                                    </a>
                                )}
                                {BRAND.socialLinks.twitter && (
                                    <a href={BRAND.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                                        <Twitter size={22} />
                                    </a>
                                )}
                            </div>

                            <p className="text-center text-xs text-gray-300 mt-6">
                                v{window.__APP_VERSION__ || '1.0.0'}
                            </p>

                            {/* Extra safe area spacer */}
                            <div className="h-8" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProfileBottomSheet;
