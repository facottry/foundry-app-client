import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);

    const openProfileSheet = () => setIsProfileSheetOpen(true);
    const closeProfileSheet = () => setIsProfileSheetOpen(false);
    const toggleProfileSheet = () => setIsProfileSheetOpen(prev => !prev);

    return (
        <UIContext.Provider value={{
            isProfileSheetOpen,
            openProfileSheet,
            closeProfileSheet,
            toggleProfileSheet
        }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
