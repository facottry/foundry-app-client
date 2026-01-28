import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, canonical, jsonLd, type = 'Organization' }) => {
    const siteTitle = 'AppFoundry';
    const finalTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const finalDescription = description || 'Discover curated AI tools for startups, founders, and developers. Compare pricing, features, and use-cases.';

    // Default Organization Schema
    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "AppFoundry",
        "url": "https://appfoundry.vercel.app",
        "logo": "https://appfoundry.vercel.app/logo.png",
        "sameAs": [
            "https://twitter.com/appfoundry",
            "https://linkedin.com/company/appfoundry"
        ]
    };

    const finalSchema = jsonLd || orgSchema;

    return (
        <Helmet>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            {canonical && <link rel="canonical" href={`https://appfoundry.vercel.app${canonical}`} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type === 'SoftwareApplication' || type === 'Product' ? 'book' : 'website'} />
            <meta property="og:url" content={`https://appfoundry.vercel.app${canonical || ''}`} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content="https://appfoundry.vercel.app/og-image.png" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={`https://appfoundry.vercel.app${canonical || ''}`} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={finalDescription} />
            <meta property="twitter:image" content="https://appfoundry.vercel.app/og-image.png" />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(finalSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;
