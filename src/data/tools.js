// Central, data-driven catalog for the Tech Stack section.
// Add a new language or tool by appending ONE object here — no markup changes needed.
//
// Icon priority: official SVG (public/logos) -> Simple Icons -> clean neutral
// Lucide glyph (Icon). Never hotlink random images from the internet.

export const LANGUAGES = [
  { name: 'React',        icon: '/logos/react.svg',      category: 'frontend', role: 'UI Library' },
  { name: 'Vite',         icon: '/logos/vite.svg',       category: 'frontend', role: 'Build Tool' },
  { name: 'JavaScript',   icon: '/logos/javascript.svg', category: 'language', role: 'Core Language' },
  { name: 'TypeScript',   icon: '/logos/typescript.svg', category: 'language', role: 'Typed SuperSet' },
  { name: 'CSS3',         icon: '/logos/css3.svg',       category: 'frontend', role: 'Styling & Tokens' },
  { name: 'Tailwind CSS', icon: '/logos/tailwindcss.svg',category: 'frontend', role: 'Utility Framework' },
  { name: 'Vue.js',       icon: '/logos/vuedotjs.svg',   category: 'frontend', role: 'Progressive UI' },
  { name: 'Flutter',      icon: '/logos/flutter.svg',    category: 'mobile',   role: 'Cross-Platform App' },
  { name: 'Electron',     icon: '/logos/electron.svg',   category: 'desktop',  role: 'Desktop Runtime' },
  { name: 'Laravel',      icon: '/logos/laravel.svg',    category: 'backend',  role: 'Full-Stack PHP' },
  { name: 'PHP',          icon: '/logos/php.svg',        category: 'language', role: 'Backend Engine' },
  { name: 'Python',       icon: '/logos/python.svg',     category: 'backend',  role: 'Data & APIs' },
  { name: 'Go',           icon: '/logos/go.svg',         category: 'backend',  role: 'Low-Latency Services' },
  { name: 'Node.js',      icon: '/logos/nodedotjs.svg',  category: 'backend',  role: 'Runtime & Tools' },
  { name: 'MySQL',        icon: '/logos/mysql.svg',      category: 'database', role: 'Relational DB' },
  { name: 'PostgreSQL',   icon: '/logos/postgresql.svg', category: 'database', role: 'Enterprise SQL' },
];

// Verified against the live environment: ~/.claude, ~/.codex, ~/.hermes,
// ~/.9router (9router + omniroute containers), ~/antigravity_blobs,
// ~/.vscode-server, running Docker services, Cloudflare Tunnel config,
// /opt/n8n-lufria, self-hosted mail stack.
export const TOOLS = [
  // AI Coding & Agents — the daily driver loop
  { name: 'Claude Code',  role: 'AI Coding Agent',    category: 'ai',    img: '/logos/ai/claude.svg' },
  { name: 'OpenAI Codex', role: 'AI Coding Agent',    category: 'ai',    img: '/logos/ai/openai.svg' },
  { name: 'Hermes Agent', role: 'Agentic Workflow',   category: 'ai',    img: '/logos/ai/hermes.png' },
  { name: '9Router',      role: 'AI Model Router',    category: 'ai',    img: '/logos/ai/9router.png' },
  { name: 'Antigravity',  role: 'Agentic IDE',        category: 'ai',    img: '/logos/ai/antigravity.png' },

  // Editors & Version Control
  { name: 'VS Code',      role: 'Primary Editor',     category: 'editor', img: '/logos/ai/vscode.png' },
  { name: 'Git',          role: 'Version Control',    category: 'vcs',   img: '/logos/ai/git.svg' },
  { name: 'GitHub',       role: 'Code Hosting & CI',  category: 'vcs',   img: '/logos/ai/github.svg' },

  // DevOps & Infrastructure — the home-server fleet
  { name: 'Docker',       role: 'Containers',         category: 'infra', img: '/logos/ai/docker.svg' },
  { name: 'Nginx',        role: 'Web Server',         category: 'infra', img: '/logos/ai/nginx.svg' },
  { name: 'Ubuntu Linux', role: 'Server OS',          category: 'infra', img: '/logos/ai/ubuntu.svg' },
  { name: 'Cloudflare',   role: 'Tunnels & DNS',      category: 'infra', img: '/logos/ai/cloudflare.svg' },

  // Automation & Ops
  { name: 'n8n',          role: 'Workflow Automation',category: 'ops',   img: '/logos/ai/n8n.svg' },
  { name: 'Proton Mail',  role: 'Self-Hosted Mail',   category: 'ops',   img: '/logos/ai/protonmail.svg' },
  { name: 'Telegram Bots',role: 'Ops Notifications',  category: 'ops',   img: '/logos/ai/telegram.svg' },
];

export const LANGUAGE_FILTERS = [
  { id: 'all',            label: 'All' },
  { id: 'frontend',       label: 'Frontend' },
  { id: 'backend',        label: 'Backend' },
  { id: 'mobile-desktop', label: 'Mobile & Desktop' },
  { id: 'database',       label: 'Databases' },
];
