/**
 * BotSDKLoader - Dynamic SDK loader for Founder AI Bot
 * 
 * Per botvas.md:
 * - Only loads for eligible founders (role + credits + VAS enabled)
 * - Dynamically injects script (no static bundling)
 * - Fails silently if eligibility check fails
 * - Unloads immediately on disable
 * - Uses env variables for SDK and server URLs
 */

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

// Environment-driven URLs
const BOT_SDK_URL = import.meta.env.VITE_BOT_SDK_URL;
const BOT_SERVER_URL = import.meta.env.VITE_BOT_SERVER_URL;

const BotSDKLoader = () => {
    const { user } = useAuth();
    const [loaded, setLoaded] = useState(false);

    const checkEligibility = useCallback(async () => {
        // Only check for founders/admins
        if (!user || !['FOUNDER', 'ADMIN'].includes(user.role)) {
            return false;
        }

        // Must have SDK URL configured
        if (!BOT_SDK_URL || !BOT_SERVER_URL) {
            console.log('[BotSDK] Missing env configuration');
            return false;
        }

        try {
            const res = await api.get('/founder/botvos/eligibility');
            return res.data.botEligible === true;
        } catch (err) {
            console.log('[BotSDK] Eligibility check failed');
            return false;
        }
    }, [user]);

    const loadSDK = useCallback(() => {
        if (loaded || !BOT_SDK_URL) return;

        // Check if script already exists
        const existingScript = document.querySelector(`script[src="${BOT_SDK_URL}"]`);
        if (existingScript) {
            setLoaded(true);
            initBot();
            return;
        }

        // Inject script dynamically per botvas.md section 8
        const script = document.createElement('script');
        script.src = BOT_SDK_URL;
        script.async = true;
        script.onload = () => {
            console.log('[BotSDK] Script loaded from', BOT_SDK_URL);
            setLoaded(true);
            initBot();
        };
        script.onerror = () => {
            console.log('[BotSDK] Script failed to load');
        };
        document.body.appendChild(script);
    }, [loaded]);

    const initBot = () => {
        // Check for namespace per botvas.md
        if (typeof window.FoundryAI === 'undefined' && typeof window.Clicky === 'undefined') {
            console.log('[BotSDK] Namespace not found');
            return;
        }

        // Initialize with token and server URL
        const initFn = window.FoundryAI?.init || window.Clicky?.init;
        if (initFn) {
            initFn({
                token: localStorage.getItem('token'),
                serverUrl: BOT_SERVER_URL,
                mode: 'mini'
            });
            console.log('[BotSDK] Bot initialized with server:', BOT_SERVER_URL);
        }
    };

    const unloadBot = () => {
        if (!BOT_SDK_URL) return;

        // Remove script
        const script = document.querySelector(`script[src="${BOT_SDK_URL}"]`);
        if (script) {
            script.remove();
        }

        // Remove bot UI
        const botHost = document.getElementById('clicky-host');
        if (botHost) {
            botHost.remove();
        }

        setLoaded(false);
        console.log('[BotSDK] Bot unloaded');
    };

    useEffect(() => {
        const init = async () => {
            const isEligible = await checkEligibility();

            if (isEligible) {
                loadSDK();
            } else if (loaded) {
                unloadBot();
            }
        };

        init();
    }, [user, checkEligibility, loadSDK, loaded]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (loaded) {
                unloadBot();
            }
        };
    }, [loaded]);

    // No UI - this is a loader only
    return null;
};

export default BotSDKLoader;
