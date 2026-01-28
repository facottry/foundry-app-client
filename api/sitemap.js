export default async function handler(req, res) {
    const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://foundry-server-production.onrender.com/api'; // Fallback or env

    try {
        // Determine fetch implementation (Node 18+ has native fetch)
        const fetch = global.fetch || require('node-fetch');

        // Fetch Categories
        // Note: We might not have a dedicated 'get all categories' endpoint that returns slugs directly if not public.
        // Assuming standard endpoints exist. If not, we iterate known static ones or fetch from products.
        // For now, adhering to the user's example logic.

        // Actually, we do have a constant list of categories in the frontend code, but sitemap should be dynamic if possible.
        // Let's assume we fetch products and extract categories, or use the static list if the API doesn't support listing categories.
        // User sidebar has categories.

        // Fetch Products (Public)
        const productsRes = await fetch(`${API_BASE_URL}/products?limit=1000`); // Adjust limit as needed
        const productsData = await productsRes.json();
        const products = productsData.products || [];

        // Extract unique categories from products if no dedicated endpoint
        const categoriesSet = new Set(['all', 'ai', 'devtools', 'marketing', 'design', 'productivity']); // Starters
        products.forEach(p => {
            if (p.categories) p.categories.forEach(c => categoriesSet.add(c));
        });
        const categories = Array.from(categoriesSet);

        const urls = [
            "/",
            ...categories.map(c => `/category/${c}`),
            ...products.map(p => `/product/${p.slug || p._id}`) // Updated to use Slugs
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(u => `
        <url>
          <loc>https://appfoundry.vercel.app${u}</loc>
          <changefreq>weekly</changefreq>
          <priority>${u === '/' ? '1.0' : u.startsWith('/category') ? '0.8' : '0.6'}</priority>
        </url>
      `).join("")}
    </urlset>`;

        res.setHeader("Content-Type", "application/xml");
        res.status(200).send(xml);

    } catch (error) {
        console.error('Sitemap Generation Error:', error);
        res.status(500).send('Error generating sitemap');
    }
}
