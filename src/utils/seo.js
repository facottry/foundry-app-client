/**
 * Generate schema.org structured data for different page types
 */

export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Clicktory",
    "url": "https://www.clicktory.in",
    "description": "A modern discovery platform for independent SaaS founders and builders.",
    "sameAs": [],
    "foundingDate": "2026"
};

export const generateProductSchema = (product) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product.name,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": product.tagline || product.description,
    "url": `https://www.clicktory.in/product/${product._id}`,
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    }
});

export const generateBreadcrumbSchema = (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": item.href ? `https://www.clicktory.in${item.href}` : undefined
    }))
});

export const generateCategorySchema = (categoryName) => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": categoryName,
    "description": `Discover ${categoryName} tools built by independent founders`,
    "url": `https://www.clicktory.in/category/${categoryName}`
});
