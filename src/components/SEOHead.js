import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Head component for adding structured data and meta tags
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {Object} props.structuredData - Schema.org JSON-LD data
 */
const SEOHead = ({ title, description, structuredData }) => {
    const fullTitle = title ? `${title} | Foundry` : 'Foundry - Discovery Platform for Independent Builders';
    const defaultDescription = 'A modern discovery platform for independent SaaS founders and builders.';

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:type" content="website" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEOHead;
