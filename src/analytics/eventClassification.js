/**
 * Event Classification Configuration
 * 
 * Defines which events are sent to which analytics destinations.
 * This is the single source of truth for event routing.
 * 
 * Tiers:
 * - analytics: Internal/First-party analytics (future)
 * - ga: Google Analytics 4 (via GTM)
 */
export const EVENT_CLASSIFICATION = {
    // Product Interactions
    product_viewed: {
        analytics: true,
        ga: true,
    },
    product_followed: {
        analytics: true,
        ga: false, // GA noise control - only vital events
    },
    product_saved: {
        analytics: true,
        ga: true,
    },
    product_clicked: {
        analytics: true,
        ga: true,
    },

    // User Lifecycle
    signup_completed: {
        analytics: true,
        ga: true,
    },
    login_completed: {
        analytics: true,
        ga: true,
    },

    // Page Views (GA handles these automatically mostly, but for SPA we might want explicit control)
    page_viewed: {
        analytics: false,
        ga: true,
    },

    // System/Debug
    dashboard_loaded: {
        analytics: false,
        ga: false,
    },
};
