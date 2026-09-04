export const profile = {
  name: 'Adan France Cruz',
  handle: 'ADAN',
  roles: ['BACKEND ENGINEER', 'TEAM LEAD', 'PHP / LARAVEL / SYMFONY', 'API & INTEGRATIONS', 'AI-AUGMENTED DEV'],
  intro:
    "Nine years building the backend of things that matter: prescriptions, payments, car sales, and more WordPress plugins than I'd like to admit. These days I lead the engineering team at IronSail and spend most of my time making sure the hard parts don't land on the newest developer.",
  location: 'Mabalacat City, Pampanga, Philippines',
  email: 'adan.france.cruz@gmail.com',
  linkedin: 'https://linkedin.com/in/adan-france-cruz',
  github: 'https://github.com/francecruz017',
  repo: 'https://github.com/francecruz017/portfolio',
  about: [
    "I'm Adan, a backend engineer from Pampanga who ended up leading teams because I kept volunteering for the parts nobody wanted: the payment gateway edge cases, the compliance reviews, the third-party API that only works on Tuesdays.",
    "Most of my decade has been PHP, Laravel, and Symfony, with REST and GraphQL APIs underneath healthcare, automotive, and e-commerce products. I've shipped things that move money and things that move prescriptions, so I take \"it works on my machine\" personally.",
    'I was early to agentic coding tools and now use them every day, from scaffolding to code review. I also evaluated self-hosted models for a healthcare production setup, which taught me exactly where the hype ends.',
    "The thing I'm proudest of isn't a system. It's the junior developers I've mentored who are now mid-level and better than me at the things I taught them.",
  ],
}

export const hud = [
  { label: 'LEVEL', value: '09', note: 'years in the field' },
  { label: 'STAGE', value: '06', note: 'IronSail, current' },
  { label: 'WORLDS', value: '03', note: 'health · auto · commerce' },
  { label: 'POWER-UP', value: 'AI', note: 'agentic dev, daily' },
]

export type Move = { name: string; icon: string; text: string }
export const moves: Move[] = [
  { name: 'Backend & API architecture', icon: 'sword', text: 'Laravel and Symfony services with REST and GraphQL that survive real traffic and real audits.' },
  { name: 'Payments & integrations', icon: 'coin', text: 'NMI, webhooks, Salesforce, Mulesoft. Sandbox to production without surprises in production.' },
  { name: 'Leading the party', icon: 'users', text: 'Hiring, mentoring, vendor calls, and saying no to scope at the right moment.' },
  { name: 'AI-augmented delivery', icon: 'chip', text: 'Agentic tools in the daily loop, with a human still signing off on every merge.' },
]

export type Quest = {
  role: string
  company: string
  period: string
  status: 'IN PROGRESS' | 'COMPLETE'
  world: string
  color: string
  objectives: string[]
  loot: string[]
}

export const quests: Quest[] = [
  {
    role: 'Software Engineer / Team Lead',
    company: 'IronSail',
    period: 'Feb 2026 — now',
    status: 'IN PROGRESS',
    world: 'Healthcare',
    color: '#38ff8e',
    objectives: [
      'Own technical direction and feature architecture for Impetus One, a healthcare platform with e-prescribing, payments, and compliance-sensitive workflows.',
      'Run agentic AI workflows daily (Claude Code, GitHub Copilot, Codex) across implementation, debugging, refactoring, and review.',
      'Design role-based access for DEA credential management between providers and org admins, and catch compliance issues before release.',
      'Integrate the NMI payment gateway (voids, refunds, cancellations) and manage partner webhooks from sandbox to production.',
      'Evaluate self-hosted LLMs (Ollama) against reliability and compliance requirements for healthcare production.',
      'Lead vendor evaluations for e-prescribing and two-factor auth, and own the technical hiring loop end to end.',
    ],
    loot: ['PHP', 'Laravel', 'REST', 'Webhooks', 'NMI', 'Claude Code', 'AWS', 'Docker'],
  },
  {
    role: 'Senior Web Developer',
    company: 'Digital Pie',
    period: 'Jul 2024 — Nov 2025',
    status: 'COMPLETE',
    world: 'Agency',
    color: '#2de2e6',
    objectives: [
      'Design and build scalable APIs and backend services in PHP and MySQL.',
      'Bring agentic AI coding into daily development for scaffolding, refactoring, and review.',
      'Build custom WordPress plugins and integrations around client business needs.',
      'Lead dynamic front-end work in Next.js and AngularJS.',
      'Mentor junior developers and keep code review honest.',
    ],
    loot: ['PHP', 'MySQL', 'WordPress', 'Next.js', 'AngularJS'],
  },
  {
    role: 'Team Lead & Senior Backend Developer',
    company: 'Inchcape Digital',
    period: 'Nov 2021 — Jun 2024',
    status: 'COMPLETE',
    world: 'Automotive',
    color: '#ff2e88',
    objectives: [
      'Lead a team of developers and QAs shipping backend for international automotive e-commerce platforms.',
      'Build Symfony and GraphQL APIs integrating listings, promotions, insurance, and payments.',
      'Work alongside frontend, Mulesoft, and Salesforce teams so nothing falls between the cracks.',
      'Optimize backend workflows until the slow parts were not slow anymore.',
      'Mentor juniors and keep the team learning.',
    ],
    loot: ['Symfony', 'GraphQL', 'PostgreSQL', 'Salesforce', 'Mulesoft', 'Docker'],
  },
  {
    role: 'IT Analyst II',
    company: 'RMS Collect Phils Inc (IQOR)',
    period: 'Jan 2020 — Oct 2021',
    status: 'COMPLETE',
    world: 'Enterprise',
    color: '#ffd23f',
    objectives: [
      'Build and maintain APIs and backend systems in C#/.NET and SQL Server for process automation.',
      'Maintain and extend existing systems in C#, JavaScript, Vue.js, React, and Next.js.',
    ],
    loot: ['C#', '.NET', 'SQL Server', 'Vue.js', 'React', 'Next.js'],
  },
  {
    role: 'Junior Full Stack Developer',
    company: 'Shore 360 Inc',
    period: 'Jul 2018 — Dec 2019',
    status: 'COMPLETE',
    world: 'Client Services',
    color: '#8b5cf6',
    objectives: [
      'Deliver client-facing projects with direct technical support and solution presentations.',
      'Lead a standalone project while contributing to shared systems in Laravel, Bootstrap, jQuery, and React.',
      'Propose and ship automation and security improvements, plus code review and QA.',
    ],
    loot: ['Laravel', 'React', 'jQuery', 'Bootstrap', 'MySQL'],
  },
  {
    role: 'Web Developer',
    company: 'Nextvation',
    period: 'Jun 2017 — Jun 2018',
    status: 'COMPLETE',
    world: 'E-Commerce',
    color: '#ff8a2a',
    objectives: [
      'Build e-commerce platforms on Laravel and WordPress (WooCommerce) with custom themes and plugins.',
      'Maintain client APIs and lead a small group of junior developers to deliver project modules.',
    ],
    loot: ['Laravel', 'WordPress', 'WooCommerce', 'PHP'],
  },
]

export type Inventory = { tab: string; title: string; icon: string; items: string[] }
export const inventory: Inventory[] = [
  { tab: 'WEAPONS', title: 'Languages & frameworks', icon: 'sword', items: ['PHP', 'Laravel', 'Symfony', 'CodeIgniter', 'C# / .NET', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'AngularJS', 'jQuery'] },
  { tab: 'MAGIC', title: 'AI & agentic development', icon: 'potion', items: ['Claude & Claude Code', 'GitHub Copilot', 'Codex', 'Prompt engineering', 'LLM evaluation', 'Ollama / self-hosted', 'AI-assisted review', 'Team AI enablement'] },
  { tab: 'TOOLS', title: 'APIs & integrations', icon: 'key', items: ['REST', 'GraphQL', 'Webhooks', 'NMI payments', 'Salesforce', 'Mulesoft', 'Third-party APIs', 'OAuth / 2FA'] },
  { tab: 'ARMOR', title: 'Data & infrastructure', icon: 'shield', items: ['MySQL', 'PostgreSQL', 'MariaDB', 'SQL Server', 'Docker', 'AWS', 'Git', 'GitHub / GitLab / Bitbucket', 'TFS', 'Jira'] },
  { tab: 'KEY ITEMS', title: 'CMS & commerce', icon: 'book', items: ['WordPress', 'Custom plugins & themes', 'WooCommerce', 'Elementor'] },
  { tab: 'PARTY', title: 'Leadership & practice', icon: 'users', items: ['Agile / Scrum', 'Technical direction', 'Code review', 'Technical hiring', 'Mentoring', 'Vendor evaluation', 'Cross-functional coordination'] },
]

export const trophies = [
  { name: 'SPEED RUNNER', text: 'Tuned APIs and backend workflows until the slow parts were not slow anymore.' },
  { name: 'PARTY LEADER', text: "Mentored junior developers on every team I've led. Several are now mid-level and outgrowing me." },
  { name: 'ON-TIME DELIVERY', text: 'Led teams that shipped mission-critical projects on schedule and on budget, repeatedly.' },
  { name: 'BOSS: COMPLIANCE', text: 'Designed DEA credential access controls and caught the compliance issues before release did.' },
]

export const origin = {
  degree: 'BS Information Technology',
  school: 'Mabalacat City College',
  honors: ['Best Capstone Awardee', "President's Lister & Dean's Lister", 'Quiz Bee champion, more than once'],
}

export const badges = [
  { name: 'Google Project Management', issuer: 'Coursera', date: 'Aug 2023' },
  { name: 'DDI Leadership Training', issuer: 'Inchcape DDCP', date: 'Nov 2023' },
  { name: 'DevCon Summit', issuer: 'DevCon Philippines', date: 'Jun 2019' },
]

export const bonus = {
  intro: "Off the clock I'm a husband and a dad to a five-year-old who has won every Nerf war in our house since he could hold a blaster.",
  items: [
    { icon: 'heart', title: 'PLAYER 2 & PLAYER 3', text: "Married, one son, five years old. Evenings are pillow fights where the couch is a fortress and I'm never allowed to be Iron Man." },
    { icon: 'guitar', title: 'FORMER BAND GUITARIST', text: "Years of gigs, including one night as the undercard for one of the biggest rock bands in the country. The amp still lives in the house." },
    { icon: 'note', title: 'MUSIC ALWAYS ON', text: 'Rock to lo-fi. Headphones on when I need to think, speakers up when the family is home.' },
    { icon: 'star', title: 'MARVEL & ANIME', text: 'Comics, movies, and long-running anime. I have opinions on the best arc and I will share them.' },
    { icon: 'controller', title: 'RETRO & PIXEL GAMES', text: 'PlayStation, Nintendo, PC. Anything that looks like it came off a 16-bit cartridge gets my attention, which explains this site.' },
    { icon: 'house', title: 'CURRENT SAVE', text: 'Work and family are the main quest right now. The guitar and the consoles are side quests waiting for the weekend.' },
  ],
  rules: ['Clear ownership beats long meetings.', 'Mentoring is part of the job, not a side quest.', 'Ship it, measure it, then make it better.'],
}

export const resumes = [
  { label: 'SAVE 1 · General resume', file: 'resume/Adan_Cruz_Resume_2026.pdf' },
  { label: 'SAVE 2 · AI-focused resume', file: 'resume/Adan_Cruz_Resume_AI_Focus.pdf' },
]
