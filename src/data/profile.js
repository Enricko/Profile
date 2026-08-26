// Placeholder content for the whole site. Every section reads from here,
// so replace the values below to customize the portfolio without touching
// component code.

export const profile = {
  name: 'Enricko Putra Hartono',
  logoText: 'Enricko',
  roles: ['Full-Stack Developer', 'Open Source Contributor', 'Tech Writer'],
  tagline:
    'I build reliable field applications, operational dashboards, and cross-platform products for Web, Desktop, and Mobile.',
  location: 'Indonesia',
  email: 'enricko.putra028@gmail.com',
  resumeUrl: '/cv/Enricko-Putra-Hartono-CV.pdf',
  availability: 'Available for Web, Mobile & Desktop roles',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Enricko', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/enricko-putra-hartono-744646233/', icon: 'linkedin' },
  ],
};

export const about = {
  eyebrow: '// about me',
  title: 'Who I Am',
  summary: [
    "I'm a passionate software engineer based in Indonesia, specializing in building exceptional digital experiences. My journey in tech has equipped me with a versatile skill set spanning web, mobile, and backend development.",
    "Whether it's architecting a robust backend, designing a premium frontend, or shipping a cross-platform app, I care deeply about clean code, user-centric design, and continuous learning.",
  ],
  currentStatus: 'Currently freelancing and open to new full-time or contract roles.',
  funFact:
    'Fun fact: the background rain you might have noticed is an easter egg — click the paw icon in the navbar to reroll it.',
  stats: [
    { value: 3, suffix: '+', label: 'Years of Experience' },
    { value: 20, suffix: '+', label: 'Projects Completed' },
    { value: 3, suffix: '', label: 'Platforms Shipped' },
  ],
  techStack: [
    { name: 'React', icon: '/logos/react.svg' },
    { name: 'TypeScript', icon: '/logos/typescript.svg' },
    { name: 'Laravel', icon: '/logos/laravel.svg' },
    { name: 'Go', icon: '/logos/go.svg' },
    { name: 'PostgreSQL', icon: '/logos/postgresql.svg' },
    { name: 'Flutter', icon: '/logos/flutter.svg' },
  ],
};

export const skillCategories = [
  {
    name: 'Languages',
    skills: [
      { name: 'JavaScript', icon: '/logos/javascript.svg' },
      { name: 'TypeScript', icon: '/logos/typescript.svg' },
      { name: 'PHP', icon: '/logos/php.svg' },
      { name: 'Python', icon: '/logos/python.svg' },
      { name: 'Go', icon: '/logos/go.svg' },
    ],
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'React', icon: '/logos/react.svg' },
      { name: 'Vue.js', icon: '/logos/vuedotjs.svg' },
      { name: 'CSS3', icon: '/logos/css3.svg' },
      { name: 'Tailwind CSS', icon: '/logos/tailwindcss.svg' },
      { name: 'Flutter', icon: '/logos/flutter.svg' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Laravel', icon: '/logos/laravel.svg' },
      { name: 'Node.js', icon: '/logos/nodedotjs.svg' },
      { name: 'MySQL', icon: '/logos/mysql.svg' },
      { name: 'PostgreSQL', icon: '/logos/postgresql.svg' },
    ],
  },
  {
    name: 'DevOps',
    skills: [
      { name: 'Vite', icon: '/logos/vite.svg' },
      { name: 'Electron', icon: '/logos/electron.svg' },
      { name: 'Git', icon: null },
      { name: 'Docker', icon: null },
      { name: 'GitHub Actions', icon: null },
    ],
  },
];

export const projects = [
  {
    slug: 'saba-jogja',
    name: 'Saba Jogja',
    description:
      'An interactive application containing comprehensive information about Yogyakarta, built natively with Flutter.',
    outcome: 'Built for a web/app dev competition to showcase Yogyakarta tourism info in a native Flutter app.',
    image: null,
    tags: ['Flutter', 'Dart', 'Mobile App'],
    github: 'https://github.com/Enricko/Saba-Jogja-Lomba-Web-Dev-Competition-Feb-2024',
    demo: null,
    stars: 3,
    caseStudy: {
      problem:
        'Yogyakarta tourism info was scattered across many sources, making it hard for visitors to find reliable, structured information in one place for a competition brief.',
      constraints:
        'Built solo under a competition deadline, so the scope favored a native Flutter app with local/bundled content over a full backend and CMS.',
      architectureNote: 'Add an architecture diagram of the Flutter app structure and data flow here.',
      screenshots: [],
      results:
        'Delivered a working, judged competition entry that demonstrated structured content browsing and clean UI in Flutter within a tight timeline.',
    },
  },
  {
    slug: 'realtime-chat-app',
    name: 'Realtime Chatting App',
    description: 'A multi-platform real-time messaging application created using the robust Flutter Framework.',
    outcome: 'Shipped a realtime chat client that runs from a single Flutter codebase across mobile, web, and desktop.',
    image: null,
    tags: ['Flutter', 'Realtime', 'Chat'],
    github: 'https://github.com/Enricko/Flutter-Realtime-ChattingApp',
    demo: null,
    stars: 4,
    caseStudy: {
      problem:
        'Wanted a single chat codebase that could target mobile, web, and desktop without maintaining separate clients per platform.',
      constraints:
        'Realtime delivery and message ordering had to stay consistent across platforms with very different networking and lifecycle behavior.',
      architectureNote: 'Add an architecture diagram of the client/socket data flow here.',
      screenshots: [],
      results:
        'Learned how to structure a Flutter app for true cross-platform reuse while keeping realtime UX responsive on every target.',
    },
  },
  {
    slug: 'dino-run-flutter',
    name: 'Dino Run with Flutter',
    description:
      'A multi-platform endless runner game inspired by the classic Dino Game, built using the Flutter Flame engine.',
    outcome: 'Built a playable endless-runner clone to learn the Flame game engine end to end.',
    image: null,
    tags: ['Flutter', 'Flame', 'Game Dev'],
    github: 'https://github.com/Enricko/Dino-Run-with-Flutter',
    demo: null,
    stars: 4,
    caseStudy: {
      problem: 'Wanted hands-on experience with game-loop architecture, collision detection, and sprite animation outside of typical CRUD app development.',
      constraints: 'Scoped as a learning project, so features were limited to a single game mode with procedurally spawned obstacles.',
      architectureNote: 'Add an architecture diagram of the Flame game loop and component tree here.',
      screenshots: [],
      results: 'Came away with a solid mental model of Flutter Flame\'s component/game-loop system, reusable for future game or animation-heavy UI work.',
    },
  },
  {
    slug: 'flask-restx-template',
    name: 'Flask-Restx-Template',
    description:
      'A versatile and beginner-friendly repository designed to streamline API development using Python and Flask Rest-X.',
    outcome: 'Reusable Flask REST-X starter that cut new API project setup time down to minutes.',
    image: null,
    tags: ['Python', 'Flask', 'Backend API'],
    github: 'https://github.com/Enricko/Flask-Restx-Template',
    demo: null,
    stars: 3,
    caseStudy: {
      problem: 'Kept re-doing the same boilerplate (project layout, Swagger docs, auth scaffolding) at the start of every new Flask API project.',
      constraints: 'Needed to stay framework-idiomatic and beginner-friendly rather than introducing a heavy custom abstraction layer.',
      architectureNote: 'Add an architecture diagram of the Flask Rest-X module/namespace layout here.',
      screenshots: [],
      results: 'Now reused as the starting point for new API projects, with built-in Swagger docs and a consistent namespace structure.',
    },
  },
];

export const openSource = {
  eyebrow: '// open source',
  title: 'Open Source',
  intro:
    "Most of my public work lives on GitHub. Here's a snapshot of recent activity and a few contributions worth calling out.",
  githubUsername: 'Enricko',
  githubUrl: 'https://github.com/Enricko',
  contributions: [
    {
      repo: 'Enricko/Flask-Restx-Template',
      description: 'Maintain a beginner-friendly Flask Rest-X starter template used to bootstrap new API projects.',
      url: 'https://github.com/Enricko/Flask-Restx-Template',
      type: 'Maintainer',
    },
    {
      repo: 'Enricko/Flutter-Realtime-ChattingApp',
      description: 'Built and maintain a cross-platform realtime chat reference app for the Flutter community.',
      url: 'https://github.com/Enricko/Flutter-Realtime-ChattingApp',
      type: 'Maintainer',
    },
    {
      repo: 'Enricko/Dino-Run-with-Flutter',
      description: 'Open-sourced a Flutter Flame game example for developers learning the engine.',
      url: 'https://github.com/Enricko/Dino-Run-with-Flutter',
      type: 'Author',
    },
  ],
};

export const experience = [
  {
    title: 'Freelance Software Developer',
    company: 'PT. Binav Maju Sejahtera',
    period: 'Aug 2023 - Present',
    description:
      'Providing part-time freelance software development and technical expertise to build tailored and maintainable solutions.',
    tags: ['Software Development', 'Problem Solving'],
  },
  {
    title: 'App Developer',
    company: 'Cetaphil',
    period: 'Dec 2024 - Jan 2026',
    description:
      'Developed a robust mobile application focusing on high-performance dashboards, GPS mapping, coverage tracking, and remote field data synchronization.',
    tags: ['Mobile App Development', 'Application Development', 'GPS integration'],
  },
  {
    title: 'App Developer',
    company: 'IGNICE',
    period: 'Oct 2024 - Dec 2024',
    description:
      'Built application modules for outlet coverage tracking, dynamic target achievements dashboards, and complex database-driven outlet reporting.',
    tags: ['Application Development', 'Web Dashboards'],
  },
  {
    title: 'Full Stack Developer (Intern)',
    company: 'PT LAUWBA TECHNO INDONESIA',
    period: 'Jun 2022 - Sep 2022',
    description:
      'Completed a comprehensive apprenticeship focused on robust Web and Application Development, building cross-functional full-stack features.',
    tags: ['Web Applications', 'Application Development'],
  },
];

export const contact = {
  eyebrow: '// contact',
  title: 'Get In Touch',
  description:
    "Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
  email: 'enricko.putra028@gmail.com',
  location: 'Indonesia',
  responseTime: 'I usually reply within 1–2 business days.',
};
