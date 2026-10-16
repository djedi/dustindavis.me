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
    coverAlt:
      'Red Seam Technologies social card: Fast, Profitable Websites & Apps beside glowing red baseball stitching',
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
    coverAlt:
      'Inzolo social card: The budgeting app calm enough to open every day, beside its gazelle mascot resting under an acacia tree',
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
  {
    slug: 'toodue',
    name: 'TooDue',
    url: 'https://toodue.com',
    icon: '/images/toodue.webp',
    cover: '/images/portfolio/toodue-cover.webp',
    coverAlt: "TooDue social card: Get it done before it's too due, beside the app's Today view",
    tagline: 'A fast, open-source to-do app for people who ship',
    summary:
      'A self-hostable Todoist alternative: projects, priorities, repeating tasks, sharing, real-time sync, and a calendar feed, all served by one small Rust binary.',
    role: 'Creator · Developer',
    years: '2026 – present',
    status: 'Beta',
    stack: ['Rust', 'Svelte', 'SQLite', 'SSE', 'PWA', 'SwiftUI', 'Flutter', 'MCP'],
    links: [{ label: 'toodue.com', url: 'https://toodue.com' }],
    story: [
      'TooDue is the task manager I wanted: everything I rely on in Todoist, minus the subscription, and something I can run on my own server.',
      'A single Rust binary with an embedded SQLite database serves both the API and the Svelte PWA. Every change streams to every device over server-sent events, and native iOS and Flutter clients work offline and sync when they reconnect.',
    ],
    highlights: [
      {
        title: 'The four tabs you expect',
        body: 'Inbox, Today, Upcoming, and nested Projects, responsive from phone to desktop.',
      },
      {
        title: 'Full task model',
        body: 'Dates and times, repeating schedules, deadlines, P1–P4 priorities, sub-tasks, comments, and attachments.',
      },
      {
        title: 'Real-time sharing',
        body: 'Invite someone to a project and every change shows up for everyone instantly.',
      },
      {
        title: 'Calendar feed',
        body: 'A private iCal URL puts dated tasks and deadlines in Google Calendar or Fantastical.',
      },
      {
        title: 'Offline-first mobile apps',
        body: 'Native SwiftUI and Flutter clients queue changes offline and replay them when the network returns.',
      },
      {
        title: 'AI agents via MCP',
        body: 'A remote MCP server with OAuth lets Claude, ChatGPT, or Cursor manage your to-dos.',
      },
    ],
  },
  {
    slug: 'growpilot',
    name: 'Grow Pilot',
    url: 'https://growpilot.ag',
    icon: '/images/growpilot.webp',
    cover: '/images/portfolio/growpilot-cover.webp',
    coverAlt:
      "Grow Pilot social card: Know in February whether you'll hit Mother's Day, beside the greenhouse dashboard",
    tagline: "Know in February whether you'll hit Mother's Day",
    summary:
      'Production planning and profit forecasting for greenhouse growers. Grow Pilot turns the production-bible spreadsheet into week-by-week decisions: what to plant, when it will be ready, and whether it will make money.',
    role: 'Creator · Developer',
    years: '2026 – present',
    status: 'Live',
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Svelte', 'TypeScript', 'Docker'],
    links: [{ label: 'growpilot.ag', url: 'https://growpilot.ag' }],
    story: [
      "Small and mid-sized greenhouses run on a production bible: a sprawling spreadsheet of crops, seed dates, and sales targets that breaks the moment something changes. Miss a ready date and you miss Mother's Day, the biggest selling weekend of the year.",
      'Grow Pilot brings the production plan, sales, labor, and budgets into one system, with ready-date forecasts and a weekly company scorecard. It is a multi-tenant SaaS built on FastAPI, PostgreSQL, and Svelte, designed touch-first for the iPads that live on greenhouse floors.',
    ],
    highlights: [
      {
        title: 'Ready-date forecasting',
        body: 'A rules-first crop-timing model projects seed, transplant, and ready weeks, with peak selling dates front and center.',
      },
      {
        title: 'Spreadsheet import',
        body: 'Bring in an existing production bible and get a working plan on day one.',
      },
      {
        title: 'Revenue plan and scorecard',
        body: 'Forecast revenue against targets by category, plus a weekly scorecard for sales, labor, production, and growing.',
      },
      {
        title: 'Production calendar',
        body: 'A week-by-week view of every seed, transplant, and ready event.',
      },
      {
        title: 'Task mode for the floor',
        body: 'An iPad-friendly checklist: tap to complete, week by week.',
      },
      {
        title: 'Teams and accounts',
        body: 'Each greenhouse gets its own isolated workspace, with invite links for teammates.',
      },
    ],
  },
  {
    slug: 'asteroids-quest',
    name: 'Asteroids Quest',
    url: 'https://asteroids.quest',
    icon: '/images/asteroids.webp',
    cover: '/images/portfolio/asteroids-cover.webp',
    coverAlt:
      'Asteroids Quest social card: Arcade classics + a co-op space expedition, with a neon ship blasting asteroids',
    tagline: 'Classic arcade Asteroids, now with co-op and a space expedition',
    summary:
      'Classic Asteroids in the browser, with up to eight ships in online co-op and a solo campaign that sends you beyond the belt.',
    role: 'Creator · Developer',
    years: '2026 – present',
    status: 'Live',
    stack: ['Rust', 'Axum', 'Tokio', 'WebSockets', 'Svelte', 'Canvas', 'Docker'],
    links: [{ label: 'asteroids.quest', url: 'https://asteroids.quest' }],
    story: [
      'Asteroids is the game I come back to whenever I want to test a new tool or model, so I finally built a version worth keeping.',
      'The game renders in the browser on a canvas, while a Rust server runs an authoritative 60 Hz simulation over WebSockets so co-op ships stay in sync.',
    ],
    highlights: [
      { title: 'Arcade mode', body: 'The classic game: pick a cabinet, learn the pattern, and clear the board.' },
      { title: 'Online co-op', body: 'Invite friends for up to eight ships per room, with optional friendly fire.' },
      {
        title: 'Beyond the Belt',
        body: 'A solo expedition: chart routes, manage fuel and hull, clear encounters, and land on planets for resources.',
      },
      { title: 'High scores', body: 'Leaderboards for individual pilots and co-op teams.' },
    ],
  },
  {
    slug: 'missioncallguess',
    name: 'MissionCallGuess',
    url: 'https://missioncallguess.com',
    icon: '/images/missioncallguess.webp',
    cover: '/images/portfolio/missioncallguess-cover.webp',
    coverAlt:
      'MissionCallGuess social card: Where Will They Serve? with family guesses pinned on a world map and a mission call envelope',
    tagline: 'Where will they serve?',
    summary:
      'A guessing game for LDS mission calls. Create a page for your future missionary, share it, and see who guesses closest when the call is opened.',
    role: 'Creator · Developer',
    years: '2026 – present',
    status: 'Live',
    stack: ['Bun', 'Elysia', 'TypeScript', 'SvelteKit', 'PostgreSQL', 'Leaflet', 'Docker Compose'],
    links: [{ label: 'missioncallguess.com', url: 'https://missioncallguess.com' }],
    story: [
      'Opening a mission call is a big moment for Latter-day Saint families, and guessing where the missionary will go is half the fun. MissionCallGuess turns that into a shareable game.',
      'Each missionary gets their own page with an interactive world map of mission boundaries. Friends and family drop their guesses, and after the reveal a leaderboard ranks everyone by distance.',
    ],
    highlights: [
      {
        title: 'Interactive mission map',
        body: 'Click mission boundaries on a Leaflet map built from GeoJSON mission data.',
      },
      { title: 'Personal game pages', body: 'Every missionary gets a friendly URL to share, like /g/elder-smith.' },
      { title: 'Flexible guessing', body: 'Separate US and foreign guesses, or a set number of guesses of any kind.' },
      { title: 'Results and leaderboard', body: 'After the reveal, distance math shows who guessed closest.' },
    ],
  },
  {
    slug: 'webhookspy',
    name: 'WebhookSpy',
    url: 'https://webhookspy.com',
    icon: '/images/webhookspy.webp',
    cover: '/images/portfolio/webhookspy-cover.webp',
    coverAlt: 'WebhookSpy social card: Capture & Inspect Webhooks Instantly',
    tagline: 'Free, open-source webhook testing and debugging',
    summary:
      'Create a webhook URL in one click and watch requests stream in live, with headers, bodies, and query parameters laid out for inspection.',
    role: 'Creator · Developer',
    years: '2025 – present',
    status: 'Live',
    stack: ['Bun', 'Elysia', 'TypeScript', 'Alpine.js', 'Tailwind CSS', 'Eleventy', 'SQLite', 'Redis'],
    links: [{ label: 'webhookspy.com', url: 'https://webhookspy.com' }],
    story: [
      'Every developer who integrates with a third-party API eventually needs to see exactly what a webhook is sending. WebhookSpy is a free, open-source tool for that.',
      'An Elysia server on Bun catches requests and streams them to the inspector over server-sent events. Storage is SQLite by default, with Redis for cloud deployments.',
    ],
    highlights: [
      { title: 'Permanent URLs', body: 'Your webhook URL never expires. Data clears after seven days of inactivity.' },
      {
        title: 'Live inspector',
        body: 'Requests appear instantly, with a sidebar list and a detailed headers and body view.',
      },
      {
        title: 'REST API',
        body: 'Query captured requests by method, path, body, or headers, documented with OpenAPI.',
      },
      { title: 'Secure endpoints', body: 'Optional access keys, rate limiting, and hardened security headers.' },
    ],
    related: [
      {
        label: 'Introducing WebhookSpy: A Free Webhook Testing Tool Built with AI',
        url: '/blog/introducing-webhookspy/',
      },
    ],
  },
  {
    slug: 'nephisgate',
    name: "Nephi's Gate",
    url: 'https://nephisgate.com',
    icon: '/images/nephisgate.webp',
    cover: '/images/portfolio/nephisgate-cover.webp',
    coverAlt: "Nephi's Gate social card: Seek First. Unlock your day. beside a glowing stone gateway on a sunlit path",
    tagline: 'Seek first. Unlock your day.',
    summary:
      'An iOS app that keeps your chosen apps locked until you finish your daily Book of Mormon reading. Put God first, then move forward.',
    role: 'Creator · Developer',
    years: '2026 – present',
    status: 'Live',
    stack: ['Swift', 'SwiftUI', 'Screen Time API', 'Family Controls', 'Eleventy'],
    links: [{ label: 'nephisgate.com', url: 'https://nephisgate.com' }],
    story: [
      "Nephi's Gate is a Shiblon Software app built on a simple idea: read scripture before you scroll. Set a daily reading goal, pick the apps that distract you, and they stay locked until your reading is done.",
      "It uses Apple's official Screen Time and Family Controls APIs, so the lock is real, with no hacks or workarounds.",
    ],
    highlights: [
      {
        title: 'Daily reading timer',
        body: 'An animated progress ring tracks your session. Hit your goal and the gate opens.',
      },
      { title: 'App blocking', body: 'Selected apps stay locked through Screen Time until your reading is complete.' },
      {
        title: 'Built-in reader',
        body: 'Read the Book of Mormon in the app, or jump to Gospel Library or the official Book of Mormon app.',
      },
      { title: 'Streaks and reminders', body: 'Track your streak and personal best, with an optional daily reminder.' },
    ],
  },
  {
    slug: 'shiblon',
    name: 'Shiblon Software',
    url: 'https://shiblon.com',
    icon: '/images/shiblon.webp',
    cover: '/images/portfolio/shiblon-cover.webp',
    coverAlt: 'Shiblon Software logo carved in stone',
    tagline: 'Uplifting tools for modern disciples',
    summary:
      "My LDS-focused software label, started in 2002 and revived in 2025. Home to Book of Mormon 365 and Nephi's Gate.",
    role: 'Founder · Developer',
    years: '2002 – present',
    status: 'Live',
    stack: ['PHP', 'SQLite', 'HTML', 'CSS', 'JavaScript', 'Apache'],
    links: [{ label: 'shiblon.com', url: 'https://shiblon.com' }],
    story: [
      'Shiblon Software started in 2002 with a Palm Pilot app for tracking home teaching families and visits, then grew to include other tools for ward and stake clerks.',
      "After years of focusing on raising five children, I revived Shiblon in 2025 to bring LDS-focused apps back online with modern technology, starting with Book of Mormon 365 and Nephi's Gate.",
    ],
    highlights: [
      { title: 'Book of Mormon 365', body: 'A daily companion that helps everyone read the Book of Mormon every day.' },
      {
        title: "Nephi's Gate",
        body: 'An iOS app that locks distracting apps until your daily scripture reading is done.',
      },
      {
        title: 'No-framework site',
        body: 'Plain HTML, CSS, and JavaScript, with PHP and SQLite behind the mailing list.',
      },
    ],
  },
  {
    slug: 'zapyeti',
    name: 'ZapYeti',
    url: 'https://zapyeti.com',
    icon: '/images/zapyeti.webp',
    cover: '/images/portfolio/zapyeti-cover.webp',
    coverAlt: 'ZapYeti social card: Crush your debt. Find your freedom. with the Yeti smashing a falling bar chart',
    tagline: 'Your path to debt freedom',
    summary:
      'A free debt payoff tracker that makes paying off debt motivating: compare snowball and avalanche plans, see your debt-free date, and watch the progress bar climb.',
    role: 'Creator · Developer',
    years: '2026 – present',
    status: 'Live',
    stack: ['Svelte', 'TypeScript', 'Flutter', 'Dart', 'SimpleFIN', 'Docker'],
    links: [{ label: 'zapyeti.com', url: 'https://zapyeti.com' }],
    story: [
      'Most people start tracking debt in a spreadsheet. It works until you miss a month, then two, and the spreadsheet becomes a monument to guilt.',
      'ZapYeti is built for both kinds of people: detailed tables and payoff math for the spreadsheet nerds, and big visual progress with a cheering Yeti for everyone else.',
    ],
    highlights: [
      {
        title: 'Snowball, avalanche, or custom',
        body: 'Pay the smallest balances first, the highest interest first, or drag debts into your own order.',
      },
      { title: 'Payoff projections', body: 'Charts show exactly when you will be debt-free.' },
      { title: 'Progress and celebrations', body: 'Milestones and celebration moments keep you motivated.' },
      { title: 'Your data, exportable', body: 'Full payment history with JSON and CSV export.' },
    ],
  },
  {
    slug: 'soakers',
    name: 'Soakers',
    url: 'https://soakers.biz',
    icon: '/images/soakers.webp',
    cover: '/images/portfolio/soakers-cover.webp',
    coverAlt:
      'Soakers social card: Your Neighborhood Hot Tub Experts, with a steaming hot tub on a mountain-view deck at dusk',
    tagline: 'Hot tubs and swim spas for Salt Lake City homes',
    summary:
      'Marketing site for my family’s hot tub and swim spa dealership in Midvale, Utah, covering sales, service, parts, and financing.',
    role: 'Developer',
    years: '2020 – present',
    status: 'Live',
    stack: ['Eleventy', 'Nunjucks', 'Sass', 'PurgeCSS', 'eleventy-img', 'Netlify', 'SEO'],
    links: [{ label: 'soakers.biz', url: 'https://soakers.biz' }],
    story: [
      'Soakers is my mom’s business: a family-owned hot tub and swim spa dealer with a showroom in Midvale, Utah.',
      'The site is a fast static build on Eleventy and Netlify, with responsive AVIF/WebP images, a trimmed-down Bootstrap, and local SEO aimed at Salt Lake City, Sandy, Murray, and Draper.',
    ],
    highlights: [
      {
        title: 'Brand catalog',
        body: 'Artesian Spas, Nordic Hot Tubs, TidalFit Swim Spas, South Seas Spas, and more.',
      },
      { title: 'Lean and fast', body: 'PurgeCSS, self-hosted icons, and responsive images keep pages light.' },
      { title: 'Deploy previews', body: 'Every change gets a Netlify preview before it goes live.' },
    ],
    related: [{ label: 'JAMstacks - Gatsby & 11ty', url: '/blog/ja-mstacks-gatsby-and-11ty/' }],
  },
  {
    slug: 'olsonfamilydentistry',
    name: 'Olson Family Dentistry',
    url: 'https://olsonfamilydentistryutah.com',
    icon: '/images/olsonfamilydentistry.webp',
    cover: '/images/portfolio/olsonfamilydentistry-cover.webp',
    coverAlt: 'Olson Family Dentistry social card: Honest Dentistry for Real Families, over snowy Sanpete County hills',
    tagline: 'Honest dentistry for real families',
    summary:
      'Website for a small family dental practice in Mt. Pleasant, Utah, serving families across Sanpete County.',
    role: 'Developer · Red Seam',
    years: '2026 – present',
    status: 'Live',
    stack: ['Eleventy', 'Nunjucks', 'Netlify', 'SEO'],
    links: [{ label: 'olsonfamilydentistryutah.com', url: 'https://olsonfamilydentistryutah.com' }],
    story: [
      'Olson Family Dentistry is a small-town practice where patients see the same friendly faces every visit. The site needed to feel the same way: warm, honest, and easy to use.',
      'Built as a Red Seam project on Eleventy and Netlify, it puts services, hours, and the request-an-appointment button front and center.',
    ],
    highlights: [
      { title: 'Clear calls to action', body: 'Request an appointment or call from any page.' },
      {
        title: 'Services at a glance',
        body: 'Cleanings, fillings, crowns, whitening, root canals, and children’s dentistry.',
      },
      { title: 'Local SEO', body: 'Built to be found by families searching across Sanpete County.' },
    ],
  },
  {
    slug: 'fountaingreenfarmhouse',
    name: 'Fountain Green Farmhouse',
    url: 'https://fountaingreenfarmhouse.com',
    icon: '/images/fountaingreen.webp',
    cover: '/images/portfolio/fountaingreen-cover.webp',
    coverAlt: 'Fountain Green Farmhouse social card: an illustrated red-brick pioneer farmhouse framed by wildflowers',
    tagline: 'Bringing an 1878 pioneer farmhouse back to life',
    summary:
      'Companion site for our family YouTube channel about restoring a historic 1878 farmhouse in Fountain Green, Utah, plus gardening and country living.',
    role: 'Co-creator · Developer',
    years: '2026 – present',
    status: 'Live',
    stack: ['Eleventy', 'Nunjucks', 'YouTube'],
    links: [{ label: 'fountaingreenfarmhouse.com', url: 'https://fountaingreenfarmhouse.com' }],
    story: [
      'Fountain Green Farmhouse documents our adventure restoring a historic 1878 home: the wins, the mistakes, and everything in between.',
      'The site is a simple Eleventy build where each episode gets its own page and story, linking out to the YouTube channel.',
    ],
    highlights: [
      { title: 'Episode pages', body: 'Every video gets a written story alongside it.' },
      { title: 'Restoration, gardening, and DIY', body: 'Home projects, the garden, chickens, and farm life.' },
    ],
  },
];
