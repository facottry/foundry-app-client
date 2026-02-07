import React from 'react';
import { Helmet } from 'react-helmet-async';
import BRAND from '../config/brand';

const SEO = ({ title, description, canonical, jsonLd, type = 'Organization', noindex = false }) => {
    const siteTitle = BRAND.publicName;
    const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const finalDescription = description || `${BRAND.tagline} Discover, compare, and evaluate startup products.`;

    // Default Organization Schema
    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": BRAND.publicName,
        "url": `https://${BRAND.domain}`,
        "logo": `https://${BRAND.domain}/logo.png`,
        "sameAs": [
            BRAND.socialLinks.twitter,
            BRAND.socialLinks.linkedin
        ]
    };

    const finalSchema = jsonLd || orgSchema;

    return (
        <Helmet>
            <title>{finalTitle}</title>
            {noindex && <meta name="robots" content="noindex,follow" />}
            {!noindex && <meta name="description" content={finalDescription} />}
            <link rel="canonical" href={`https://${BRAND.domain}${canonical || window.location.pathname}`} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type === 'SoftwareApplication' || type === 'Product' ? 'book' : 'website'} />
            <meta property="og:url" content={`https://${BRAND.domain}${canonical || window.location.pathname}`} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={`https://${BRAND.domain}/og-image.png`} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={`https://${BRAND.domain}${canonical || window.location.pathname}`} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={finalDescription} />
            <meta property="twitter:image" content={`https://${BRAND.domain}/og-image.png`} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(finalSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;
