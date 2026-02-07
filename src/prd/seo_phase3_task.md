ANTI-GRAVITY MASTER PROMPT — FIX TOP 25 SEO FAILURES (CLICKTORY)

You are a Principal SEO + Platform Engineer fixing a production SaaS discovery platform.
Your task is to systematically eliminate the following SEO failures with no regressions.

GLOBAL RULES

Do NOT redesign UI

Do NOT add marketing copy

Do NOT change URLs unless explicitly instructed

Prefer server-side rendering (SSR) or static pre-rendering

Every fix must be crawlable, canonical, and validated

Assume Googlebot is impatient and dumb

1️⃣ ROBOTS.TXT — FIX FORMAT (CRITICAL)

Problem

/robots.txt is single-line and improperly formatted

Action

Rewrite robots.txt with proper newline-separated directives

Required Output

User-agent: *
Allow: /

Sitemap: https://www.clicktory.in/sitemap.xml


Validation

robots.txt must pass Google Rich Results / robots tester

No merged directives on one line

2️⃣ BROKEN CATEGORY & TAG SITEMAPS — FIX XML (CRITICAL)

Problem

/sitemaps/category.xml

/sitemaps/tag.xml

Both throw XML parse errors and dump raw text

Action

Regenerate both as valid XML sitemap protocol

Wrap URLs in <urlset> and <url><loc>

Rules

All category & tag slugs must be lowercase

No spaces

No priority or frequency spam

Validation

Open directly in browser → must render as XML

Submit individually in Google Search Console

3️⃣ MIS-ASSIGNED COLLECTION SITEMAP — FIX MAPPING

Problem

/sitemaps/collection.xml lists job URLs

Action

Separate sitemap responsibility:

collection.xml → collections only

jobs.xml → jobs only

Rules

1 sitemap = 1 entity type

No cross-pollination

4️⃣ EMPTY JOBS SITEMAP — FIX OR REMOVE

Problem

/sitemaps/jobs.xml is empty

Action

If jobs exist → populate

If jobs do not exist → REMOVE sitemap from index

Rule

Empty sitemap = delete, not tolerate

5️⃣ PRODUCT SLUG DUPLICATES — HARD REDIRECT

Problem

Old slugs like /product/assistbot return “Product not found”

New slug exists /product/assist-bot

Action

Add 301 redirects from all legacy slugs → canonical slug

Rules

Case-insensitive redirect

Hyphenated slug is canonical

No soft 404s

6️⃣ CAPITALIZED CATEGORY SLUGS — NORMALIZE

Problem

/category/AI, /category/Lifestyle

Action

Force lowercase URLs:

/category/ai

/category/lifestyle

Rules

Add 301 redirects from uppercase → lowercase

Enforce lowercase at router level

7️⃣ BLOG PAGES — FIX SSR (BLOCKER)

Problem

Blog pages are client-side only

Bots see blank page or JS warning

Action

Implement SSR or static generation for:

Blog index

Blog detail pages

Rules

Full article HTML must exist before JS

No spinner as primary content

Validation

View page source → article text visible

Test with ?disable_js=true

8️⃣ INFINITE SCROLL — ADD PAGINATION

Problem

Product & category pages load only first 50 items

Action

Add crawlable pagination:

?page=1

?page=2

Rules

<a href> links required

Infinite scroll can stay for users, NOT for bots

9️⃣ CATEGORY CANONICALIZATION

Problem

Near-duplicate category pages

No canonical tags

Action

Add <link rel="canonical"> to every category page

Rule

Canonical must match lowercase URL

🔟 PRICING PAGE — ADD REAL DATA

Problem

/pricing contains marketing fluff, no prices

Action

Add:

Actual tiers OR

“Free / Paid / Enterprise” with feature bullets

Rule

Pricing pages without prices = SEO deadweight

1️⃣1️⃣ MIS-ROUTED LEGAL PAGES — FIX ROUTES

Problem

/terms-of-service 404

/privacy sometimes loads wrong content

Action

Normalize routes:

/terms

/privacy-policy

/cookie-policy

Rules

One route per document

All others → 301 redirect

1️⃣2️⃣ COOKIE POLICY — ADD PAGE

Problem

/cookie-policy missing

Action

Create minimal cookie policy page

Link from footer

Rule

GDPR compliance is non-optional

1️⃣3️⃣ CONTACT PAGE — ADD REAL SIGNALS

Problem

Contact page is just a form

Action

Add:

Support email

Company name

Country / city

Rule

Anonymous sites do not rank long-term

1️⃣4️⃣ NEWSLETTER — ADD ARCHIVE OR NOINDEX

Problem

/newsletter empty

Action

Either:

Add archive pages, OR

noindex, follow

1️⃣5️⃣ FOUNDER PAGES — ADD DEPTH

Problem

Founder pages are name + products only

Action

Add:

Short bio (50–100 words)

Role

Startup context

Rule

Founder pages are long-tail SEO assets

1️⃣6️⃣ STRUCTURED DATA — ADD JSON-LD (MANDATORY)

Add JSON-LD for:

Organization (sitewide)

SoftwareApplication (product pages)

BreadcrumbList

Article (blog)

CollectionPage (categories)

Rule

No schema = Google guessing

1️⃣7️⃣ HEAVY JS — REDUCE BLOCKING

Action

Ensure critical content renders without JS

Defer analytics & ads

1️⃣8️⃣ INDEX-INTENT PAGES — CREATE TEMPLATES

Create programmatic templates for:

/best/{category}-tools

/alternatives/{product}

/top-{category}-software

1️⃣9️⃣ INTERNAL LINKING — FIX HIERARCHY

Action

Add breadcrumbs:

Home → Category → Product

Categories must link back to products

2️⃣0️⃣ COLLECTION PAGES — EXPAND CONTENT

Action

Minimum:

200–300 words intro

Clear purpose

2️⃣1️⃣ SITEMAP HYGIENE — VALIDATE

Rules

No priorities

No duplicates

No uppercase URLs

2️⃣2️⃣ CANONICAL TAGS — GLOBAL

Action

Add canonical tags on:

Products

Categories

Collections

2️⃣3️⃣ META TAGS — FIX QUALITY

Rules

Title = descriptive + keyword

Meta description ≠ brand slogan

2️⃣4️⃣ HEADING DEPTH — FIX SEMANTICS

Action

Enforce:

One H1

Logical H2/H3 hierarchy

2️⃣5️⃣ PERFORMANCE — REDUCE CLS

Action

Pre-define image dimensions

Remove spinner-only loading states

FINAL OUTPUT EXPECTED FROM YOU

Updated config files

Updated routes

Updated sitemap generation logic

Validation checklist per fix

Do not stop until all 25 failures are resolved.