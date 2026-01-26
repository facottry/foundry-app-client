/**
 * Generate SEO-friendly slug from text
 * Converts to kebab-case, removes stop words
 */
export const generateSlug = (text) => {
    if (!text) return '';

    const stopWords = ['a', 'an', 'the', 'of', 'for', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'from'];

    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .split(/\s+/) // Split by whitespace
        .filter(word => !stopWords.includes(word)) // Remove stop words
        .join('-') // Join with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Convert slug back to readable text
 */
export const slugToText = (slug) => {
    if (!slug) return '';

    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

/**
 * Validate slug format
 */
export const isValidSlug = (slug) => {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
};
