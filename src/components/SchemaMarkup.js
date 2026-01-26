import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SoftwareApplication Schema for Product Pages
 */
export const SoftwareApplicationSchema = ({ product }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": product.name,
        "description": product.description || product.tagline,
        "url": `${window.location.origin}/product/${product._id}`,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    if (product.logo_url) {
        schema.image = product.logo_url;
    }

    if (product.avg_rating > 0) {
        schema.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": product.avg_rating,
            "ratingCount": product.ratings_count
        };
    }

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

/**
 * BreadcrumbList Schema
 */
export const BreadcrumbListSchema = ({ items }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": item.href ? `${window.location.origin}${item.href}` : undefined
        }))
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

/**
 * CollectionPage Schema for Category/Tag Pages
 */
export const CollectionPageSchema = ({ name, description, url }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": name,
        "description": description,
        "url": url
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

/**
 * Organization Schema for Homepage
 */
export const OrganizationSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Foundry",
        "url": window.location.origin,
        "logo": `${window.location.origin}/logo.png`,
        "description": "Performance-based product discovery platform"
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

export default {
    SoftwareApplicationSchema,
    BreadcrumbListSchema,
    CollectionPageSchema,
    OrganizationSchema
};
