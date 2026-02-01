/**
 * Brand Configuration
 * Single source of truth for customer-facing brand identity.
 * 
 * CRITICAL: Backend/internal systems still reference "Foundry".
 * This config is UI/presentation layer only.
 */

export const BRAND = {
    // Customer-facing brand name (used in all UI)
    publicName: "Clicktory",

    // Internal identifier (backend still uses this)
    internalName: "Foundry",

    // Tagline
    tagline: "Discover products. Decide faster.",

    // Domain
    domain: "clicktory.in",

    // Contact
    supportEmail: "support@clicktory.in",

    // Social links
    socialLinks: {
        twitter: "https://twitter.com/clicktory",
        linkedin: "https://linkedin.com/company/clicktory"
    },

    // Legal entity name (for terms, privacy)
    legalName: "Clicktory"
};

export default BRAND;
