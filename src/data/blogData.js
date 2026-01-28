export const authors = {
    arun: {
        name: 'Arun Gupta',
        role: 'Founder & CEO',
        avatar: '🚀',
        bio: 'Building the decision layer for software. Passionate about democratizing discovery for independent builders.',
        linkedin: 'https://www.linkedin.com/in/arun-gupta-tech/'
    },
    manish: {
        name: 'Manish Jaiswal',
        role: 'Head of Product',
        avatar: '💡',
        bio: 'Product strategist focused on user empathy and reducing friction in software adoption.',
        linkedin: 'https://www.linkedin.com/in/manish-jaiswal-49701b4a/'
    },
    shobhit: {
        name: 'Shobhit Jaiswal',
        role: 'Tech Lead',
        avatar: '💻',
        bio: 'Full-stack engineer obsessed with performance, clean code, and developer experience.',
        linkedin: 'https://www.linkedin.com/in/shobhit-jaiswal-962995145/'
    },
    vinod: {
        name: 'Vinod Gaur',
        role: 'CTO',
        avatar: '⚙️',
        bio: 'Architecting scalable systems and integrating AI to solve real-world discovery problems.',
        linkedin: 'https://www.linkedin.com/in/vinodiiitm/'
    }
};

export const blogPosts = [
    // Existing Posts (Refitted with authors)
    {
        slug: 'how-to-get-early-users-for-saas',
        title: 'How to Get Early Users for Your SaaS Without Paid Ads',
        date: '2026-01-20',
        excerpt: 'Discovery platforms, communities, and organic channels that actually work for early-stage products.',
        category: 'Product Discovery',
        readTime: '6 min read',
        authorId: 'arun',
        tags: ['Marketing', 'Zero to One', 'Growth'],
        image: '/images/blog/growth.png'
    },
    {
        slug: 'launching-as-solo-founder',
        title: 'Launching as a Solo Founder: What Actually Matters',
        date: '2025-11-15',
        excerpt: 'Cut through the noise. Focus on the fundamentals that move the needle when you are building alone.',
        category: 'Founder Playbooks',
        readTime: '8 min read',
        authorId: 'arun',
        tags: ['Solo Founder', 'Strategy', 'Mindset'],
        image: '/images/blog/founder.png'
    },
    {
        slug: 'product-discovery-without-noise',
        title: 'Product Discovery Without the Noise',
        date: '2025-12-10',
        excerpt: 'Why structured discovery beats algorithmic feeds for finding tools that actually solve problems.',
        category: 'Product Discovery',
        readTime: '5 min read',
        authorId: 'manish',
        tags: ['UX', 'Discovery', 'Problem Solving'],
        image: '/images/blog/product.png'
    },
    {
        slug: 'choosing-right-early-tools',
        title: 'Choosing the Right Early Tools for Your Startup',
        date: '2025-10-05',
        excerpt: 'A framework for evaluating tools when you are pre-revenue and every decision counts.',
        category: 'Founder Playbooks',
        readTime: '7 min read',
        authorId: 'shobhit',
        tags: ['Stack', 'Tools', 'Efficiency'],
        image: '/images/blog/engineering.png'
    },

    // NEW POSTS (20)

    // 1. Tech/DevTools
    {
        slug: 'why-nextjs-wins-for-saas',
        title: 'Why Next.js is the Default Choice for Modern SaaS in 2026',
        date: '2026-01-28',
        excerpt: 'Server components, edge rendering, and the developer experience that makes Next.js unbeatable.',
        category: 'Engineering',
        readTime: '6 min read',
        authorId: 'shobhit',
        tags: ['React', 'Next.js', 'Frontend'],
        image: '/images/blog/engineering.png'
    },
    // 2. Marketing
    {
        slug: 'seo-for-programmatic-pages',
        title: 'The Guide to Programmatic SEO for Marketplaces',
        date: '2026-01-27',
        excerpt: 'How to generate thousands of high-value landing pages without getting penalized by Google.',
        category: 'Growth',
        readTime: '9 min read',
        authorId: 'arun',
        tags: ['SEO', 'Marketing', 'Scale'],
        image: '/images/blog/growth.png'
    },
    // 3. Product
    {
        slug: 'friction-audit-ux',
        title: 'The Friction Audit: How to Fix Your Onboarding',
        date: '2026-01-26',
        excerpt: 'Users leave because of friction. Here is a step-by-step audit to find where you are losing them.',
        category: 'Product Design',
        readTime: '5 min read',
        authorId: 'manish',
        tags: ['UX', 'Onboarding', 'Retention'],
        image: '/images/blog/product.png'
    },
    // 4. AI
    {
        slug: 'ai-integration-patterns',
        title: '3 Patterns for Integrating AI into Legacy SaaS',
        date: '2026-01-25',
        excerpt: 'Don\'t rewrite your backend. Use these patterns to layer AI value on top of existing code.',
        category: 'Engineering',
        readTime: '7 min read',
        authorId: 'vinod',
        tags: ['AI', 'Architecture', 'Legacy'],
        image: '/images/blog/engineering.png'
    },
    // 5. Founder
    {
        slug: 'pricing-psychology-saas',
        title: 'Pricing Psychology: Tiered vs. Usage-Based Models',
        date: '2025-12-25',
        excerpt: 'How to align your pricing model with the value metrics your customers actually care about.',
        category: 'Founder Playbooks',
        readTime: '8 min read',
        authorId: 'arun',
        tags: ['Pricing', 'Revenue', 'Strategy'],
        image: '/images/blog/founder.png'
    },
    // 6. Marketing
    {
        slug: 'community-led-growth-myth',
        title: 'The Myth of Community-Led Growth',
        date: '2025-11-24',
        excerpt: 'Community is an outcome, not a channel. Why you can\'t "hack" a community into existence.',
        category: 'Growth',
        readTime: '6 min read',
        authorId: 'manish',
        tags: ['Community', 'Marketing', 'Reality Check'],
        image: '/images/blog/growth.png'
    },
    // 7. Tech
    {
        slug: 'optimizing-react-performance',
        title: 'Optimizing React Performance: Beyond useMemo',
        date: '2026-01-24',
        excerpt: 'Real-world techniques for fixing slow renders that have nothing to do with memoization.',
        category: 'Engineering',
        readTime: '10 min read',
        authorId: 'shobhit',
        tags: ['React', 'Performance', 'Code'],
        image: '/images/blog/engineering.png'
    },
    // 8. AI
    {
        slug: 'vector-databases-explained',
        title: 'Vector Databases Explained for Product Managers',
        date: '2025-11-23',
        excerpt: 'Understanding embeddings and semantic search without needing a PhD in math.',
        category: 'Technology',
        readTime: '5 min read',
        authorId: 'vinod',
        tags: ['AI', 'Database', 'Search'],
        image: '/images/blog/engineering.png'
    },
    // 9. Founder
    {
        slug: 'bootstrapping-vs-vc-2026',
        title: 'Bootstrapping vs. VC in 2026: The math has changed',
        date: '2026-01-23',
        excerpt: 'With AI reducing the cost of building, the case for bootstrapping has never been stronger.',
        category: 'Founder Playbooks',
        readTime: '7 min read',
        authorId: 'arun',
        tags: ['VC', 'Bootstrapping', 'Finance'],
        image: '/images/blog/founder.png'
    },
    // 10. Product
    {
        slug: 'churn-is-a-symptom',
        title: 'Churn is a Symptom, Not a Disease',
        date: '2025-10-22',
        excerpt: 'Stop trying to clear the bucket. Fix the hole. How to trace churn back to activation failures.',
        category: 'Product Design',
        readTime: '6 min read',
        authorId: 'manish',
        tags: ['Churn', 'Metrics', 'Product'],
        image: '/images/blog/product.png'
    },
    // 11. Marketing
    {
        slug: 'cold-email-that-works',
        title: 'Cold Email in 2026: Relevance over Personalization',
        date: '2026-01-22',
        excerpt: 'Nobody cares that you went to the same college. They care that you solved their specific problem yesterday.',
        category: 'Growth',
        readTime: '5 min read',
        authorId: 'arun',
        tags: ['Sales', 'Email', 'Outreach'],
        image: '/images/blog/growth.png'
    },
    // 12. Tech
    {
        slug: 'mongodb-schema-design',
        title: 'MongoDB Schema Design for High-Traffic SaaS',
        date: '2025-12-21',
        excerpt: 'Embedding vs. Referencing: The definitive guide for read-heavy applications.',
        category: 'Engineering',
        readTime: '8 min read',
        authorId: 'shobhit',
        tags: ['Database', 'MongoDB', 'Backend'],
        image: '/images/blog/engineering.png'
    },
    // 13. AI
    {
        slug: 'ethics-of-ai-content',
        title: 'The Ethics of AI-Generated Content in Marketplaces',
        date: '2025-12-15',
        excerpt: 'How we ensure quality and transparency when using LLMs to enhance product data.',
        category: 'Technology',
        readTime: '6 min read',
        authorId: 'vinod',
        tags: ['AI', 'Ethics', 'Trust'],
        image: '/images/blog/engineering.png'
    },
    // 14. Founder
    {
        slug: 'hiring-first-engineer',
        title: 'Hiring Your First Founding Engineer',
        date: '2026-01-20',
        excerpt: 'What to look for, what to pay, and how to split equity with your first technical hire.',
        category: 'Founder Playbooks',
        readTime: '7 min read',
        authorId: 'arun',
        tags: ['Hiring', 'Team', 'Equity'],
        image: '/images/blog/founder.png'
    },
    // 15. Product
    {
        slug: 'feature-flags-management',
        title: 'Feature Flags: The Secret to Stress-Free Deployments',
        date: '2025-11-20',
        excerpt: 'Decouple deployment from release. How feature flags change your engineering culture.',
        category: 'Engineering',
        readTime: '5 min read',
        authorId: 'shobhit',
        tags: ['DevOps', 'Deployment', 'Culture'],
        image: '/images/blog/engineering.png'
    },
    // 16. Growth
    {
        slug: 'micro-tools-marketing',
        title: 'Engineering as Marketing: Building Micro-Tools',
        date: '2025-12-05',
        excerpt: 'Why building a simple, free calculator or generator is better than writing 10 blog posts.',
        category: 'Growth',
        readTime: '6 min read',
        authorId: 'manish',
        tags: ['Marketing', 'Tools', 'Viral'],
        image: '/images/blog/growth.png'
    },
    // 17. Tech
    {
        slug: 'redis-caching-strategies',
        title: 'Redis Caching Strategies for fast API response times',
        date: '2025-11-19',
        excerpt: 'Cache-aside, write-through, or write-back? Choosing the right strategy for your API.',
        category: 'Engineering',
        readTime: '7 min read',
        authorId: 'vinod',
        tags: ['Performance', 'Redis', 'Backend'],
        image: '/images/blog/engineering.png'
    },
    // 18. Founder
    {
        slug: 'mental-health-founders',
        title: 'Founder Mental Health: The Marathon Mindset',
        date: '2025-10-18',
        excerpt: 'Burnout kills more startups than lack of funding. Strategies for sustainable building.',
        category: 'Founder Playbooks',
        readTime: '5 min read',
        authorId: 'arun',
        tags: ['Health', 'Mindset', 'Sustainability'],
        image: '/images/blog/founder.png'
    },
    // 19. Product
    {
        slug: 'dark-mode-design-system',
        title: 'Implementing Dark Mode with CSS Variables',
        date: '2025-12-18',
        excerpt: 'A clean implementation of theme switching without styled-components bloat.',
        category: 'Product Design',
        readTime: '5 min read',
        authorId: 'shobhit',
        tags: ['CSS', 'Design', 'Frontend'],
        image: '/images/blog/product.png'
    },
    // 20. Growth 
    {
        slug: 'measuring-developer-relations',
        title: 'Measuring DevRel: Metrics that actually matter',
        date: '2026-01-17',
        excerpt: 'Move beyond vanity metrics like Twitter followers. Track integration depth and time-to-hello-world.',
        category: 'Growth',
        readTime: '6 min read',
        authorId: 'manish',
        tags: ['DevRel', 'Metrics', 'Community'],
        image: '/images/blog/growth.png'
    }
];

export const blogContent = {
    // CONTENT FOR EXISTING POSTS
    'how-to-get-early-users-for-saas': {
        title: 'How to Get Early Users for Your SaaS Without Paid Ads',
        date: '2026-01-20',
        category: 'Product Discovery',
        readTime: '6 min read',
        authorId: 'arun',
        tags: ['Marketing', 'Zero to One', 'Growth'],
        image: '/images/blog/growth.png',
        content: `Getting your first users is the hardest part of launching a SaaS product. Paid ads are expensive and rarely work for early-stage products with unproven messaging.

Here's what actually works.

## Discovery Platforms

List your product on curated directories like **[Foundry](/category/all)**, Product Hunt alternatives, and niche communities. Focus on platforms that:

- Have real traffic, not just other founders
- Allow you to own your listing (permanent URLs)
- Don't require payment to be visible

The key is consistency. One listing won't move the needle. Ten might.

## Direct Outreach

Find 10-20 people who have the exact problem you solve. Reach out personally. No templates. No automation.

Ask if they'd be willing to try your product and give feedback. Don't pitch. Don't sell. Just ask.

Most will say no. Some will say yes. Those who say yes become your early champions.

## Content That Solves Problems

Write about the problem your product solves. Not your product. The problem.

If you built a tool for managing freelance invoices, write about common invoicing mistakes, tax implications, or cash flow management.

People searching for solutions will find your content. Some will try your product.`
    },
    'launching-as-solo-founder': {
        title: 'Launching as a Solo Founder: What Actually Matters',
        date: '2025-11-15',
        category: 'Founder Playbooks',
        readTime: '8 min read',
        authorId: 'arun',
        tags: ['Solo Founder', 'Strategy', 'Mindset'],
        image: '/images/blog/founder.png',
        content: `Launching a product as a solo founder is overwhelming. There's too much advice, too many "best practices," and not enough time.

Here's what actually matters.

## Ship Something Usable

Your first version doesn't need to be perfect. It needs to solve one problem well.

Cut features. Cut scope. Cut everything that isn't core to the value proposition.

If you're building a task manager, you don't need integrations, themes, or AI suggestions. You need tasks that can be created, edited, and marked as done.

Ship that. Improve later.`
    },
    'product-discovery-without-noise': {
        title: 'Product Discovery Without the Noise',
        date: '2025-12-10',
        category: 'Product Discovery',
        readTime: '5 min read',
        authorId: 'manish',
        tags: ['UX', 'Discovery', 'Problem Solving'],
        image: '/images/blog/product.png',
        content: `Most product discovery platforms are broken.

They prioritize engagement over usefulness. Algorithmic feeds over structured browsing. Hype over substance.

Here's why that's a problem—and what works better.

## The Algorithm Problem

Algorithmic feeds optimize for clicks, not for finding the right tool.

You see what's trending. What's getting upvotes. What's generating comments.

But trending doesn't mean useful. Popular doesn't mean right for your use case.

You end up discovering products that are good at marketing, not products that solve your problem.`
    },
    'choosing-right-early-tools': {
        title: 'Choosing the Right Early Tools for Your Startup',
        date: '2025-10-05',
        category: 'Founder Playbooks',
        readTime: '7 min read',
        authorId: 'shobhit',
        tags: ['Stack', 'Tools', 'Efficiency'],
        image: '/images/blog/engineering.png',
        content: `Every tool you add to your stack has a cost. Not just money—time, complexity, and cognitive overhead.

Here's how to choose tools that actually help.

## The Real Cost of Tools

A $10/month tool sounds cheap. But the real cost is:

- Time to evaluate it
- Time to set it up
- Time to learn it
- Time to maintain it
- Mental overhead of one more login

If a tool saves you less time than it costs, it's not worth it.

Check out our **[DevTools Category](/category/devtools)** for curated recommendations that pass this test.`
    },

    // NEW CONTENT
    'why-nextjs-wins-for-saas': {
        title: 'Why Next.js is the Default Choice for Modern SaaS in 2026',
        date: '2026-01-28',
        category: 'Engineering',
        readTime: '6 min read',
        authorId: 'shobhit',
        tags: ['React', 'Next.js', 'Frontend'],
        image: '/images/blog/engineering.png',
        content: `In 2026, the debate is largely over. For 90% of SaaS applications, Next.js isn't just a good choice—it's the default choice.

As a full-stack engineer who has migrated three major platforms to Next.js, here is why it wins.

## 1. The React Server Components (RSC) Paradigm

RSCs have fundamentally changed how we fetch data. We no longer need to expose API endpoints for every piece of data. We fetch directly on the server, close to the database.

This reduces bundle size, improves security, and simplifies the mental model.

## 2. SEO Out of the Box

For a platform like **Foundry**, SEO is life or death. Next.js gives us semantic HTML, meta tag management via the Metadata API, and dynamic sitemaps with almost zero configuration.

We don't "add" SEO later. It's baked into the architecture.

## 3. The Vercel Ecosystem

Deployment is no longer an ops task. It's a git push. Preview deployments changed our code review culture entirely.`
    },
    'seo-for-programmatic-pages': {
        title: 'The Guide to Programmatic SEO for Marketplaces',
        date: '2026-01-27',
        category: 'Growth',
        readTime: '9 min read',
        authorId: 'arun',
        tags: ['SEO', 'Marketing', 'Scale'],
        image: '/images/blog/growth.png',
        content: `How do you rank for 10,000 keywords without writing 10,000 blog posts?

Programmatic SEO. It is the secret weapon of marketplaces like TripAdvisor, G2, and yes, **Foundry**.

## The Formula

Programmatic SEO = (Data + Templates) * Scale.

1. **Data**: You need structured data. For us, it's Tools, Categories, and Alternatives.
2. **Templates**: Create page templates targeting long-tail keywords. E.g., "Best {Category} Tools for {UserType}".
3. **Scale**: Generate these pages dynamically.

## Quality Control is Key

Google hates "thin content". You cannot just spin text. Each page needs unique value.

We ensure every programmatic page has unique data points, distinct reviews, and aggregated metrics. If the page doesn't help the user, we strictly \`noindex\` it.`
    },
    'friction-audit-ux': {
        title: 'The Friction Audit: How to Fix Your Onboarding',
        date: '2026-01-26',
        category: 'Product Design',
        readTime: '5 min read',
        authorId: 'manish',
        tags: ['UX', 'Onboarding', 'Retention'],
        image: '/images/blog/product.png',
        content: `Users don't have short attention spans. They have low tolerance for friction.

If your churn is high during onboarding, do a **Friction Audit**.

## Step 1: Count the Clicks

Walk through your signup flow. Count every click. Every field. Every decision.

- Signup: 3 clicks
- Email verify: 2 clicks (too many!)
- Team setup: 4 clicks

Every click drops 10% of users. Cut them ruthlessly.

## Step 2: Time to "Aha!"

How many seconds until the user sees value? Not the dashboard—the **value**.

If it's more than 60 seconds, you are losing them.

## Step 3: Remove "Optional" Steps

"Upload Avatar"? Optional. "Invite Team"? Optional. "Setup Integrations"? Optional.

Move these to *after* the user has felt the magic.`
    },
    'ai-integration-patterns': {
        title: '3 Patterns for Integrating AI into Legacy SaaS',
        date: '2026-01-25',
        category: 'Engineering',
        readTime: '7 min read',
        authorId: 'vinod',
        tags: ['AI', 'Architecture', 'Legacy'],
        image: '/images/blog/engineering.png',
        content: `You have a 5-year-old codebase. You need to add AI. Do you rewrite?

No. You use integration patterns.

## Pattern 1: The Sidecar

Don't touch your monolith. Spin up a separate Python/Node service for AI logic. Expose it via REST/gRPC.

Your main app calls the Sidecar for "summarization" or "generation" and displays the result. Zero risk to core business logic.

## Pattern 2: The Background Worker

AI is slow. Don't block the request.

User submits data -> Queue -> Worker processes with LLM -> Webhook updates UI.

This keeps your app snappy even if the model takes 10 seconds to think.`
    },
    'pricing-psychology-saas': {
        title: 'Pricing Psychology: Tiered vs. Usage-Based Models',
        date: '2025-12-25',
        category: 'Founder Playbooks',
        readTime: '8 min read',
        authorId: 'arun',
        tags: ['Pricing', 'Revenue', 'Strategy'],
        image: '/images/blog/founder.png',
        content: `Pricing is the most powerful lever you have. Yet most founders pick numbers out of thin air.

## The Psychology of Tiers

- **Good**: The anchor. "Too limited."
- **Better**: The target. "Just right."
- **Best**: The aspirational. "Maybe later."

People hate making decisions. Tiers simplify the choice.

## The Rise of Usage-Based

Usage-based (like Stripe or AWS) aligns capability with cost. It removes the ceiling on your revenue.

For **Foundry**, we use a hybrid. Free to list, pay for performance (clicks). This aligns our incentives with yours.`
    },
    'community-led-growth-myth': {
        title: 'The Myth of Community-Led Growth',
        date: '2025-11-24',
        category: 'Growth',
        readTime: '6 min read',
        authorId: 'manish',
        tags: ['Community', 'Marketing', 'Reality Check'],
        image: '/images/blog/growth.png',
        content: `Everyone wants a "community". Slack groups. Discords. Forums.

But community is an **outcome** of a great product, not a growth channel you can just turn on.

## Why Most Communities Fail

1. **Extraction mindset**: You want them to buy. They want to learn.
2. **Empty rooms**: You launch before you have users. It's a ghost town.
3. **Wrong platform**: Developers hate Facebook groups. Marketers hate Discord.

## Build Audience First

Build an audience by providing value (content, tools). When they start talking to *each other*, that's when you open the community doors.`
    },
    'optimizing-react-performance': {
        title: 'Optimizing React Performance: Beyond useMemo',
        date: '2026-01-24',
        category: 'Engineering',
        readTime: '10 min read',
        authorId: 'shobhit',
        tags: ['React', 'Performance', 'Code'],
        image: '/images/blog/engineering.png',
        content: `Stop wrapping everything in \`useMemo\`. It's not magic, and it comes with a cost.

Here is how to actually fix slow React apps.

## 1. Fix Your State Structure

If you're passing logic down 5 levels, you don't need memoization. You need composition.

Lift state up, or better yet, push state down. Keep state close to where it's used.

## 2. Virtualize Long Lists

Rendering 1000 items? Browser DOM is your bottleneck, not React. Use \`react-window\`.

## 3. Interaction to Next Paint (INP)

React 18's concurrency features (\`useTransition\`) are game changers. Keep the UI responsive even while heavy computations run.`
    },
    'vector-databases-explained': {
        title: 'Vector Databases Explained for Product Managers',
        date: '2025-11-23',
        category: 'Technology',
        readTime: '5 min read',
        authorId: 'vinod',
        tags: ['AI', 'Database', 'Search'],
        image: '/images/blog/engineering.png',
        content: `You keep hearing "Vector Database" and "Embeddings". What are they?

## The Analogy

Imagine a library. 
- **SQL** is finding a book by its exact ISBN.
- **Vector Search** is asking the librarian "Do you have anything that feels like Harry Potter but darker?"

## How It Works

We teach the computer to turn text into numbers (vectors). Similar concepts get similar numbers. 

"King" - "Man" + "Woman" ≈ "Queen".

This simple math allows us to build "Related Products" features that actually understand context, not just keywords.`
    },
    'bootstrapping-vs-vc-2026': {
        title: 'Bootstrapping vs. VC in 2026: The math has changed',
        date: '2026-01-23',
        category: 'Founder Playbooks',
        readTime: '7 min read',
        authorId: 'arun',
        tags: ['VC', 'Bootstrapping', 'Finance'],
        image: '/images/blog/founder.png',
        content: `In 2021, money was free. In 2026, efficiency is king.

## The Cost of Building Has Collapsed

With AI coding assistants and modern frameworks, a solo dev can do the work of a 5-person team from 2020.

This means you don't *need* $2M seed rounds to get to MVP. You can bootstrap longer.

## When to Raise

Raise when you have fuel and just need a bigger fire. Don't raise to build the fire pit.

At **AppFoundry**, we believe in sustainable growth. We build tools to help you bootstrap effectively.`
    },
    'churn-is-a-symptom': {
        title: 'Churn is a Symptom, Not a Disease',
        date: '2025-10-22',
        category: 'Product Design',
        readTime: '6 min read',
        authorId: 'manish',
        tags: ['Churn', 'Metrics', 'Product'],
        image: '/images/blog/product.png',
        content: `You can't "fix" churn. By the time a user cancels, the damage was done months ago.

Churn is a symptom of **Activation Failure**.

## The 30-Day Cliff

If a user churns on day 90, they likely stopped getting value on day 30.

Look upstream. Did they set up the key feature? Did they invite their team? Did they see the ROI report?

Fix activation, and retention takes care of itself.`
    },
    'cold-email-that-works': {
        title: 'Cold Email in 2026: Relevance over Personalization',
        date: '2026-01-22',
        category: 'Growth',
        readTime: '5 min read',
        authorId: 'arun',
        tags: ['Sales', 'Email', 'Outreach'],
        image: '/images/blog/growth.png',
        content: `Hi {FirstName}, I saw you went to {School}...

Delete.

Fake personalization is dead. AI killed it. 

## The New Standard: Relevance

Relevance means: "I see you have problem X. I solve problem X. Here is proof."

Don't waste 3 sentences faking rapport. Respect their time. Get to the point.

"I noticed your [Foundry](/category/devtools) listing has low click-through rates. We built a tool to fix that."

That gets a reply.`
    },
    'mongodb-schema-design': {
        title: 'MongoDB Schema Design for High-Traffic SaaS',
        date: '2025-12-21',
        category: 'Engineering',
        readTime: '8 min read',
        authorId: 'shobhit',
        tags: ['Database', 'MongoDB', 'Backend'],
        image: '/images/blog/engineering.png',
        content: `SQL thinking will kill your MongoDB performance.

In SQL, you normalize. tables for everything. JOINs everywhere.

In Mongo, you access data together, you store it together.

## The Rule of Thumb

- **Embed** if the data is consumed together (e.g., Order + OrderItems).
- **Reference** if the data is unbound or accessed independently (e.g., Products + Categories).

For **Foundry**, we embed reviews inside products for read speed, but reference owners to keep user data consistent.`
    },
    'ethics-of-ai-content': {
        title: 'The Ethics of AI-Generated Content in Marketplaces',
        date: '2025-12-15',
        category: 'Technology',
        readTime: '6 min read',
        authorId: 'vinod',
        tags: ['AI', 'Ethics', 'Trust'],
        image: '/images/blog/engineering.png',
        content: `We use AI at AppFoundry. But we have a rule: **AI assists, Humans decide.**

## The Trust Gap

If users think your reviews are AI-generated, you die. Trust is your only currency.

We use AI to:
- Categorize tools
- Summarize features
- Detect spam

We NEVER use AI to:
- Write fake reviews
- Inflate engagement numbers

Transparency isn't optional.`
    },
    'hiring-first-engineer': {
        title: 'Hiring Your First Founding Engineer',
        date: '2026-01-20',
        category: 'Founder Playbooks',
        readTime: '7 min read',
        authorId: 'arun',
        tags: ['Hiring', 'Team', 'Equity'],
        image: '/images/blog/founder.png',
        content: `Your first hire isn't an employee. They are a co-founder who gets a salary.

## Optimize for Agency

You don't need the best coder. You need the best *solver*.

Can they take a vague problem ("Users aren't verify email") and solve it end-to-end without meetings?

## Equity Compensation

Be generous. 1% is an insult for a founding engineer. Think 2-10% depending on stage and salary trade-off.`
    },
    'feature-flags-management': {
        title: 'Feature Flags: The Secret to Stress-Free Deployments',
        date: '2025-11-20',
        category: 'Engineering',
        readTime: '5 min read',
        authorId: 'shobhit',
        tags: ['DevOps', 'Deployment', 'Culture'],
        image: '/images/blog/engineering.png',
        content: `Deployment should be a non-event. Release should be a marketing event.

## The Separation

We deploy code to production 10 times a day. But users don't see it.

It's wrapped in Feature Flags.

\`if (user.hasFlag('new-dashboard')) renderNewDashboard()\`

This lets us test in production with the team, then with beta users, then 10% rollout.

No big bang launches. No rollback panic.`
    },
    'micro-tools-marketing': {
        title: 'Engineering as Marketing: Building Micro-Tools',
        date: '2025-12-05',
        category: 'Growth',
        readTime: '6 min read',
        authorId: 'manish',
        tags: ['Marketing', 'Tools', 'Viral'],
        image: '/images/blog/growth.png',
        content: `Don't just write about the problem. Build a tiny tool to solve a piece of it.

HubSpot built "Website Grader". It brought them millions of leads.

## Ideas for Micro-Tools

- Calculators (ROI, tax, fees)
- Generators (Names, colors, privacy policies)
- Checkers (SEO, speed, accessibility)

These tools get backlinks because they are *useful*. Content gets old. Tools stay useful.`
    },
    'redis-caching-strategies': {
        title: 'Redis Caching Strategies for fast API response times',
        date: '2025-11-19',
        category: 'Engineering',
        readTime: '7 min read',
        authorId: 'vinod',
        tags: ['Performance', 'Redis', 'Backend'],
        image: '/images/blog/engineering.png',
        content: `Database queries are slow. Memory is fast.

## Strategy 1: Cache-Aside (Lazy Loading)

App checks cache. Miss? DB -> Cache -> App.
Pros: Resilient. Cons: First hit is slow.

## Strategy 2: Write-Through

App writes DB and Cache same time.
Pros: Cache always fresh. Cons: Write penalty.

For **Foundry** product listings, we use Cache-Aside with a 5-minute TTL. Perfect balance of freshness and speed.`
    },
    'mental-health-founders': {
        title: 'Founder Mental Health: The Marathon Mindset',
        date: '2025-10-18',
        category: 'Founder Playbooks',
        readTime: '5 min read',
        authorId: 'arun',
        tags: ['Health', 'Mindset', 'Sustainability'],
        image: '/images/blog/founder.png',
        content: `I've seen brilliantly talented founders quit because they burned out in year 2. The startup wins in year 7.

## Non-Negotiables

1. **Sleep**: 7 hours. Non-negotiable.
2. **Movement**: You think with your body. stagnant body = stagnant mind.
3. **Detach**: You are not your MRR. If MRR drops, you are still a worthy human.

Protect your psychology like you protect your codebase.`
    },
    'dark-mode-design-system': {
        title: 'Implementing Dark Mode with CSS Variables',
        date: '2025-12-18',
        category: 'Product Design',
        readTime: '5 min read',
        authorId: 'shobhit',
        tags: ['CSS', 'Design', 'Frontend'],
        image: '/images/blog/product.png',
        content: `Dark mode isn't just \`background: black\`.

## The Token Approach

Define semantic tokens, not colors.

\`--bg-primary\` instead of \`--white\`.
\`--text-subtle\` instead of \`--gray-500\`.

Then toggle a class on \`<html>\`.

This makes [Accessibility](/category/design) auditing much easier too.`
    },
    'measuring-developer-relations': {
        title: 'Measuring DevRel: Metrics that actually matter',
        date: '2026-01-17',
        category: 'Growth',
        readTime: '6 min read',
        authorId: 'manish',
        tags: ['DevRel', 'Metrics', 'Community'],
        image: '/images/blog/growth.png',
        content: `DevRel is hard to measure. But "vibes" don't get budget.

## The Metric Funnel

1. **Awareness**: Documentation pageviews.
2. **Activation**: Time to "First Hello World".
3. **Engagement**: GitHub stars / Forks / Issues.
4. **Retention**: Weekly active API tokens.

Focus on #2. If developers can't run your code in 5 minutes, they leave.`
    }
};
