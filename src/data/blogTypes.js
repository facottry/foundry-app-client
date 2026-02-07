/**
 * @typedef {Object} ImageBlock
 * @property {string} alt - Alt text for accessibility
 * @property {string} prompt - OpenAI image generation prompt
 * @property {string} mood - Visual mood descriptor
 * @property {'hero'|'inline'|'closing'} placement - Image placement type
 */

/**
 * @typedef {Object} Quote
 * @property {string} text - Quote content
 * @property {'insight'|'warning'|'reflection'} tone - Quote styling tone
 */

/**
 * @typedef {Object} SectionBlock
 * @property {string} heading - Section heading
 * @property {string[]} paragraphs - Array of paragraph strings (supports inline HTML for bold/italic)
 * @property {Quote} [quote] - Optional blockquote
 * @property {ImageBlock} [image] - Optional inline image
 */

/**
 * @typedef {Object} BlogV2
 * @property {string} id - UUID
 * @property {string} slug - URL slug
 * @property {Object} seo - SEO metadata
 * @property {string} seo.title
 * @property {string} seo.description
 * @property {string[]} seo.keywords
 * @property {string} [seo.canonical]
 * @property {Object} meta - Post metadata
 * @property {string} meta.publishedAt - ISO date string
 * @property {string} [meta.updatedAt] - ISO date string
 * @property {string} meta.readTime
 * @property {'en'} meta.language
 * @property {'educational'|'opinion'|'framework'|'contrarian'} meta.intent
 * @property {Object} author - Author reference
 * @property {'arun'|'manish'|'shobhit'|'vinod'} author.id
 * @property {string} author.voiceTagline - Shown under title
 * @property {Object} taxonomy - Content categorization
 * @property {string} taxonomy.primary - Primary category
 * @property {string[]} taxonomy.secondary - Secondary categories
 * @property {string[]} taxonomy.tags - Content tags
 * @property {Object} hero - Hero section
 * @property {string} hero.title
 * @property {string} hero.subtitle
 * @property {ImageBlock} hero.image
 * @property {SectionBlock[]} sections - Content sections
 * @property {Object} closing - Closing section
 * @property {string} closing.takeaway
 * @property {ImageBlock} closing.image
 * @property {Object} [internalLinks] - Related content links
 * @property {string[]} [internalLinks.products] - Product slugs
 * @property {string[]} [internalLinks.blogs] - Blog slugs
 * @property {string[]} [internalLinks.categories] - Category slugs
 */

export const BlogV2Schema = {
    // Schema reference for validation/documentation
    version: '2.0',
    model: 'BlogV2'
};
