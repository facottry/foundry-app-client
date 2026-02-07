PRD — Blogs 2.0(Clicktory)
1. Objective

Transform Clicktory Blog from:

“nice - looking content page”

into:

Founder - led authority engine that compounds SEO, trust, and distribution.

    Blogs 2.0 must:

Feel written by real operators

Be searchable + memorable

Support multi - image, Medium - like reading

Be 100 % JSON - driven(no CMS dependency)

Scale to 1,000 + blogs programmatically

2. Non - Goals(Explicit)

❌ No WYSIWYG editor

❌ No markdown parser dependency

❌ No server - side CMS

❌ No generic AI filler blogs

❌ No manual publishing workflow

3. Core Design Principles

JSON is the CMS

Structure > prose

Founder voice matters more than keywords

Images are semantic, not decorative

Append - only publishing(never mutate history)

4. Blog 2.0 Data Model(FINAL)
export interface BlogV2 {
    id: string; // uuid
    slug: string;

    seo: {
        title: string;
        description: string;
        keywords: string[];
        canonical?: string;
    };

    meta: {
        publishedAt: string; // ISO
        updatedAt?: string;
        readTime: string;
        language: 'en';
        intent: 'educational' | 'opinion' | 'framework' | 'contrarian';
    };

    author: {
        id: 'arun' | 'manish' | 'shobhit' | 'vinod';
        voiceTagline: string; // shown under title
    };

    taxonomy: {
        primary: string;     // Growth, AI, SaaS, Ops
        secondary: string[]; // Zero-to-One, Monetization
        tags: string[];
    };

    hero: {
        title: string;
        subtitle: string;
        image: ImageBlock;
    };

    sections: SectionBlock[];

    closing: {
        takeaway: string;
        image: ImageBlock;
    };

    internalLinks: {
        products?: string[]; // slugs
        blogs?: string[];    // slugs
        categories?: string[];
    };
}

interface SectionBlock {
    heading: string;
    paragraphs: RichText[];
    quote?: {
        text: string;
        tone: 'insight' | 'warning' | 'reflection';
    };
    image?: ImageBlock;
}

interface ImageBlock {
    alt: string;
    prompt: string;   // for OpenAI image gen
    mood: string;
    placement: 'hero' | 'inline' | 'closing';
}

5. Rendering Rules(UI Contract)

Hero

H1 + subtitle

Full - width image

Sections

Max 3–5 paragraphs

Support bold, italics, block - quotes

Images

Hero(mandatory)

Inline(optional, max 1 per section)

Closing(mandatory)

Author Card

Pulled from authors.ts

CTA

Soft: “Explore products”, “Browse category”

6. Authors(Already Good – No Change)

Your existing authors object is fine.
Do not over - engineer it.

🧠 100 Blog Topic Ideas(High - Intent, Feb - 2026 - Relevant)
A.Founder Reality(25)

Why most SaaS founders quit after their first 50 users

The silent tax of building in public

What no one tells you about “early traction”

Founder burnout doesn’t look like burnout anymore

The day you realize your startup won’t be venture - scale

Why calm founders win longer games

Shipping fast vs shipping right: when speed kills you

The hidden cost of free users

When your users love you but won’t pay

Building in India vs selling to the world

The loneliness of being the bottleneck

Why your first hire usually fails

The myth of product - market fit

Founder intuition vs metrics

Why most startup advice ages badly

When to stop listening to Twitter

Your startup doesn’t need a community yet

The difference between momentum and noise

Why second - time founders move slower

What “distribution - first” actually means

The cost of chasing trends

How ego kills good products

Why boring businesses survive

Founder optimism vs realism

The day your startup becomes a job

B.AI & Tools Reality(25)

Why AI didn’t reduce your workload

The AI stack every startup overbuilds

Where AI actually helps small teams

Why “AI - powered” stopped converting

Building with AI vs building on AI

The cost curve of AI in 2026

Why most AI startups are thin wrappers

AI fatigue is real

When NOT to use AI

AI features users don’t trust

Why automation creates new problems

AI as leverage, not magic

How AI changes hiring

The end of generic SaaS

Prompt engineering is not a moat

The return of craftsmanship in software

Why infra matters again

AI makes bad UX worse

The illusion of “one - click” workflows

Why humans still matter in AI products

AI governance for small teams

Cost control in AI - heavy products

Open vs closed AI tradeoffs

AI debugging is the new ops

What survives after the AI hype

C.Growth Without Bullshit(25)

Early users ≠ early growth

Why paid ads fail early - stage SaaS

Distribution channels that still work

SEO for founders who hate SEO

Content that converts quietly

Why newsletters still matter

Communities vs audiences

Cold outreach without being spammy

When growth becomes a distraction

Organic growth is slower but safer

Why virality is overrated

Retention is the only growth

The danger of vanity metrics

How to earn trust online

Product - led growth realities

Growth loops that actually compound

The hidden cost of discounts

Why referrals stall

Pricing as a growth lever

Growth teams vs product teams

Distribution moats in 2026

Why most landing pages don’t work

Storytelling for products

Authority > reach

Growth without burning out

D.Systems, Ops, Longevity(25)

Building systems before scale

Why ops is underrated

Automation limits founders hit

When processes slow you down

Scaling without chaos

Tech debt isn’t always bad

Choosing boring tech stacks

Build vs buy decisions

Why internal tools matter

The cost of bad documentation

Founder time as a resource

Why meetings creep back

Async teams done right

Hiring for slope, not skill

Long - term thinking in startups

Sustainable SaaS models

When to stop adding features

Killing features is healthy

Roadmaps vs reality

Internal alignment problems

The real meaning of “focus”

Why stability wins late

Ops maturity stages

Founder energy management

Playing decade - long games