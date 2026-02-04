import React, { createContext, useState, useEffect, useCallback, useContext, useRef } from 'react';
import { useAuth } from './AuthContext';
import api from '../utils/api';

const BotContext = createContext();

export const useBot = () => useContext(BotContext);

export const BotProvider = ({ children }) => {
    const { user } = useAuth();
    const [isBotReady, setIsBotReady] = useState(false);
    const [isEligible, setIsEligible] = useState(false);

    // State to hold dynamic config
    const [dynamicSdkUrl, setDynamicSdkUrl] = useState(null);
    const [dynamicServerUrl, setDynamicServerUrl] = useState(null);
    const [loaded, setLoaded] = useState(false);

    // Refs to track loading status to prevent double-execution
    const loadingRef = useRef(false);

    // Check eligibility and return config
    const checkEligibility = useCallback(async () => {
        if (!user || !['FOUNDER', 'ADMIN'].includes(user.role)) {
            return { eligible: false };
        }

        try {
            const res = await api.get('/founder/botvas/eligibility');
            return {
                eligible: res.data?.botEligible === true,
                sdkUrl: res.data?.sdkUrl,
                serverUrl: res.data?.serverUrl
            };
        } catch (err) {

            return { eligible: false };
        }
    }, [user]);

    // Initialize the bot instance
    const initBot = useCallback((serverUrlOverride) => {
        const finalServerUrl = serverUrlOverride || dynamicServerUrl;

        if (!finalServerUrl) {

            return;
        }

        // Check for namespace (Class)
        const BotClass = window.ClickyBot;

        if (!BotClass) {

            setTimeout(() => {
                const RetryBotClass = window.ClickyBot;
                if (RetryBotClass) {
                    try {
                        const botInstance = new RetryBotClass({
                            token: localStorage.getItem('token'),
                            serverUrl: finalServerUrl,
                            mode: 'full',
                            containerId: 'rex-widget-container'
                        });

                        // Store instance on window for debug or ref? 
                        // It attaches itself to DOM, so instance ref is mainly for toggle.
                        // We can attach it to window.clickyInstance for now or use a ref.
                        window.clickyInstance = botInstance;
                        const mounted = botInstance.mount(); // Explicit mount
                        if (mounted) { }
                        else console.warn('[BotSDK] Bot init success but mount deferred (Container missing)');

                        setIsBotReady(true); // Ready for interactions (like deferred mount)
                    } catch (e) {
                        console.error('[BotSDK] Init failed', e);
                    }
                } else {

                }
            }, 100);
            return;
        }

        try {
            const botInstance = new BotClass({
                token: localStorage.getItem('token'),
                serverUrl: finalServerUrl,
                mode: 'full',
                containerId: 'rex-widget-container'
            });
            window.clickyInstance = botInstance;
            const mounted = botInstance.mount(); // Explicit mount
            if (mounted) {
                // Mounted successfully
            } else {
                console.warn('[BotSDK] Bot init success but mount deferred (Container missing)');
            }

            setIsBotReady(true);
        } catch (e) {
            console.error('[BotSDK] Init failed', e);
        }
    }, [dynamicServerUrl]);

    // Load the script
    const loadSDK = useCallback((url, serverUrl, isRetry = false) => {
        if (!url) return;

        // Define fallback URL
        const FALLBACK_URL = 'https://foundry-bot-client.vercel.app/clickysdk.js';

        // Prevent duplicate loading of the SAME url
        if (document.querySelector(`script[src="${url}"]`)) {
            setLoaded(true);
            initBot(serverUrl);
            return;
        }


        const script = document.createElement('script');
        script.src = url;
        script.async = true;

        script.onload = () => {

            setLoaded(true);
            initBot(serverUrl);
        };

        script.onerror = () => {
            console.error('[BotSDK] Script failed to load:', url);

            // Remove the failed script tag to clean up
            script.remove();

            if (!isRetry && url !== FALLBACK_URL) {

                // Try fallback
                loadSDK(FALLBACK_URL, serverUrl, true);
            } else {
                console.error('[BotSDK] All SDK load attempts failed.');
            }
        };

        document.body.appendChild(script);
    }, [initBot]);

    const unloadBot = useCallback(() => {
        const url = dynamicSdkUrl;
        if (!url) return;

        const script = document.querySelector(`script[src="${url}"]`);
        if (script) script.remove();

        const botHost = document.getElementById('clicky-host');
        if (botHost) botHost.remove();

        setLoaded(false);
        setIsBotReady(false);
        loadingRef.current = false;

    }, [dynamicSdkUrl]);

    // Main Orchestration Effect
    useEffect(() => {
        let mounted = true;

        const run = async () => {
            if (loadingRef.current || loaded) return;

            loadingRef.current = true;
            const result = await checkEligibility();

            if (!mounted) return;

            setIsEligible(result.eligible);

            if (result.eligible) {
                // Prioritize API URL -> No Fallback
                const sdkUrl = result.sdkUrl;
                const serverUrl = result.serverUrl;

                setDynamicSdkUrl(sdkUrl);
                setDynamicServerUrl(serverUrl);

                if (sdkUrl && serverUrl) {
                    loadSDK(sdkUrl, serverUrl);
                } else {

                }
            } else {
                // Not eligible
                if (loaded) unloadBot();
            }
        };

        if (user) {
            run();
        }

        return () => {
            mounted = false;
        };
    }, [user]); // Run once per user change

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            // Optional: Unload on unmount? Or keep it persistent?
            // Usually keep it unless user logs out.
            // But if component unmounts (Nav/App shouldn't unmount often).
        };
    }, []);

    const toggleBot = () => {
        const bot = window.clickyInstance;
        if (bot) {
            if (bot.toggle) bot.toggle();
            else if (bot.open) bot.open();
        }
    };

    return (
        <BotContext.Provider value={{ isBotReady, isEligible, toggleBot }}>
            {children}
        </BotContext.Provider>
    );
};

export default BotContext;
