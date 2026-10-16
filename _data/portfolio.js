// Portfolio projects. Each entry renders a card on /portfolio/ and a detail
// page at /portfolio/<slug>/. Add new projects to this list. `featured: n`
// puts a project in the home page's featured list, in that order.
export default [
  {
    slug: 'envelopebudget',
    name: 'EnvelopeBudget',
    url: 'https://envelopebudget.com',
    icon: '/images/eb.webp',
    cover: '/images/portfolio/envelopebudget-cover.webp',
    featured: 1,
    coverAlt: 'EnvelopeBudget social card: Your money. Your plan. Your peace of mind. beside the transactions screen',
    tagline: 'Envelope budgeting for couples and families',
    summary:
      'An indie-built envelope budgeting app for web, iPhone, and Android. Give every dollar a job, sync your bank, and know what you can spend before you spend it.',
    role: 'Founder · Solo developer',
    years: '2009 – present',
    status: 'Live',
    stack: ['Python', 'Django', 'Svelte', 'PostgreSQL', 'Plaid', 'SimpleFIN', 'iOS', 'Android', 'MCP'],
    links: [
      { label: 'envelopebudget.com', url: 'https://envelopebudget.com' },
      { label: 'App Store', url: 'https://apps.apple.com/us/app/envelopebudget-com/id6747729124' },
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.envelopebudget.android' },
      { label: 'GitHub', url: 'https://github.com/envelope-budget' },
    ],
    story: [
      'EnvelopeBudget started life in 2009 as Inzolo, a side project I built to teach a friend web development and to scratch my own itch: I had been broke a lot, and the cash envelope system was the only budgeting method that ever stuck. It was also my first real Django app, written before Django hit 1.0.',
      "I later picked up the EnvelopeBudget.com domain and rewrote the product to fix Inzolo's architecture. Over the years it survived patent cease-and-desist letters, the death of OFX direct connect, and long stretches of neglect while my day job took priority.",
      'Then I rebuilt it from the ground up. Seventeen years in, it is still indie: no ads, no investors, no upsell tiers. One price, every feature.',
    ],
    highlights: [
      {
        title: 'Bank sync that reconciles',
        body: 'Plaid and SimpleFIN imports compare the bank to the ledger, account for pending items, and show a receipt-style breakdown of any difference.',
      },
      {
        title: 'Debt Center',
        body: 'Cards and loans become a snowball or avalanche plan with a debt-free date, payoff order, and what-if sliders.',
      },
      {
        title: 'Shared budgets',
        body: 'Family & Team gives everyone their own login with viewer or editor access per budget, synced in real time across devices.',
      },
      {
        title: 'Amazon order matching',
        body: 'A Chrome extension matches each Amazon charge to its order and adds the item names, with one-click undo.',
      },
      {
        title: 'Native mobile apps',
        body: 'iPhone, iPad, and Android apps with offline entry, Face ID, and a guided Budget Bootcamp for the first week.',
      },
      {
        title: 'AI-ready',
        body: 'An official MCP server and REST API with OAuth, so you can ask Claude or ChatGPT what is left in groceries.',
      },
      {
        title: 'Easy switching',
        body: 'Imports from YNAB and Actual Budget bring accounts, envelopes, full history, splits, and transfers.',
      },
    ],
    related: [
      { label: 'Starting a New Side Hustle Startup', url: '/blog/starting-a-new-side-hustle-startup/' },
      {
        label: "Why the Cash Envelope System Didn't Work for Us",
        url: '/blog/why-the-cash-envelope-system-didnt-work-for-us/',
      },
    ],
  },
  {
    slug: 'redseam',
    name: 'Red Seam',
    url: 'https://redseam.com',
    icon: '/images/rs.webp',
    cover: '/images/portfolio/redseam-cover.webp',
    coverAlt: 'Red Seam Technologies social card: Fast, Profitable Websites & Apps beside glowing red baseball stitching',
    featured: 2,
    tagline: 'Big-league websites for small businesses',
    summary:
      'My freelance studio. Fast, professional websites, apps, and automations for small businesses, without enterprise pricing or agency bloat.',
    role: 'Founder · Developer',
    years: '2014 – present',
    status: 'Live',
    stack: ['Eleventy', 'SvelteKit', 'Node.js', 'PHP', 'PostgreSQL', 'SQLite', 'Netlify', 'Caddy', 'SEO'],
    links: [
      { label: 'redseam.com', url: 'https://redseam.com' },
      { label: 'Free tools', url: 'https://redseam.com/tools/' },
    ],
    story: [
      'Red Seam Technologies is where I take on client work. I have spent 25+ years building software used by millions of people, and Red Seam brings that experience to Main Street: local shops, service businesses, and community sites that deserve a website they are proud to share.',
      'Most projects launch within a few business days of the content being ready, with a fixed-price quote up front. Beyond websites I build web apps, mobile apps, APIs, and automations, and if something is not a good fit I will point you to someone who can help.',
      'The portfolio now covers more than twenty live projects, from a dental practice and a spa dealership to community news sites, directories, and my own products. The site also hosts free tools I use myself, like an Open Graph preview, a favicon generator, and a teleprompter.',
    ],
    highlights: [
      {
        title: 'Fixed-price quotes',
        body: 'A free consultation and a clear price before work starts. No hourly surprises.',
      },
      {
        title: 'Fast by default',
        body: 'Edge-cached, sub-second sites built with Core Web Vitals in mind from the first commit.',
      },
      {
        title: 'On-page SEO',
        body: 'Search-intent mapping, structured data, and technical architecture that helps local businesses get found.',
      },
      {
        title: 'Conversion UX',
        body: 'Clear offers, frictionless forms, and calls to action that turn visitors into customers.',
      },
      {
        title: 'More than websites',
        body: 'Web apps, mobile apps, APIs, ecommerce, and the automations that keep them running without you.',
      },
      {
        title: 'Free tools',
        body: 'Open Graph preview, favicon generator, and teleprompter, free for anyone to use.',
      },
    ],
    related: [{ label: 'Building an App with AI', url: '/blog/building-an-app-with-ai/' }],
  },
  {
    slug: 'slimlytics',
    name: 'Slimlytics',
    url: 'https://slimlytics.com',
    icon: '/images/slimlytics.webp',
    cover: '/images/portfolio/slimlytics-cover.webp',
    featured: 3,
    coverAlt: 'Slimlytics social card: Know what works. Skip the noise. beside a live visitor dashboard',
    tagline: 'Private, real-time web analytics',
    summary:
      'Privacy-first, self-hostable web analytics. Cookieless by default, with a live visitor stream, goals, and an MCP server so your AI agent can install it for you.',
    role: 'Founder · Developer',
    years: '2026 – present',
    status: 'Live',
    stack: ['Rust', 'SvelteKit', 'PostgreSQL', 'Docker Compose', 'Caddy', 'MCP'],
    links: [
      { label: 'slimlytics.com', url: 'https://slimlytics.com' },
      { label: 'GitHub', url: 'https://github.com/djedi/slimlytics' },
    ],
    story: [
      'Slimlytics answers the site-analytics questions that matter (what pages people read, where they came from, what they did) without building cross-site profiles. No tracking cookies, no fingerprinting, no session replay, and Do Not Track and Global Privacy Control are respected.',
      'It is open source and built to be small: a Rust API, a SvelteKit dashboard, and PostgreSQL, shipped with Docker Compose and Caddy. Self-host it for free, or use Slimlytics Cloud.',
      'It is also agent-native. A remote MCP server with browser OAuth lets Claude Code, Codex, or Hermes create a site, wire up first-party proxy routes, verify the first page view, and pull reports straight from the terminal.',
    ],
    highlights: [
      {
        title: 'Cookieless by default',
        body: 'Measures traffic without tracking cookies, invasive fingerprints, or form capture.',
      },
      {
        title: 'Real-time Spy',
        body: 'Watch visitors arrive live over Server-Sent Events, with every page view and goal streaming in as it happens.',
      },
      {
        title: 'Reports that matter',
        body: 'Pages, referrers, countries, devices, and campaigns, ranked and ready to export.',
      },
      {
        title: 'Goals & custom events',
        body: 'Track signups, downloads, outbound clicks, and whatever else matters to you.',
      },
      {
        title: 'First-party proxy',
        body: 'Serve the tracker from your own domain with Caddy, Nginx, or Apache routes so ad blockers interfere less.',
      },
      {
        title: 'Agent-native setup',
        body: 'An MCP server lets your coding agent install tracking, verify collection, and query marketing briefs.',
      },
    ],
  },
  {
    slug: 'docmanfu',
    name: 'DocManFu',
    url: 'https://docmanfu.com',
    icon: '/images/docmanfu.webp',
    cover: '/images/portfolio/docmanfu-cover.webp',
    coverAlt: 'DocManFu social card: a relaxed panda in sunglasses with a laptop beside the document dashboard',
    featured: 4,
    tagline: 'Document management for the lazy',
    summary:
      'Open-source, self-hosted document management. Scan it and walk away: OCR makes it searchable, AI names and tags it, and bills land on a to-pay list.',
    role: 'Creator · Developer',
    years: '2026 – present',
    status: 'Live',
    stack: [
      'Python',
      'Svelte',
      'TypeScript',
      'Go',
      'PostgreSQL',
      'Redis',
      'Docker',
      'OCR',
      'OpenAI / Anthropic / Ollama',
    ],
    links: [
      { label: 'docmanfu.com', url: 'https://docmanfu.com' },
      { label: 'GitHub', url: 'https://github.com/DocManFu/DocManFu' },
    ],
    story: [
      'I built DocManFu for a very practical reason: I wanted to cancel my Evernote subscription. I had documents to keep and wanted to find them again, without paying rent on my own filing cabinet.',
      'My workflow is simple. The ScanSnap drops a PDF into my Downloads folder, a small docmanfu CLI notices it and sends it to the server, and I never touch it again. OCR makes the words inside the scan searchable, and optional AI analysis gives the document a sane name, extracts details, adds tags, and works out whether it is a bill.',
      'Bills were the surprise. Recognized bills show up on a bills page with any payment link the AI found, so the page has become my to-do list for what I owe. DocManFu is MIT-licensed and self-hostable, and a hosted version may come for people who would rather not run a server.',
    ],
    highlights: [
      {
        title: 'Scan and walk away',
        body: 'A CLI watches a folder and uploads new scans automatically. No second chore.',
      },
      {
        title: 'OCR + full-text search',
        body: 'Image-only scans become searchable. Find documents by content, name, type, tags, or date.',
      },
      {
        title: 'AI organization',
        body: 'Classifies documents, suggests names, extracts metadata, and adds tags. Optional, and works with OpenAI, Anthropic, or local Ollama.',
      },
      {
        title: 'Bill tracking',
        body: 'Bills get amounts, due dates, payment links, and a paid/unpaid status, so nothing slips.',
      },
      {
        title: 'Self-hosted & open source',
        body: 'MIT-licensed and shipped with Docker Compose. Your documents stay on your hardware.',
      },
      {
        title: 'Multi-user',
        body: 'JWT authentication with admin and user roles for households and small teams.',
      },
    ],
    related: [
      {
        label: 'I Built My Own Evernote Replacement. Seven Months Later, I Love It.',
        url: '/blog/docmanfu-my-evernote-replacement/',
      },
    ],
  },
  {
    slug: 'inzolo',
    name: 'Inzolo',
    url: 'https://inzolo.com',
    icon: '/images/inzolo.webp',
    cover: '/images/portfolio/inzolo-cover.webp',
    coverAlt: "Inzolo's gazelle mascot in a green bandana, waving",
    tagline: 'The budgeting app calm enough to open every day',
    summary:
      'My original envelope budgeting app, reborn. Inzolo turns a messy pile of transactions into one quiet review queue and tells you, in plain words, what to do next.',
    role: 'Founder · Developer',
    years: '2009 – present',
    status: 'Live',
    stack: ['Go', 'Svelte', 'Plaid', 'SimpleFIN', 'OFX/QFX', 'AI-assisted categorization'],
    links: [{ label: 'inzolo.com', url: 'https://inzolo.com' }],
    story: [
      'Inzolo was my first big side hustle. Around 2007 a friend asked to work on a project with me so he could learn web development, and I had an idea for a budgeting site. I used it as an excuse to learn a new framework and language: Django and Python, before Django even reached 1.0. Along the way I learned about PostgreSQL, banking, marketing, and plenty more.',
      'When I later acquired EnvelopeBudget.com, I rewrote the product there instead of rebranding. In hindsight that was a mistake: I never really retired Inzolo, and spent years maintaining and marketing two budgeting sites.',
      'Today Inzolo has been rebuilt from scratch in Go and Svelte, with a new identity of its own. The name means "peace" in isiXhosa, and the new app is built around that idea: lead with what is safe to spend, surface one clear next step, and let you close the app in under two minutes.',
    ],
    highlights: [
      {
        title: 'One quiet approval queue',
        body: 'Bank sync, CSV, and OFX/QFX imports all land in a single deduplicated queue. Nothing changes a balance until you approve it.',
      },
      {
        title: 'Rules first, AI second',
        body: 'Deterministic payee rules and your own history do the heavy lifting. AI only steps in when unsure, and you always have the final say.',
      },
      {
        title: 'Zero-based envelopes',
        body: 'Ready to Assign, category groups, rollover, and one-tap move-money to cover overspending.',
      },
      {
        title: 'Plain-language status',
        body: 'Labels like Comfortable, Tight, Funded, and Due Soon, plus messages like "Groceries has $82 left for 9 days."',
      },
      {
        title: 'Debt payoff planner',
        body: 'Snowball vs. avalanche side by side, with an extra-payment slider and a real debt-free date.',
      },
      {
        title: 'Priority Ladder (coming next)',
        body: 'A five-step sequence, from giving and an emergency fund to eliminating debt and investing, so you always know your next move.',
      },
    ],
    related: [
      { label: 'Starting a New Side Hustle Startup', url: '/blog/starting-a-new-side-hustle-startup/' },
      { label: 'Mobile App on a Subdomain with Django', url: '/blog/mobile-app-on-subdomain-with-django/' },
    ],
  },
];
