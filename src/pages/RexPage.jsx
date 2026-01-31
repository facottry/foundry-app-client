import React, { useEffect } from 'react';
import { useBot } from '../context/BotContext';

const RexPage = () => {
    const { isBotReady } = useBot();

    useEffect(() => {
        // Attempt to mount the bot when this page loads
        const bot = window.clickyInstance;
        if (bot) {
            console.log('[RexPage] Mounting bot...');
            bot.mount();
            // Open it by default when visiting the page
            if (bot.open) bot.open();
        } else {
            // If bot not instance yet (rare if context loaded), BotContext retry logic might catch it 
            // OR we might need to trigger init? 
            // BotContext handles init on mount.
        }
    }, [isBotReady]);

    return (
        <div className="rex-page-container" style={{ padding: '20px', height: 'calc(100vh - 64px)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ marginBottom: '20px', color: '#1e1e2e' }}>REX Actions</h2>
            <div id="rex-widget-container" style={{
                position: 'relative',
                flex: 1, // Take remaining space
                width: '100%',
                minHeight: '0', // Critical for nested flex scrolling
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                overflow: 'hidden', // Contain the widget
                background: '#fff',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}></div>
        </div>
    );
};

export default RexPage;
