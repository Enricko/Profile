// Central catalog for the Projects section. Order matters: the public group
// comes first (led by its featured project), then the private group.
//
// group:   'public' | 'private'  (drives the filter)
// status:  'open-source' | 'live' | 'offline' | 'private'
// flow:    the system's main path, in order. Featured cards show `detail`,
//          compact cards show the labels only. Keep it to what the
//          description already says; never invent internals.
// image:   only real screenshots from the project itself.

export const PROJECTS = [
  {
    id: 'lufria-monitor',
    name: 'Lufria Monitor',
    group: 'public',
    status: 'open-source',
    category: 'Self-hosted infrastructure',
    featured: true,
    summary:
      'Monitoring dashboard for a Linux home server: live hardware stats, electricity use in kWh and Rupiah, passkey sign-in and a browser terminal.',
    highlights: [
      'Live stats over WebSocket every second, with 400 days of per-minute history',
      'Power split by component and priced with PLN tariff presets',
      'Passkey-only sign-in and a multi-tab terminal in the browser',
    ],
    image: {
      src: '/projects/lufria-monitor.webp',
      width: 1280,
      height: 800,
      alt: 'Lufria Monitor overview: CPU, memory, temperature, GPU and power cards above a live CPU and memory chart.',
      caption: 'Screenshot of the real build with sample data.',
    },
    tags: ['FastAPI', 'React', 'TypeScript', 'SQLite', 'WebSocket'],
    links: { code: 'https://github.com/Enricko/lufria-monitor' },
  },
  {
    id: 'calculator-rebuild',
    name: 'Calculator Rebuild',
    group: 'public',
    status: 'open-source',
    category: 'Native macOS',
    summary:
      'Independent macOS calculator in Swift and SwiftUI, rebuilt from a static study of Apple Calculator 12.0 with no Apple assets or private frameworks.',
    flow: [
      { label: 'Static study' },
      { label: 'Behavior matrix' },
      { label: 'Core state machine' },
      { label: 'SwiftUI app' },
    ],
    tags: ['Swift', 'SwiftUI', 'XCTest'],
    links: { code: 'https://github.com/Enricko/Calculator-Rebuild' },
  },
  {
    id: 'hematcuy',
    name: 'HematCuy',
    group: 'public',
    // hematcuy.lufria.tech has no tunnel route after the server migration (404).
    // Switch back to status 'live' and add links.live once it is redeployed.
    status: 'offline',
    category: 'Public platform',
    summary:
      'Real-time price and deal aggregator for groceries, tech and essentials, with official platform deep links and WAF-resilient catalog indexing.',
    flow: [
      { label: 'Platform catalogs' },
      { label: 'Resilient indexer' },
      { label: 'Redis cache' },
      { label: 'Official deep links' },
    ],
    tags: ['FastAPI', 'React', 'Redis', 'Tailwind'],
    note: 'Offline since a server migration.',
    links: {},
  },
  {
    id: 'saba-jogja',
    name: 'Saba Jogja',
    group: 'public',
    status: 'open-source',
    category: 'Mobile app',
    summary:
      'Flutter guide to Yogyakarta: Javanese script, local food and landmarks in one app. Built by a team of three for a 2024 university web development competition.',
    tags: ['Flutter', 'Dart'],
    links: { code: 'https://github.com/Enricko/Saba-Jogja-Lomba-Web-Dev-Competition-Feb-2024' },
  },
  {
    id: 'profile',
    name: 'Lufria.tech Portfolio',
    group: 'public',
    status: 'live',
    category: 'Design system',
    summary:
      'This site. A dark, editorial portfolio built with React 19, Vite and plain-CSS design tokens, with live data from the GitHub API.',
    tags: ['React 19', 'Vite', 'Design Tokens', 'CSS3'],
    links: { live: 'https://lufria.tech', code: 'https://github.com/Enricko/Profile' },
  },
  {
    id: 'tradingadvisory',
    name: 'Trading Advisory Bot',
    group: 'private',
    status: 'private',
    category: 'Fintech & algorithmic',
    featured: true,
    summary:
      'Algorithmic market signal engine and Discord bot delivering scheduled BPJS/BSJP analysis, real-time WebSocket market streams and portfolio risk telemetry.',
    flow: [
      { label: 'Market feeds', detail: 'Real-time exchange data streamed over WebSocket' },
      { label: 'Signal engine', detail: 'Scheduled BPJS and BSJP analysis' },
      { label: 'Risk telemetry', detail: 'Exposure tracked across the portfolio' },
      { label: 'Discord bot', detail: 'Posts the analysis and market streams to Discord' },
    ],
    tags: ['FastAPI', 'WebSocket', 'MySQL', 'Discord API'],
    note: 'Handles real portfolio capital and execution strategies.',
    links: {},
  },
  {
    id: 'clipperapps',
    name: 'Clipper Apps',
    group: 'private',
    status: 'private',
    category: 'AI & media pipeline',
    summary:
      'Automated video workflow that turns long-form footage into indexed, transcribed short clips, encoded on dedicated GPU NVENC hardware.',
    flow: [
      { label: 'Long-form video' },
      { label: 'Job queue' },
      { label: 'Transcription' },
      { label: 'Clip index' },
      { label: 'NVENC encode' },
    ],
    tags: ['AI Workflow', 'GPU NVENC', 'FastAPI', 'Job Queue'],
    note: 'Runs on dedicated workstation hardware.',
    links: {},
  },
  {
    id: 'ticketsystem',
    name: 'IT Ticket System',
    group: 'private',
    status: 'private',
    category: 'Web platform',
    summary:
      'IT support ticketing desk with daily rotating PIN security, client-side WebP photo compression and automated Discord webhook dispatch.',
    flow: [
      { label: 'PIN-gated form' },
      { label: 'WebP compression' },
      { label: 'FastAPI + SQLite' },
      { label: 'Discord dispatch' },
    ],
    tags: ['FastAPI', 'SQLite', 'Discord Webhook', 'Python'],
    note: 'Holds internal requests, attachments and incident records.',
    links: {},
  },
];

export const PROJECT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'public', label: 'Open & live' },
  { id: 'private', label: 'Private systems' },
];
