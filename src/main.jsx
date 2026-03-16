import React from 'react';

import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// --- DEBUG MODE INITIALIZATION ---
try {
    const isDebugMode = localStorage.getItem('APP_DEBUG_MODE') === 'true';
    window.APP_DEBUG_MODE = isDebugMode;
    
    if (isDebugMode) {
        console.info('🛠️ APP_DEBUG_MODE is ENABLED. Verbose logging is ON.');
    } else {
        // Disable verbose logging if not in debug mode
        // Keep console.error, allow console.warn, but stub out debug/info/log/table/group etc.
        const noop = () => {};
        console.log = noop;
        console.info = noop;
        console.debug = noop;
        console.table = noop;
        console.group = noop;
        console.groupEnd = noop;
        console.groupCollapsed = noop;
    }
} catch (e) {
    // Failsafe if localStorage is blocked
    window.APP_DEBUG_MODE = false;
}
// ---------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
