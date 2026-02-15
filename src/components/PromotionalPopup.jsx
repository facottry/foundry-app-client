import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useConfig } from '../context/ConfigContext';
// Using X icon from lucide-react if available, or simple SVG
import { X } from 'lucide-react';

const PromotionalPopup = () => {
    const [config, setConfig] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const { config: globalConfig, loading } = useConfig();

    useEffect(() => {
        if (loading || !globalConfig?.popup) return;

        const data = globalConfig.popup;
        if (!data.enabled) return;

        const lastShown = localStorage.getItem('promo_popup_last_shown');
        const now = Date.now();
        // Use nullish coalescing ?? so that 0 is treated as a valid value (0 hours = show every time)
        const frequencyMs = (data.frequencyHours ?? 24) * 60 * 60 * 1000;

        if (!lastShown || (now - parseInt(lastShown, 10) > frequencyMs)) {
            setConfig(data);
            setIsVisible(true);
        }
    }, [globalConfig, loading]);

    // Prevent background scrolling when popup is open
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isVisible]);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('promo_popup_last_shown', Date.now().toString());
    };

    if (!isVisible || !config) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 9999, // High z-index to cover everything
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'white',
                width: '100%',
                maxWidth: '800px', // or Configurable width?
                height: '80vh', // Large validation
                borderRadius: '8px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <button
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(255,255,255,0.8)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10
                    }}
                >
                    <X size={20} color="#333" />
                </button>

                {/* Content Area */}
                <div
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '0'
                    }}
                    dangerouslySetInnerHTML={{ __html: config.htmlContent }}
                />
            </div>
        </div>
    );
};

export default PromotionalPopup;
