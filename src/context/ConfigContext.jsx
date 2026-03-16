import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState({
        trackServerBaseUrl: import.meta.env.VITE_TRACK_SERVER_URL || null,
        popup: null,
        marquee: null
    });
    // Loading is effectively false for tracking purposes if we have the env var
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                // We use a direct fetch or axio for initial config.
                const configData = await api.get('/app/initial-config');

                if (configData) {
                    if (window.APP_DEBUG_MODE) {
                        console.groupCollapsed('[ConfigContext] Initial Config Loaded 🟢');
                        console.debug('Config Data:', configData);
                        console.groupEnd();
                    }
                    setConfig(configData);
                }
            } catch (err) {
                if (window.APP_DEBUG_MODE) {
                    console.error('[ConfigContext] Failed to load initial config', err);
                } else {
                    console.error('Failed to load initial config', err);
                }
                // Fallback? Or remain null?
                // Per instructions: "If config missing: trackServerBaseUrl = null"
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    // Helper to get track URL safely
    const getTrackUrl = (path) => {
        if (!config || !config.trackServerBaseUrl) return null;
        // Standardize: remove trailing slash from base, ensure leading slash on path
        const base = config.trackServerBaseUrl.replace(/\/$/, '');
        const endpoint = path.startsWith('/') ? path : `/${path}`;
        return `${base}${endpoint}`;
    };

    return (
        <ConfigContext.Provider value={{ config, loading, getTrackUrl }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);

export default ConfigContext;
