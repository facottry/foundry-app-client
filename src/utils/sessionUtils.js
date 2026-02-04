/**
 * Get or create session ID from cookie
 * Session ID persists for 7 days
 */
export const getOrCreateSessionId = () => {
    const COOKIE_NAME = 'clicktory_session_id';
    const EXPIRY_DAYS = 7;

    // Check if session ID exists in cookie
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === COOKIE_NAME) {
            return value;
        }
    }

    // Generate new session ID
    const sessionId = generateSessionId();

    // Set cookie with 7-day expiry
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + EXPIRY_DAYS);
    document.cookie = `${COOKIE_NAME}=${sessionId}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;

    return sessionId;
};

/**
 * Generate unique session ID
 */
const generateSessionId = () => {
    return 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
};
