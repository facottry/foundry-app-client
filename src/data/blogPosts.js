import { authors } from './blogAuthors';
import { legacyBlogPosts } from './legacyBlogPosts';

/**
 * Blog posts following BlogV2 schema
 * @type {import('./blogTypes').BlogV2[]}
 */
export const blogPosts = [
    ...legacyBlogPosts,
    {
        id: "b001-2026-02-07-llm-inference-costs",
        slug: "understanding-llm-inference-cost-curves-in-production",
        seo: {
            title: "Understanding LLM Inference Cost Curves in Production",
            description: "A deep dive into the real cost dynamics of running LLMs at scale—token economics, batching strategies, and why your cost model is probably wrong.",
            keywords: ["LLM", "inference costs", "AI infrastructure", "token economics", "GPU optimization", "production ML"]
        },
        meta: {
            publishedAt: "2026-02-07T09:00:00Z",
            readTime: "12 min read",
            language: "en",
            intent: "educational"
        },
        author: {
            id: "vinod",
            voiceTagline: "Scaling AI systems from prototype to production."
        },
        taxonomy: {
            primary: "AI Infrastructure",
            secondary: ["Cost Optimization", "MLOps"],
            tags: ["LLM", "GPU", "Inference", "Cost Engineering"]
        },
        hero: {
            title: "Understanding LLM Inference Cost Curves in Production",
            subtitle: "Why your cost projections are off by 3x and what the real levers are.",
            image: {
                alt: "GPU cluster with flowing data streams representing token processing at scale",
                prompt: "Isometric view of a modern data center with glowing GPU racks, streams of blue and gold light representing token flows, dark background with accent lighting, technical and futuristic mood.",
                mood: "Technical, precise, futuristic",
                placement: "hero"
            }
        },
        sections: [
            {
                heading: "The Token Economy Nobody Explains",
                paragraphs: [
                    { text: "Every LLM cost calculator on the internet is wrong. They multiply tokens by price-per-token and call it a day." },
                    { text: "**In production, your costs are dominated by three hidden factors:** batch efficiency, cold start overhead, and the ratio of input to output tokens." },
                    { text: "A 100-token prompt that generates 500 tokens costs roughly 5x more than the naive calculation suggests. Output tokens are 3-4x more expensive to generate than input tokens to process, because each output token requires a full forward pass." },
                    { text: "When your traffic is bursty, you pay the cold-start penalty repeatedly. When your traffic is steady but low, you pay for idle GPU capacity. There is no free lunch." }
                ],
                quote: {
                    text: "The real cost of LLM inference is not the model—it is the gap between your traffic pattern and your provisioning strategy.",
                    tone: "insight"
                }
            },
            {
                heading: "Batching: The 10x Lever Nobody Uses Correctly",
                paragraphs: [
                    { text: "Dynamic batching is the single biggest cost lever in LLM inference. The difference between batch-size-1 and batch-size-32 can be 8-10x in cost efficiency." },
                    { text: "But batching introduces latency. And latency introduces complexity. You now need to manage queue depths, timeout policies, and priority lanes." },
                    { text: "The optimal batch size depends on your latency SLA, your GPU memory, and the variance in your prompt lengths. There is no universal answer." },
                    { text: "Most teams run batch-size-1 because it is simpler. They pay 5x more than they should." }
                ],
                image: {
                    alt: "Diagram showing batching efficiency curves with latency tradeoffs",
                    prompt: "Technical diagram on dark background showing efficiency curves, batch size on X axis, cost per token on Y axis, multiple curves for different latency targets, clean data visualization style.",
                    mood: "Analytical, clean, technical",
                    placement: "inline"
                }
            },
            {
                heading: "The Hidden Cost of Model Switching",
                paragraphs: [
                    { text: "You start with GPT-4. Then you want to add Claude for specific tasks. Then you need a smaller model for classification. Now you have three model endpoints." },
                    { text: "Each model requires separate GPU allocation, separate scaling policies, and separate monitoring. Your infrastructure complexity just tripled." },
                    { text: "The trend toward specialized models (coding, reasoning, summarization) is real and valuable. But the operational cost of managing multiple models is rarely factored into the decision." },
                    { text: "Before adding another model, ask: can I solve this with better prompting? The answer is usually yes." }
                ]
            },
            {
                heading: "Practical Cost Control Strategies",
                paragraphs: [
                    { text: "**1. Measure output tokens separately.** They are your real cost driver. Optimize for shorter, denser outputs." },
                    { text: "**2. Implement tiered routing.** Use a small, fast model to classify requests and route only complex ones to expensive models." },
                    { text: "**3. Cache aggressively.** Semantic caching can reduce redundant inference by 20-40% in most production workloads." },
                    { text: "**4. Right-size your context windows.** Every token in your system prompt is processed on every request. A 2000-token system prompt at 1M requests/month is not free." },
                    { text: "The companies running LLMs profitably are not paying less per token. They are processing fewer tokens per task." }
                ]
            }
        ],
        closing: {
            takeaway: "LLM costs are not a line item—they are an engineering discipline. The teams that treat inference economics as a first-class concern will outcompete those who treat it as an afterthought.",
            image: {
                alt: "Balance scale with tokens and cost symbols in equilibrium",
                prompt: "Minimalist balance scale on dark background, one side has glowing AI tokens, other side has cost/efficiency symbols, perfect equilibrium, clean modern design.",
                mood: "Balanced, thoughtful, decisive",
                placement: "closing"
            }
        },
        internalLinks: {
            products: [],
            blogs: ["ai-cost-optimization-guide", "gpu-provisioning-strategies"],
            categories: ["AI Infrastructure"]
        }
    },
    {
        id: "b002-2026-02-07-database-connection-pooling",
        slug: "connection-pooling-at-scale-what-breaks-first",
        seo: {
            title: "Connection Pooling at Scale: What Breaks First",
            description: "A production deep-dive into database connection pooling—why your pool exhausts, how PgBouncer fails, and the real limits of serverless databases.",
            keywords: ["database", "connection pooling", "PostgreSQL", "PgBouncer", "serverless", "scaling", "production"]
        },
        meta: {
            publishedAt: "2026-02-07T10:00:00Z",
            readTime: "10 min read",
            language: "en",
            intent: "educational"
        },
        author: {
            id: "shobhit",
            voiceTagline: "Full-stack lessons from production failures."
        },
        taxonomy: {
            primary: "Backend Systems",
            secondary: ["Database", "Scaling"],
            tags: ["PostgreSQL", "Connection Pooling", "Infrastructure", "Production"]
        },
        hero: {
            title: "Connection Pooling at Scale: What Breaks First",
            subtitle: "Your database can handle the load. Your connection layer probably cannot.",
            image: {
                alt: "Network of database connections with bottleneck visualization",
                prompt: "Abstract visualization of database connections, multiple client nodes connecting to a bottleneck point before reaching database, glowing connection lines, some turning red indicating failure, dark tech aesthetic.",
                mood: "Technical, tense, revealing",
                placement: "hero"
            }
        },
        sections: [
            {
                heading: "The Connection Limit You Forgot About",
                paragraphs: [
                    { text: "PostgreSQL defaults to 100 max connections. Your connection pool defaults to 10 connections per instance. You have 15 instances. Do the math." },
                    { text: "**150 connections requested, 100 available.** Your pool blocks. Your requests queue. Your p99 latency spikes to 30 seconds. Your health checks fail. Your instances restart. Now you have 20 instances." },
                    { text: "This is not a database problem. This is a connection management problem." },
                    { text: "Most teams hit this wall between 50 and 200 concurrent users. The fix is not 'get a bigger database.' The fix is understanding your connection lifecycle." }
                ],
                quote: {
                    text: "Every connection is a TCP socket, a memory allocation on the server, and a process in PostgreSQL. They are not free, and they do not scale linearly.",
                    tone: "warning"
                }
            },
            {
                heading: "Why PgBouncer Works (Until It Doesn't)",
                paragraphs: [
                    { text: "PgBouncer is the standard answer. Put a connection multiplexer in front of PostgreSQL. Let it manage the connection lifecycle." },
                    { text: "In transaction pooling mode, PgBouncer can serve 1000 clients with 50 actual database connections. Magic." },
                    { text: "**Until you use prepared statements.** Or session-level settings. Or advisory locks. Or LISTEN/NOTIFY. All of these require session affinity, which defeats the purpose of transaction pooling." },
                    { text: "The moment you run `SET search_path` or use `PREPARE`, your pooling efficiency drops by 80%. And your ORM is probably doing this behind your back." }
                ],
                image: {
                    alt: "Diagram comparing transaction vs session pooling modes",
                    prompt: "Technical comparison diagram showing transaction pooling vs session pooling architecture, client connections on left, database on right, different routing patterns highlighted, clean infographic style on dark background.",
                    mood: "Educational, clear, technical",
                    placement: "inline"
                }
            },
            {
                heading: "The Serverless Database Trap",
                paragraphs: [
                    { text: "Serverless databases (Neon, PlanetScale, Supabase pooler) promise infinite scaling. But they add a cold-start penalty to every query." },
                    { text: "For OLTP workloads with sub-10ms latency requirements, the added network hop and connection negotiation can double your query time." },
                    { text: "Serverless is excellent for bursty, unpredictable workloads. It is a bad default for steady-state production traffic." },
                    { text: "The marketing says 'scales to zero.' The reality is 'scales to zero with a 50-200ms wake-up penalty.'" }
                ]
            },
            {
                heading: "What Actually Works in Production",
                paragraphs: [
                    { text: "**1. Size your pool correctly.** connections = ((core_count * 2) + effective_spindle_count). For most cloud instances, this means 10-20 connections per instance, not 50." },
                    { text: "**2. Separate read and write pools.** Read replicas can absorb query load without consuming primary connection slots." },
                    { text: "**3. Use connection timeouts aggressively.** A 30-second query timeout prevents long-running queries from hoarding connections." },
                    { text: "**4. Monitor pool exhaustion, not just database CPU.** Your pool will exhaust before your database sweats." },
                    { text: "**5. Consider a sidecar pooler.** Running PgBouncer as a sidecar (same pod, different container) reduces latency vs. a centralized pooler." }
                ]
            }
        ],
        closing: {
            takeaway: "Database scaling is not about CPU or memory—it is about connection lifecycle management. Master your pooling layer before you upgrade your database tier.",
            image: {
                alt: "Well-organized connection flow diagram showing healthy system",
                prompt: "Clean system diagram showing healthy database connection flow, organized queues, green status indicators, smooth data paths, professional technical illustration on dark background.",
                mood: "Resolved, confident, professional",
                placement: "closing"
            }
        },
        internalLinks: {
            products: [],
            blogs: ["postgresql-performance-tuning", "serverless-database-comparison"],
            categories: ["Backend Systems"]
        }
    },
    {
        id: "b003-2026-02-07-rsc-at-scale",
        slug: "react-server-components-at-scale-reality",
        seo: {
            title: "React Server Components at Scale: The Operational Reality",
            description: "Moving beyond the 'Hello World' of RSCs. How Server Components change your caching strategy, bundle size, and debugging workflow in production.",
            keywords: ["React", "Server Components", "Next.js", "Frontend Performance", "RSC", "Streaming"]
        },
        meta: {
            publishedAt: "2026-02-07T14:00:00Z",
            readTime: "14 min read",
            language: "en",
            intent: "educational"
        },
        author: {
            id: "shobhit",
            voiceTagline: "Frontend architecture for high-scale systems."
        },
        taxonomy: {
            primary: "Frontend Engineering",
            secondary: ["Performance", "Architecture"],
            tags: ["React", "RSC", "Next.js", "Web Performance"]
        },
        hero: {
            title: "React Server Components at Scale: The Operational Reality",
            subtitle: "It's not just a render method. It's a complete architectural shift for your data layer.",
            image: {
                alt: "Visualization of client-server boundary in React tree",
                prompt: "Futuristic dashboard showing React component tree with server and client split, glowing nodes, data flow, highly technical, dark mode UI style.",
                mood: "Technical, intricate, modern",
                placement: "hero"
            }
        },
        sections: [
            {
                heading: "The Waterfall You Don't See",
                paragraphs: [
                    { text: "Server Components promise to eliminate client-side waterfalls. But if you aren't careful, you just move the waterfall to the server." },
                    { text: "When you `await` data in a parent component and then pass it down, you are blocking the render tree. Use `Suspense` boundaries aggressively to unblock parts of the UI." },
                    { text: "The real power of RSC is not just fetching data—it's **streaming** it. But streaming requires your backend to support chunks, and your edge layer to not buffer the response." }
                ],
                quote: {
                    text: "RSC is not an optimization. It is a data fetching paradigm that requires you to rethink how your backend exposes APIs.",
                    tone: "insight"
                }
            },
            {
                heading: "Caching is Harder, Not Easier",
                paragraphs: [
                    { text: "With RSC, you have four layers of caching: Database, API/Backend, Next.js Data Cache, and the Client Router Cache." },
                    { text: "Invalidating the Router Cache is the hardest part. If a user updates data, seeing that update reflect instantly requires precise revalidation tags." },
                    { text: "Don't rely on `revalidatePath` blindly. Understanding the lifecycle of the Data Cache vs. Full Route Cache is critical to avoiding stale data." }
                ]
            },
            {
                heading: "Bundle Size: The Hidden Win",
                paragraphs: [
                    { text: "The biggest win of RSC is zero-bundle-size dependencies. You can import huge libraries like `shiki` or `date-fns` on the server component, use them, and ship **zero** KB to the client." },
                    { text: "This fundamentally changes how we pick libraries. We used to optimize for size. Now we optimize for server-side capability." }
                ]
            }
        ],
        closing: {
            takeaway: "RSC simplifies the client but complicates the server. Treat your frontend entry points as backend endpoints, because that is what they are.",
            image: {
                alt: "Abstract server-client handshake visualization",
                prompt: "Digital handshake between server and browser, data packets flowing, secure and fast connection, minimal technical style.",
                mood: "Connected, fast, secure",
                placement: "closing"
            }
        },
        internalLinks: {
            products: [],
            blogs: ["understanding-llm-inference-cost-curves-in-production"],
            categories: ["Frontend Engineering"]
        }
    },
    {
        id: "b004-2026-02-07-kubernetes-cost",
        slug: "kubernetes-cost-optimization-strategies",
        seo: {
            title: "Kubernetes Cost Optimization: Stopping the Bleeding",
            description: "Your cluster is over-provisioned. Here is how to use VPA, HPA, and Spot Instances correctly to cut your K8s bill by 40%.",
            keywords: ["Kubernetes", "Cost Optimization", "FinOps", "Cloud Infrastructure", "K8s", "DevOps"]
        },
        meta: {
            publishedAt: "2026-02-08T09:00:00Z",
            readTime: "11 min read",
            language: "en",
            intent: "framework"
        },
        author: {
            id: "vinod",
            voiceTagline: "Infrastructure efficiency as a first principle."
        },
        taxonomy: {
            primary: "DevOps",
            secondary: ["Cost Optimization", "Infrastructure"],
            tags: ["Kubernetes", "AWS", "Cost", "Scaling"]
        },
        hero: {
            title: "Kubernetes Cost Optimization: Stopping the Bleeding",
            subtitle: "You requested 4GB of RAM. You are using 400MB. We need to talk.",
            image: {
                alt: "Kubernetes pods stacked like shipping containers",
                prompt: "Abstract visualization of shipping containers or kubernetes pods, some glowing green (efficient), others red (waste), financial graph overlay.",
                mood: "Industrial, efficient, structured",
                placement: "hero"
            }
        },
        sections: [
            {
                heading: "The Request vs. Usage Gap",
                paragraphs: [
                    { text: "The root cause of K8s waste is mismatched resource requests. Developers set requests high to be safe. Ops sets limits higher to avoid OOMKilled." },
                    { text: "Use the **Goldilocks** tool or **Kubecost** to visualize the gap between requested and actual usage. You will likely find 50% waste immediately." }
                ]
            },
            {
                heading: "Spot Instances Done Right",
                paragraphs: [
                    { text: "Spot instances are 70% cheaper, but they can vanish. Do not put stateful workloads on Spot unless you are very brave." },
                    { text: "Use **Karpenter** for node provisioning. It creates nodes that perfectly fit your pending pods, rather than using rigid node groups. It handles Spot interruption gracefully by spinning up replacements fast." }
                ],
                quote: {
                    text: "If your cluster autoscaler is not aggressive, you are paying for empty space. Bin packing is the game.",
                    tone: "warning"
                }
            },
            {
                heading: "VPA vs HPA: The Battle",
                paragraphs: [
                    { text: "Vertical Pod Autoscaling (VPA) adjusts the size of the pod. Horizontal Pod Autoscaling (HPA) adjusts the count." },
                    { text: "**Do not mix them on the same metric** (like CPU). They will fight. Use VPA to right-size your requests recommendation, and HPA to handle traffic spikes." }
                ]
            }
        ],
        closing: {
            takeaway: "Cost optimization is not a one-time project. It is a continuous loop of measurement, right-sizing, and automated provisioning.",
            image: {
                alt: "Efficient bin packing visualization",
                prompt: "3D tetris blocks fitting perfectly together, efficient space utilization, glowing green, clean and satisfying.",
                mood: "Satisfying, optimized",
                placement: "closing"
            }
        },
        internalLinks: {
            products: [],
            blogs: ["connection-pooling-at-scale-what-breaks-first"],
            categories: ["DevOps"]
        }
    },
    {
        id: "b005-2026-02-07-vector-db",
        slug: "vector-database-indexing-tradeoffs",
        seo: {
            title: "Vector Database Indexing: HNSW vs IVF vs Flat",
            description: "Understanding the precision-recall-latency triangle in vector search. When to use HNSW, when to compress with PQ, and when specific DBs fail.",
            keywords: ["Vector Database", "HNSW", "IVF", "AI Search", "Embeddings", "RAG"]
        },
        meta: {
            publishedAt: "2026-02-08T14:00:00Z",
            readTime: "13 min read",
            language: "en",
            intent: "educational"
        },
        author: {
            id: "arun",
            voiceTagline: "Deconstructing the AI stack."
        },
        taxonomy: {
            primary: "AI Data Systems",
            secondary: ["Database", "Search"],
            tags: ["Vector DB", "RAG", "Embeddings", "Performance"]
        },
        hero: {
            title: "Vector Database Indexing: HNSW vs IVF vs Flat",
            subtitle: "Recall is expensive. Latency is critical. Memory is limited. Pick two.",
            image: {
                alt: "Geometric vector space visualization",
                prompt: "High tech geometric visualization of vector space, points connected by lines, searching algorithms visualised, neon colors.",
                mood: "Mathematical, precise, neon",
                placement: "hero"
            }
        },
        sections: [
            {
                heading: "The Curse of Dimensionality",
                paragraphs: [
                    { text: "Searching through 1M vectors of 1536 dimensions (OpenAI ada-002) is brute-force impossible in real time. We need approximate nearest neighbor (ANN) search." },
                    { text: "This entails a tradeoff: **Recall**. You might miss the absolute best match to get an answer in 50ms instead of 5s." }
                ]
            },
            {
                heading: "HNSW: The Gold Standard",
                paragraphs: [
                    { text: "Hierarchical Navigable Small World (HNSW) graphs are the default for a reason. They offer excellent speed-recall balance." },
                    { text: "But HNSW is **memory hungry**. The graph structure needs to be in RAM for speed. If you have 100M vectors, your RAM bill will explode." }
                ],
                quote: {
                    text: "If your dataset fits in RAM, use HNSW. If it doesn't, you need DiskANN or Product Quantization (PQ).",
                    tone: "reflexion"
                }
            },
            {
                heading: "Product Quantization (PQ)",
                paragraphs: [
                    { text: "PQ compresses vectors, reducing memory usage by 10-64x. But you lose precision. In RAG pipelines, this might mean retrieving slightly less relevant context." },
                    { text: "Always measure your recall/accuracy loss before turning on compression. For semantic search, a small drop is usually acceptable." }
                ]
            }
        ],
        closing: {
            takeaway: "Don't just pick a vector DB. Pick an indexing strategy that matches your dataset size and latency requirements.",
            image: {
                alt: "Search algorithm pathfinding",
                prompt: "Glowing path finding through a maze of data points, efficient routing, algorithm visualization.",
                mood: "Intelligent, fast",
                placement: "closing"
            }
        },
        internalLinks: {
            products: [],
            blogs: ["understanding-llm-inference-cost-curves-in-production"],
            categories: ["AI Data Systems"]
        }
    },
    {
        id: "b006-2026-02-07-redis-caching",
        slug: "redis-caching-strategies-high-throughput",
        seo: {
            title: "Redis Caching Patterns for High Throughput Systems",
            description: "Cache-Aside, Write-Through, and the Thundering Herd problem. How to design a caching layer that doesn't crash your database when it fails.",
            keywords: ["Redis", "Caching", "System Design", "Backend", "Performance", "Scalability"]
        },
        meta: {
            publishedAt: "2026-02-09T09:00:00Z",
            readTime: "10 min read",
            language: "en",
            intent: "educational"
        },
        author: {
            id: "shobhit",
            voiceTagline: "Keeping latencies low and systems up."
        },
        taxonomy: {
            primary: "Backend Systems",
            secondary: ["Performance", "Database"],
            tags: ["Redis", "Caching", "System Design"]
        },
        hero: {
            title: "Redis Caching Patterns for High Throughput Systems",
            subtitle: "A cache should protect your database, not become a new single point of failure.",
            image: {
                alt: "Fast data streams entering a cache layer",
                prompt: "Fast moving data streams, caching layers, key-value paired visual representation, speed motion blur, red and white color scheme.",
                mood: "Fast, dynamic, red-accented",
                placement: "hero"
            }
        },
        sections: [
            {
                heading: "The Thundering Herd Problem",
                paragraphs: [
                    { text: "When a popular cache key expires, 10,000 requests might hit your backend simultaneously to regenerate it. Your database dies." },
                    { text: "**Solution:** Probabilistic early expiration (jitter) or request coalescing (singleflight)." },
                    { text: "Never set a hard TTL on a hot key without a strategy for its regeneration." }
                ]
            },
            {
                heading: "Cache Penetration vs. Bypass",
                paragraphs: [
                    { text: "**Cache Penetration:** Users querying for non-existent IDs. If you don't cache 'null' results, these hit your DB every time. Cache negative lookups." },
                    { text: "**Cache Bypass:** Sometimes you need the truth. Ensure your API has a mechanism (like a private header) to bypass cache for debugging critical issues." }
                ],
                quote: {
                    text: "There are only two hard things in Computer Science: cache invalidation and naming things.",
                    tone: "insight"
                }
            },
            {
                heading: "Redis Clustering vs Sentinel",
                paragraphs: [
                    { text: "Cluster shards your data. Sentinel provides HA for a single master. Know the difference." },
                    { text: "If your dataset is small (<20GB) but traffic is high, use Sentinel (replication). If data is huge, use Cluster (sharding). Most apps need replication, not sharding." }
                ]
            }
        ],
        closing: {
            takeaway: "Treat your cache as a volatile optimization, not a persistent store. If your app crashes when Redis empties, your architecture is brittle.",
            image: {
                alt: "Shield protecting database from request storm",
                prompt: "Digital shield blocking a storm of requests, data flowing smoothly behind it, protection and resilience concept.",
                mood: "Protective, resilient",
                placement: "closing"
            }
        },
        internalLinks: {
            products: [],
            blogs: ["connection-pooling-at-scale-what-breaks-first"],
            categories: ["Backend Systems"]
        }
    },
    {
        id: "b007-2026-02-07-monorepo-polyrepo",
        slug: "monorepo-vs-polyrepo-at-scale",
        seo: {
            title: "Monorepo vs Polyrepo: The 2026 Perspective",
            description: "Turborepo, Nx, and the tooling revolution. Why the industry moved back to Monorepos and when you should stay away.",
            keywords: ["Monorepo", "Polyrepo", "Turborepo", "Nx", "Developer Experience", "Engineering Management"]
        },
        meta: {
            publishedAt: "2026-02-09T14:00:00Z",
            readTime: "12 min read",
            language: "en",
            intent: "opinion"
        },
        author: {
            id: "manish",
            voiceTagline: "Optimizing the developer loop."
        },
        taxonomy: {
            primary: "Engineering Culture",
            secondary: ["DevOps", "Tooling"],
            tags: ["Monorepo", "git", "Turborepo", "DevEx"]
        },
        hero: {
            title: "Monorepo vs Polyrepo: The 2026 Perspective",
            subtitle: "Code sharing is easy. Dependency management is hell. Pick your poison.",
            image: {
                alt: "Comparison of fortress (monorepo) vs islands (polyrepo)",
                prompt: "Two architectural structures comparing a single massive fortress vs many small interconnected islands, stylized, blueprint aesthetic.",
                mood: "Structural, comparative",
                placement: "hero"
            }
        },
        sections: [
            {
                heading: "The Dependency Hell of Polyrepos",
                paragraphs: [
                    { text: "In a polyrepo world, you update a shared UI library. Now you must PR, review, merge, and publish it." },
                    { text: "Then you go to 5 other repos, bump the version, PR, and merge. It takes days to ship a button color change." },
                    { text: "Monorepos solve this with atomic connects. You change the button and the app in one PR." }
                ]
            },
            {
                heading: "The Tooling Tax of Monorepos",
                paragraphs: [
                    { text: "A monorepo without good tooling is a disaster. CI times explode. Git status gets slow." },
                    { text: "You need **Remote Caching** (Turborepo/Nx). You need to build only what changed. If you don't invest in this, your devs will hate you." }
                ],
                quote: {
                    text: "Monorepos are not about code storage. They are about code collaboration and consistency.",
                    tone: "opinion"
                }
            },
            {
                heading: "When to Split",
                paragraphs: [
                    { text: "If you have distinct teams with distinct deploy cycles and zero code sharing, force-fitting a monorepo adds friction." },
                    { text: "But for 90% of product companies, the friction of code sharing in polyrepos is higher than the tooling cost of a monorepo." }
                ]
            }
        ],
        closing: {
            takeaway: "Start with a monorepo. Use Turborepo. Split only when your organization structure demands it (e.g., security boundaries).",
            image: {
                alt: "Unified blueprint with modular sections",
                prompt: "Complex architectural blueprint that is unified but modular, clean lines, organized structure.",
                mood: "Organized, structured",
                placement: "closing"
            }
        },
        internalLinks: {
            products: [],
            blogs: ["kubernetes-cost-optimization-strategies"],
            categories: ["Engineering Culture"]
        }
    },
    {
        id: "b008-2026-02-07-load-testing-reality",
        slug: "load-testing-vs-ddos-attack",
        seo: {
            title: "Load Testing Patterns: Are You Just DDoSing Yourself?",
            description: "Most load tests define the 'breaking point' incorrectly. How to simulate real user behavior with JMeter instead of just hammering API endpoints.",
            keywords: ["Load Testing", "JMeter", "QA", "Performance", "Reliability", "E-commerce"]
        },
        meta: {
            publishedAt: "2026-02-10T09:00:00Z",
            readTime: "11 min read",
            language: "en",
            intent: "framework"
        },
        author: {
            id: "vivek",
            voiceTagline: "Quality is not an accident; it is an engineered outcome."
        },
        taxonomy: {
            primary: "Quality Engineering",
            secondary: ["Performance", "DevOps"],
            tags: ["JMeter", "Load Testing", "QA", "Scale"]
        },
        hero: {
            title: "Load Testing Patterns: Are You Just DDoSing Yourself?",
            subtitle: "Hitting your login endpoint with 10k requests isn't testing. It's vandalism.",
            image: {
                alt: "Traffic jam vs organized highway visualization",
                prompt: "Compare chaotic traffic jam vs organized high speed futuristic highway, data packets as cars, neon lights, highly detailed.",
                mood: "Chaotic vs Ordered",
                placement: "hero"
            }
        },
        sections: [
            {
                heading: "The 'Happy Path' Fallacy",
                paragraphs: [
                    { text: "Rookie load tests hit the home page and product page. Real users search, filter, add to cart, abandon cart, come back, and then checkout." },
                    { text: "If your load test doesn't model the **think time** and **user journey**, you are optimizing for a scenario that never happens." },
                    { text: "I've seen platforms handle 50k RPS on the home page and crash with 500 concurrents on Checkout because of DB locking." }
                ],
                quote: {
                    text: "A 200 OK response does not mean success if the latency was 5 seconds.",
                    tone: "warning"
                }
            },
            {
                heading: "JMeter at Scale",
                paragraphs: [
                    { text: "JMeter is not just for hitting endpoints. Use it to assert logic. Did the cart actually update? Did the inventory deduct?" },
                    { text: "Distributed testing is key. Generating 10k users from one laptop just tests your laptop's network card, not your server." }
                ]
            }
        ],
        closing: {
            takeaway: "Test for behavior, not just volume. Your goal is to find the bottleneck, not just to crash the server.",
            image: {
                alt: "Precision instruments measuring performance",
                prompt: "High precision digital gauges and measurement tools, futuristic lab setting, graph analytics on screens.",
                mood: "Precise, analytical",
                placement: "closing"
            }
        },
        internalLinks: {
            products: [],
            blogs: ["connection-pooling-at-scale-what-breaks-first"],
            categories: ["Quality Engineering"]
        }
    },
    {
        id: "b009-2026-02-07-ecommerce-reliability",
        slug: "why-ecommerce-sites-crash-black-friday",
        seo: {
            title: "Why E-commerce Sites Crash on Black Friday (It's Not Traffic)",
            description: "The hidden killers of e-commerce performance: Third-party scripts, unoptimized images, and cache stampedes during flash sales.",
            keywords: ["E-commerce", "Adobe Commerce", "Scalability", "Black Friday", "Web Performance"]
        },
        meta: {
            publishedAt: "2026-02-10T14:00:00Z",
            readTime: "12 min read",
            language: "en",
            intent: "educational"
        },
        author: {
            id: "vivek",
            voiceTagline: "Ensuring transactions flow when it matters most."
        },
        taxonomy: {
            primary: "E-commerce Tech",
            secondary: ["Performance", "Architecture"],
            tags: ["Magento", "Adobe Commerce", "Caching", "Sales"]
        },
        hero: {
            title: "Why E-commerce Sites Crash on Black Friday",
            subtitle: "It's rarely the server CPU. It's usually the inventory write-lock.",
            image: {
                alt: "Shopping cart under heavy load visualization",
                prompt: "Digital shopping cart struggling under massive weight of data packets, sparks flying, server rack in background redlining.",
                mood: "Intense, critical",
                placement: "hero"
            }
        },
        sections: [
            {
                heading: "The Write-Heavy Nightmare",
                paragraphs: [
                    { text: "Browsing is read-heavy (easy to cache). Buying is write-heavy (hard to cache)." },
                    { text: "During a flash sale, everyone hits 'Buy' at once. The database locks the inventory row for that Item ID. Transactions queue up. Timeouts happen." },
                    { text: "The solution is asynchronous inventory reservation or optimistic locking strategies." }
                ]
            },
            {
                heading: "Third-Party Tags are Toxic",
                paragraphs: [
                    { text: "Marketing wants 50 trackers. Each one adds 200ms of JS execution. On mobile, this kills conversion." },
                    { text: "Audit your tag manager. If a script blocks the main thread, it is costing you revenue." }
                ]
            }
        ],
        closing: {
            takeaway: "Performance is a feature. If users can't checkout, your marketing budget is incinerated.",
            image: {
                alt: "Smooth checkout flow visualization",
                prompt: "Green light flow through a checkout tunnel, speed lines, successful transaction symbols.",
                mood: "Smooth, successful",
                placement: "closing"
            }
        },
        internalLinks: {
            products: [],
            blogs: ["redis-caching-strategies-high-throughput"],
            categories: ["E-commerce Tech"]
        }
    },
    {
        id: "b010-2026-02-07-qa-automation-pyramid",
        slug: "qa-automation-pyramid-2026",
        seo: {
            title: "The Testing Pyramid in 2026: Why E2E is Still Flaky",
            description: "Revisiting the testing pyramid. Why you rely too much on UI tests and how to push quality left into the developer workflow.",
            keywords: ["QA", "Automation", "Testing", "Playwright", "Cypress", "CI/CD"]
        },
        meta: {
            publishedAt: "2026-02-11T09:00:00Z",
            readTime: "9 min read",
            language: "en",
            intent: "opinion"
        },
        author: {
            id: "vivek",
            voiceTagline: "Defect prevention > Defect detection."
        },
        taxonomy: {
            primary: "Quality Engineering",
            secondary: ["DevOps", "Testing"],
            tags: ["Automation", "CI/CD", "Testing Pyramid"]
        },
        hero: {
            title: "The Testing Pyramid in 2026: Why E2E is Still Flaky",
            subtitle: "If your CI takes 45 minutes, you don't have a safety net. You have a bottleneck.",
            image: {
                alt: "Pyramid structure of testing layers",
                prompt: "Digital pyramid structure, base is wide (Unit), middle (Integration), top is small (E2E), glowing layers.",
                mood: "Structural, balanced",
                placement: "hero"
            }
        },
        sections: [
            {
                heading: "The Ice Cream Cone Anti-Pattern",
                paragraphs: [
                    { text: "Most teams have an ice cream cone: Huge E2E suite (slow, flaky), small integration layer, and tiny unit test layer." },
                    { text: "Invert it. 70% of tests should run in milliseconds (Unit). 20% in seconds (Integration). 10% in minutes (E2E)." }
                ]
            },
            {
                heading: "Defect Tracking is Data Science",
                paragraphs: [
                    { text: "Don't just log bugs. Analyze clusters. If 40% of bugs are in the Checkout module, stop building features there and refactor." },
                    { text: "Quality Intelligence means predicting where the next bug will be based on code churn." }
                ]
            }
        ],
        closing: {
            takeaway: "A flaky test is worse than no test. Delete it or fix it. Do not ignore it.",
            image: {
                alt: "Bug being crushed or eliminated",
                prompt: "Minimalist graphic of a digital bug being targeted and eliminated by a laser precision tool.",
                mood: "Decisive, clean",
                placement: "closing"
            }
        },
        internalLinks: {
            products: [],
            blogs: ["monorepo-vs-polyrepo-at-scale"],
            categories: ["Quality Engineering"]
        }
    },
    {
        id: "b011-2026-02-07-zero-downtime-migrations",
        slug: "zero-downtime-database-migrations",
        seo: {
            title: "Zero Downtime Migrations: The Expand-Contract Pattern",
            description: "Renaming a column safely in a 1TB database without locking the table or taking the site down.",
            keywords: ["Database", "Migrations", "PostgreSQL", "DevOps", "Backend"]
        },
        meta: {
            publishedAt: "2026-02-11T14:00:00Z",
            readTime: "13 min read",
            language: "en",
            intent: "educational"
        },
        author: {
            id: "shobhit",
            voiceTagline: "Keeping the engine running while changing the tires."
        },
        taxonomy: {
            primary: "Backend Systems",
            secondary: ["Database", "Ops"],
            tags: ["Migrations", "PostgreSQL", "Deployments"]
        },
        hero: {
            title: "Zero Downtime Migrations: The Expand-Contract Pattern",
            subtitle: "`ALTER TABLE RENAME` locks your table. Here is how to do it safely.",
            image: {
                alt: "Database schema evolving without breaking",
                prompt: "Abstract database schema evolving, fluid transformation, no breaks in the flow, continuous stream.",
                mood: "Fluid, continuous",
                placement: "hero"
            }
        },
        sections: [
            {
                heading: "The Four-Step Dance",
                paragraphs: [
                    { text: "1. **Expand:** Add the new column (nullable)." },
                    { text: "2. **Dual Write:** Update application to write to both old and new columns." },
                    { text: "3. **Backfill:** Script to copy old data to new column in batches." },
                    { text: "4. **Contract:** Switch reads to new column, stop writing to old, and drop the old column." }
                ]
            },
            {
                heading: "Lock Awareness",
                paragraphs: [
                    { text: "Adding a column with a default value used to lock the table in PG < 11. Know your database version." },
                    { text: "Always set `lock_timeout` in your migration script. If it can't acquire the lock in 5s, fail fast rather than queuing all production traffic behind you." }
                ]
            }
        ],
        closing: {
            takeaway: "Downtime is a choice. With discipline, even the most complex schema changes can be online operations.",
            image: {
                alt: "Gears shifting smoothly in motion",
                prompt: "Mechanical gears shifting smoothly while rotating, sparks of energy, synchronized motion.",
                mood: "Synchronized, smooth",
                placement: "closing"
            }
        },
        internalLinks: {
            products: [],
            blogs: ["connection-pooling-at-scale-what-breaks-first"],
            categories: ["Backend Systems"]
        }
    },
    {
        id: "b012-2026-02-07-developer-experience-roi",
        slug: "roi-of-developer-experience",
        seo: {
            title: "The ROI of Developer Experience: Why Fast Builds Matter",
            description: "DevEx is not about pampering engineers. It's about loop velocity. Calculating the cost of a 10-minute CI pipeline.",
            keywords: ["Developer Experience", "DevEx", "Productivity", "Engineering Management"]
        },
        meta: {
            publishedAt: "2026-02-12T09:00:00Z",
            readTime: "10 min read",
            language: "en",
            intent: "contrarian"
        },
        author: {
            id: "arun",
            voiceTagline: "Velocity is the only competitive advantage."
        },
        taxonomy: {
            primary: "Engineering Culture",
            secondary: ["Management", "Productivity"],
            tags: ["DevEx", "Velocity", "CI/CD"]
        },
        hero: {
            title: "The ROI of Developer Experience: Why Fast Builds Matter",
            subtitle: "If I have to context switch while waiting for a build, you lost 20 minutes, not 2.",
            image: {
                alt: "Race car pit stop speed comparison",
                prompt: "Split screen comparing a Formula 1 pit stop (fast) vs a broken down car (slow), motion blur, speed lines.",
                mood: "Fast, competitive",
                placement: "hero"
            }
        },
        sections: [
            {
                heading: "The Context Switch Tax",
                paragraphs: [
                    { text: "A 5-minute build doesn't waste 5 minutes. It breaks flow state. The engineer checks Slack, then Email, then Twitter." },
                    { text: "It takes 15-20 minutes to re-enter flow. That 5-minute build just cost you 25 minutes of productivity." }
                ]
            },
            {
                heading: "Local Environment Latency",
                paragraphs: [
                    { text: "If `npm start` takes 90 seconds, your team is shipping 30% less code. Period." },
                    { text: "Invest in M-series Macs, remote dev environments, and build caching. It is the highest leverage money you can spend." }
                ]
            }
        ],
        closing: {
            takeaway: "DevEx is business leverage. Fast feedback loops create better products, faster.",
            image: {
                alt: "Infinity loop of feedback",
                prompt: "Glowing infinity loop representing continuous feedback, fast speed, neon blue, dark background.",
                mood: "Infinite, fast",
                placement: "closing"
            }
        },
        internalLinks: {
            products: [],
            blogs: ["monorepo-vs-polyrepo-at-scale"],
            categories: ["Engineering Culture"]
        }
    }
];

/**
 * Get blog post by slug
 * @param {string} slug
 * @returns {import('./blogTypes').BlogV2|undefined}
 */
export const getBlogBySlug = (slug) => blogPosts.find(post => post.slug === slug);

/**
 * Get blogs by author
 * @param {string} authorId
 * @returns {import('./blogTypes').BlogV2[]}
 */
export const getBlogsByAuthor = (authorId) => blogPosts.filter(post => post.author.id === authorId);

/**
 * Get blogs by category
 * @param {string} category
 * @returns {import('./blogTypes').BlogV2[]}
 */
export const getBlogsByCategory = (category) => blogPosts.filter(post =>
    post.taxonomy.primary === category || (post.taxonomy.secondary && post.taxonomy.secondary.includes(category))
);

/**
 * Get all unique categories
 * @returns {string[]}
 */
export const getAllCategories = () => {
    const categories = new Set();
    blogPosts.forEach(post => {
        if (post.taxonomy.primary) {
            categories.add(post.taxonomy.primary);
        }
        if (post.taxonomy.secondary && Array.isArray(post.taxonomy.secondary)) {
            post.taxonomy.secondary.forEach(cat => categories.add(cat));
        }
    });
    return Array.from(categories);
};

export { authors };
