// Placeholder content for the whole site. Every section reads from here,
// so replace the values below to customize the portfolio without touching
// component code. Links marked '#' are placeholders — swap them for your
// real profile URLs before publishing.

export const artist = {
  name: 'Alex Rivera',
  logoText: 'Alex',
  title: '3D Artist & Animator',
  roles: ['Character Design', 'Environment Art', 'Motion Graphics'],
  tagline:
    'I sculpt characters, build worlds, and light every frame like it has to survive a close-up — from first blockout to final render.',
  location: 'Remote / Los Angeles, CA',
  email: 'enricko.putra028@gmail.com',
  availability: 'Open for freelance projects',
  // Paste a YouTube (https://www.youtube.com/embed/VIDEO_ID) or Vimeo
  // (https://player.vimeo.com/video/VIDEO_ID) embed URL here to power the
  // showreel modal. Left empty, the modal shows a placeholder instead.
  reelEmbedUrl: '',
  reelFeaturedSlugs: ['ember-warden', 'sunken-archive', 'glass-bloom-ident'],
  socials: [
    { label: 'ArtStation', icon: 'artstation', href: '#' },
    { label: 'Behance', icon: 'behance', href: '#' },
    { label: 'Instagram', icon: 'instagram', href: '#' },
    { label: 'Discord', icon: 'discord', href: '#' },
  ],
  commissionStatus: 'open', // 'open' | 'limited' | 'closed'
  rateSheetUrl: null, // set to a real file path to show the download link
};

export const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'character-design', label: 'Character Design' },
  { id: 'environment-art', label: 'Environment Art' },
  { id: 'product-viz', label: 'Product Visualization' },
  { id: 'motion-graphics', label: 'Motion Graphics' },
  { id: 'personal', label: 'Personal Projects' },
];

export const projects = [
  {
    slug: 'ember-warden',
    title: 'Ember Warden',
    category: 'character-design',
    year: 2026,
    client: 'Nightfall Games',
    thumbnail: null,
    hoverPreview: null,
    software: ['Blender', 'ZBrush', 'Substance Painter', 'Marmoset Toolbag'],
    roles: ['Sculpting', 'Modeling', 'Texturing', 'Lighting'],
    overview:
      'A stylized boss character for an unannounced action-RPG. Design brief called for a fire-elemental guardian that reads instantly in silhouette while carrying enough surface detail to hold up in cinematic close-ups.',
    moodboard: [
      { caption: 'Silhouette exploration sheet' },
      { caption: 'Material reference: cracked obsidian + embers' },
      { caption: 'Color script pass 1' },
    ],
    wip: {
      wireframe: [{ caption: 'Base mesh wireframe, front/back' }, { caption: 'Retopo pass, 32k tris' }],
      clay: [{ caption: 'Clay render, hero angle' }, { caption: 'Clay render, 3/4 back' }],
      lighting: [{ caption: 'Three-point lighting test' }, { caption: 'In-engine rim light pass' }],
    },
    finalRenders: [
      { caption: 'Hero shot, key light' },
      { caption: 'Detail: chest ember core' },
      { caption: 'Back armor plating' },
      { caption: 'Turnaround still, 3/4 view' },
    ],
    turntableEmbed: '',
    breakdownEmbed: '',
  },
  {
    slug: 'moss-sentinel',
    title: 'Moss Sentinel',
    category: 'character-design',
    year: 2024,
    client: null,
    thumbnail: null,
    hoverPreview: null,
    software: ['ZBrush', 'Blender'],
    roles: ['Sculpting', 'Modeling'],
    overview:
      'A personal sculpt study exploring organic-on-mechanical surface language — a forest guardian half reclaimed by moss and vine growth.',
    moodboard: [],
    wip: {
      wireframe: [],
      clay: [{ caption: 'Clay render, front' }],
      lighting: [],
    },
    finalRenders: [{ caption: 'Final clay-to-color render' }],
    turntableEmbed: '',
    breakdownEmbed: '',
  },
  {
    slug: 'sunken-archive',
    title: 'The Sunken Archive',
    category: 'environment-art',
    year: 2025,
    client: 'Indie Collective',
    thumbnail: null,
    hoverPreview: null,
    software: ['Blender', 'Substance Painter', 'World Machine', 'Unreal Engine'],
    roles: ['Modeling', 'Texturing', 'Lighting', 'Set Dressing'],
    overview:
      "A flooded library environment for a narrative exploration game. The brief asked for a space that felt beautiful and melancholic — knowledge slowly being reclaimed by water — while staying performant for real-time playback.",
    moodboard: [
      { caption: 'Lighting mood: shafts through broken skylight' },
      { caption: 'Reference: flooded Venetian archives' },
    ],
    wip: {
      wireframe: [{ caption: 'Modular kit wireframe' }],
      clay: [{ caption: 'Greybox blockout' }, { caption: 'Clay pass, full scene' }],
      lighting: [{ caption: 'Lighting test 1: cold morning' }, { caption: 'Lighting test 2: warm dusk' }],
    },
    finalRenders: [
      { caption: 'Wide establishing shot' },
      { caption: 'Reading nook detail' },
      { caption: 'Water caustics on floor' },
      { caption: 'Bookshelf close-up' },
      { caption: 'Skylight god-rays' },
    ],
    turntableEmbed: '',
    breakdownEmbed: '',
  },
  {
    slug: 'aurora-runner-sneaker',
    title: 'Aurora Runner',
    category: 'product-viz',
    year: 2025,
    client: 'Solstice Footwear',
    thumbnail: null,
    hoverPreview: null,
    software: ['Cinema 4D', 'Substance Painter', 'Redshift'],
    roles: ['Modeling', 'Texturing', 'Lighting', 'Rendering'],
    overview:
      'Studio-quality product visualization for a sneaker launch campaign — built to match real material swatches supplied by the client within one round of review.',
    moodboard: [{ caption: 'Studio lighting reference board' }],
    wip: {
      wireframe: [{ caption: 'Hard-surface wireframe, sole unit' }],
      clay: [],
      lighting: [{ caption: 'HDRI studio setup test' }],
    },
    finalRenders: [
      { caption: 'Hero angle, key colorway' },
      { caption: 'Sole detail, macro' },
      { caption: 'Lace and eyelet close-up' },
    ],
    turntableEmbed: '',
    breakdownEmbed: null,
  },
  {
    slug: 'glass-bloom-ident',
    title: 'Glass Bloom — Brand Ident',
    category: 'motion-graphics',
    year: 2024,
    client: 'Studio Halcyon',
    thumbnail: null,
    hoverPreview: null,
    software: ['Cinema 4D', 'Redshift', 'After Effects'],
    roles: ['Modeling', 'Animation', 'Lighting', 'Compositing'],
    overview:
      'A 10-second animated logo sting built from procedurally-arranged glass fragments that assemble into the client wordmark, designed to loop cleanly for social placements.',
    moodboard: [],
    wip: { wireframe: [], clay: [], lighting: [] },
    finalRenders: [{ caption: 'Key frame: fragment assembly' }, { caption: 'Key frame: final wordmark hold' }],
    turntableEmbed: '',
    breakdownEmbed: '',
  },
  {
    slug: 'clockwork-atlas',
    title: 'Clockwork Atlas',
    category: 'personal',
    year: 2026,
    client: null,
    thumbnail: null,
    hoverPreview: null,
    software: ['Blender', 'Substance Painter'],
    roles: ['Modeling', 'Texturing', 'Animation'],
    overview:
      'A personal worldbuilding piece imagining a floating clockwork city held aloft by oversized brass gears — an excuse to practice hard-surface modeling and slow, ambient camera animation.',
    moodboard: [{ caption: 'Concept sketch: gear-city cross-section' }],
    wip: {
      wireframe: [{ caption: 'Gear mechanism wireframe' }],
      clay: [{ caption: 'Clay render, full city' }],
      lighting: [],
    },
    finalRenders: [{ caption: 'Wide shot, golden hour' }],
    turntableEmbed: '',
    breakdownEmbed: '',
  },
];

export const about = {
  eyebrow: '// about me',
  title: 'Who I Am',
  bio: [
    "I'm a 3D artist and animator focused on character design, environment art, and product visualization. I care most about the transition from a rough blockout to a shot that feels intentional in every frame.",
    'My process leans on strong reference, iterative feedback loops, and knowing when a piece is done rather than endlessly polishing it.',
  ],
  currentlyLearning: 'Currently deep in Houdini procedural VFX and real-time rendering in Unreal Engine 5.',
  availabilityBadges: [
    { label: 'Freelance', active: true },
    { label: 'Full-time', active: false },
    { label: 'Collaborations', active: true },
  ],
  software: [
    { name: 'Blender', level: 95 },
    { name: 'ZBrush', level: 88 },
    { name: 'Substance Painter', level: 85 },
    { name: 'Cinema 4D', level: 75 },
    { name: 'Maya', level: 60 },
    { name: 'After Effects', level: 70 },
  ],
  hardware: [
    'AMD Ryzen 9 7950X',
    'NVIDIA RTX 4090 24GB',
    '64GB DDR5 RAM',
    'Wacom Cintiq Pro 24',
    'Dual 4K HDR displays',
  ],
  process: [
    { title: 'Reference & Concept', description: 'Gather references, block out mood, and lock the silhouette or camera language before touching final geometry.' },
    { title: 'Blockout & Sculpt', description: 'Rough forms first — proportions and read at a distance matter more than detail at this stage.' },
    { title: 'Retopology & UVs', description: 'Clean topology built for deformation or real-time budget, then efficient UV layouts for texturing.' },
    { title: 'Texturing & Shading', description: 'Physically-based materials built up in layers, checked under multiple lighting conditions.' },
    { title: 'Lighting & Rendering', description: 'Light the shot like a photograph — composition, focal point, and mood come from light first.' },
    { title: 'Compositing & Polish', description: 'Final color grade, depth, and small imperfections that sell the render as believable.' },
  ],
};

export const resources = {
  eyebrow: '// resources',
  title: 'Resources',
  intro: 'A short list of things worth bookmarking — swap these placeholders for your own favorites.',
  freeModels: [
    { title: 'Add a link to your favorite free model library', href: '#' },
    { title: 'Add a link to a texture/HDRI resource', href: '#' },
  ],
  tutorials: [
    { title: 'Add a link to a tutorial series you recommend', href: '#' },
    { title: 'Add a link to a course or workshop', href: '#' },
  ],
  blogPosts: [
    { title: 'Add a link to a technique write-up you published', href: '#' },
  ],
};

export const contact = {
  eyebrow: '// contact',
  title: 'Get In Touch',
  description: "Open for new commissions and collaborations. Reach out and I'll get back to you within a couple of days.",
};
