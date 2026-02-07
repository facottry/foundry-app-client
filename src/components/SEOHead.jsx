import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Head component for adding structured data and meta tags
 */
const SEOHead = ({
    title,
    description,
    canonical,
    keywords,
    ogImage,
    structuredData
}) => {
    const fullTitle = title ? `${title} | Clicktory` : 'Clicktory - Discovery Platform for Independent Builders';
    const defaultDescription = 'A modern discovery platform for independent SaaS founders and builders.';
    const siteUrl = 'https://www.clicktory.in';
    const fullUrl = canonical ? `${siteUrl}${canonical}` : `${siteUrl}${window.location.pathname}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            {ogImage && <meta property="og:image" content={ogImage} />}

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            {ogImage && <meta name="twitter:image" content={ogImage} />}

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
