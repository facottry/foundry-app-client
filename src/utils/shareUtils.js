
import BRAND from '../config/brand';

/**
 * Validates share data integrity.
 * @param {Object} data - { title, text, url }
 * @throws {Error} if data is invalid
 */
export const validateShareData = (data) => {
    if (!data) throw new Error("Share data is missing");
    if (!data.url) throw new Error("Share URL is required");
    // Ensure URL is valid
    try {
        new URL(data.url);
    } catch (e) {
        throw new Error("Invalid Share URL");
    }
};

/**
 * Generates platform-specific share URLs.
 * @param {string} platform - 'whatsapp' | 'linkedin' | 'twitter'
 * @param {Object} data - { title, text, url }
 * @returns {string} - The intent URL
 */
export const generateShareUrl = (platform, data) => {
    validateShareData(data);

    const { title, text, url } = data;
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text || '');
    const encodedTitle = encodeURIComponent(title || '');

    switch (platform) {
        case 'whatsapp':
            // WhatsApp: "Check this out... URL"
            // We combine text and url for WA as it only supports 'text' param
            const waText = encodeURIComponent(`${text ? text + ' ' : ''}${url}`);
            return `https://api.whatsapp.com/send?text=${waText}`;

        case 'linkedin':
            // LinkedIn: url param. Title/Summary are often ignored by modern LI sharing but we can try mini=true
            return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

        case 'twitter':
            // X/Twitter: text (includes title) + url
            const tweetText = encodeURIComponent(`${title ? title + '\n' : ''}${text || ''}`);
            return `https://twitter.com/intent/tweet?text=${tweetText}&url=${encodedUrl}`;

        default:
            throw new Error(`Unsupported platform: ${platform}`);
    }
};

/**
 * Triggers native share sheet if available.
 * @param {Object} data - { title, text, url }
 * @returns {Promise<boolean>} - true if shared successfully
 */
export const shareNative = async (data) => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: data.title,
                text: data.text,
                url: data.url
            });
            return true;
        } catch (err) {
            // AbortError is common if user cancels
            if (err.name !== 'AbortError') {
                console.warn('Native share failed:', err);
            }
            return false;
        }
    }
    return false;
};
