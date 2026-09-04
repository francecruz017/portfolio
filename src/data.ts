export const profile = {
  name: 'Adan France Cruz',
  firstName: 'Adan',
  roles: ['Software Engineer', 'Team Lead', 'Senior Backend Developer', 'AI-Augmented Engineer'],
  tagline:
    'I design scalable backend systems, lead engineering teams, and ship compliance-sensitive products on time.',
  location: 'Mabalacat City, Pampanga, Philippines',
  email: 'adan.france.cruz@gmail.com',
  linkedin: 'https://linkedin.com/in/adan-france-cruz',
  github: 'https://github.com/francecruz017',
  summary: [
    'Software Engineer and Team Lead with nearly a decade of experience designing, developing, and deploying scalable web applications and backend systems across healthcare, automotive, and e-commerce domains.',
    'Early adopter of AI-augmented and agentic development workflows, integrating agentic coding tools into daily engineering practice, from feature implementation and debugging to code review and team processes.',
    'Strong record of leading agile teams, owning technical direction, coordinating across frontend, backend, and DevOps, and mentoring developers into mid-level roles.',
  ],
}

export const stats = [
  { value: 9, suffix: '+', label: 'Years of experience' },
  { value: 6, suffix: '', label: 'Companies, from agencies to enterprise' },
  { value: 3, suffix: '', label: 'Industries: health, auto, commerce' },
  { value: 'AI', suffix: '', label: 'Agentic workflows in daily practice' },
]

export type Experience = {
  role: string
  company: string
  period: string
  start: string
  domain: string
  color: string
  highlights: string[]
  stack: string[]
}

export const experience: Experience[] = [
  {
    role: 'Software Engineer / Team Lead',
    company: 'IronSail',
    period: 'Feb 2026 — Present',
    start: '2026',
    domain: 'Healthcare',
    color: '#7c5cff',
    highlights: [
      'Lead technical direction and feature architecture for Impetus One, a healthcare platform with e-prescribing, payments, and compliance-sensitive workflows.',
      'Drive heavy day-to-day use of agentic AI workflows (Claude Code, GitHub Copilot, Codex) across implementation, debugging, refactoring, and code review.',
      'Designed role-based access controls for DEA credential management between providers and organization admins, surfacing compliance issues ahead of release.',
      'Integrated the NMI payment gateway (voids, refunds, cancellations) and managed partner webhook integrations from sandbox through production.',
      'Evaluated self-hosted LLM options (Ollama) against reliability and compliance requirements for a healthcare production context.',
      'Led vendor evaluations for e-prescribing and two-factor authentication, and own the technical hiring loop end to end.',
    ],
    stack: ['PHP', 'Laravel', 'REST', 'Webhooks', 'NMI', 'Claude Code', 'AWS', 'Docker'],
  },
  {
    role: 'Senior Web Developer',
    company: 'Digital Pie',
    period: 'Jul 2024 — Nov 2025',
    start: '2024',
    domain: 'Agency',
    color: '#22d3ee',
    highlights: [
      'Designed and implemented scalable APIs and backend services using PHP and MySQL.',
      'Adopted agentic AI coding workflows into daily development for scaffolding, refactoring, and code review.',
      'Developed custom WordPress plugins and integrations tailored to client business needs.',
      'Led development of dynamic front-end components using Next.js and AngularJS.',
      'Mentored junior developers and ran code reviews to keep quality high.',
    ],
    stack: ['PHP', 'MySQL', 'WordPress', 'Next.js', 'AngularJS'],
  },
  {
    role: 'Team Lead & Senior Backend Developer',
    company: 'Inchcape Digital',
    period: 'Nov 2021 — Jun 2024',
    start: '2021',
    domain: 'Automotive',
    color: '#f472b6',
    highlights: [
      'Led a team of 5+ developers and QAs delivering backend solutions for international automotive e-commerce platforms.',
      'Built APIs with Symfony and GraphQL, integrating third-party services for listings, promotions, insurance, and payments.',
      'Collaborated with frontend, Mulesoft, and Salesforce teams to ensure seamless integration.',
      'Optimized backend workflows for faster processing and leaner integrations.',
      'Mentored junior developers and fostered a culture of continuous learning.',
    ],
    stack: ['Symfony', 'GraphQL', 'PostgreSQL', 'Salesforce', 'Mulesoft', 'Docker'],
  },
  {
    role: 'IT Analyst II',
    company: 'RMS Collect Phils Inc (IQOR)',
    period: 'Jan 2020 — Oct 2021',
    start: '2020',
    domain: 'Enterprise',
    color: '#fbbf24',
    highlights: [
      'Developed and maintained APIs and backend systems using C#/.NET and Microsoft SQL Server, supporting process automation and efficiency improvements.',
      'Maintained and enhanced existing systems using C#, JavaScript, Vue.js, React, and Next.js.',
    ],
    stack: ['C#', '.NET', 'SQL Server', 'Vue.js', 'React', 'Next.js'],
  },
  {
    role: 'Junior Full Stack Developer',
    company: 'Shore 360 Inc',
    period: 'Jul 2018 — Dec 2019',
    start: '2018',
    domain: 'Client Services',
    color: '#34d399',
    highlights: [
      'Delivered client-facing projects with direct technical support and solution presentations.',
      'Led a standalone project while contributing to collaborative systems using Laravel, Bootstrap, jQuery, and React.',
      'Proposed and implemented automation and security improvements; performed code reviews and QA testing.',
    ],
    stack: ['Laravel', 'React', 'jQuery', 'Bootstrap', 'MySQL'],
  },
  {
    role: 'Web Developer',
    company: 'Nextvation',
    period: 'Jun 2017 — Jun 2018',
    start: '2017',
    domain: 'E-Commerce',
    color: '#fb7185',
    highlights: [
      'Developed e-commerce platforms using Laravel and WordPress (WooCommerce), including custom themes and plugins.',
      'Maintained and improved client APIs and led a small group of junior developers to deliver project modules.',
    ],
    stack: ['Laravel', 'WordPress', 'WooCommerce', 'PHP'],
  },
]

export type SkillGroup = { title: string; accent: string; items: string[] }

export const skills: SkillGroup[] = [
  {
    title: 'Languages & Frameworks',
    accent: '#7c5cff',
    items: ['PHP', 'Laravel', 'Symfony', 'CodeIgniter', 'C# / .NET', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'AngularJS', 'jQuery'],
  },
  {
    title: 'AI & Agentic Development',
    accent: '#22d3ee',
    items: ['Claude & Claude Code', 'GitHub Copilot', 'Codex', 'Prompt Engineering', 'LLM Evaluation', 'Ollama / Self-hosted LLMs', 'AI-assisted Code Review', 'Team AI Enablement'],
  },
  {
    title: 'APIs & Integrations',
    accent: '#f472b6',
    items: ['REST', 'GraphQL', 'Webhooks', 'NMI Payments', 'Salesforce', 'Mulesoft', 'Third-party APIs', 'OAuth / 2FA'],
  },
  {
    title: 'Data & Infrastructure',
    accent: '#34d399',
    items: ['MySQL', 'PostgreSQL', 'MariaDB', 'SQL Server', 'Docker', 'AWS', 'Git', 'GitHub / GitLab / Bitbucket', 'TFS', 'Jira'],
  },
  {
    title: 'CMS & Commerce',
    accent: '#fbbf24',
    items: ['WordPress', 'Custom Plugins & Themes', 'WooCommerce', 'Elementor'],
  },
  {
    title: 'Leadership & Practice',
    accent: '#fb7185',
    items: ['Agile / Scrum', 'Technical Direction', 'Code Review', 'Technical Hiring', 'Developer Mentoring', 'Vendor Evaluation', 'Cross-functional Coordination'],
  },
]

export const marquee = [
  'PHP', 'Laravel', 'Symfony', 'GraphQL', 'REST', 'React', 'Next.js', 'Vue.js', 'TypeScript', 'C#', '.NET',
  'MySQL', 'PostgreSQL', 'Docker', 'AWS', 'Claude Code', 'Copilot', 'Salesforce', 'Mulesoft', 'WordPress',
]

export const achievements = [
  { title: 'Performance', text: 'Tuned APIs and backend workflows for faster responses and leaner processing across every platform owned.' },
  { title: 'Mentorship', text: 'Mentored junior developers across every team led, many progressing into mid-level roles.' },
  { title: 'Delivery', text: 'Consistently led teams delivering mission-critical projects on time and within budget.' },
  { title: 'Compliance', text: 'Designed DEA credential access controls and surfaced compliance issues before release.' },
]

export const education = {
  degree: 'Bachelor of Science in Information Technology',
  school: 'Mabalacat City College',
  honors: ["Best Capstone Awardee", "President's Lister & Dean's Lister", 'Multiple intra- and inter-school Quiz Bee Champion'],
}

export const certifications = [
  { name: 'Google Project Management Specialization', issuer: 'Coursera', date: 'Aug 2023' },
  { name: 'DDI Leadership Training', issuer: 'Inchcape DDCP', date: 'Nov 2023' },
  { name: 'DevCon Summit', issuer: 'DevCon Philippines', date: 'Jun 2019' },
]

export const services = [
  {
    title: 'Backend & API Architecture',
    text: 'Scalable PHP, Laravel, and Symfony services with REST and GraphQL APIs built for growth and integration.',
  },
  {
    title: 'Payments & Integrations',
    text: 'Payment gateways, webhooks, Salesforce, Mulesoft, and third-party systems wired from sandbox to production.',
  },
  {
    title: 'Technical Leadership',
    text: 'Team direction, hiring, mentoring, vendor evaluation, and cross-functional delivery that lands on time.',
  },
  {
    title: 'AI-Augmented Delivery',
    text: 'Agentic coding workflows that speed up implementation, review, and debugging without sacrificing quality.',
  },
]

export const resumes = [
  { label: 'General Resume', file: 'resume/Adan_Cruz_Resume_2026.pdf' },
  { label: 'AI-Focused Resume', file: 'resume/Adan_Cruz_Resume_AI_Focus.pdf' },
]

export const personal = {
  intro:
    "Work is only half the story. Off the clock I'm a husband and a dad, and most evenings end in a living-room battle where the couch is a fortress and the five-year-old is always the hero.",
  items: [
    { icon: 'family', title: 'Family first', text: 'Married, with a five-year-old son who runs the house. Nerf wars and pillow fights are a nightly ritual, usually with everyone pretending to be a Marvel hero.' },
    { icon: 'guitar', title: 'Former band guitarist', text: "Played guitar in a band for years, including one night opening as an undercard for one of the country's biggest rock bands. Still the loudest thing in the house after the kid." },
    { icon: 'music', title: 'Music, always on', text: 'Rock to lo-fi, headphones on when deep in code, speakers up when the family is home.' },
    { icon: 'marvel', title: 'Marvel & anime fan', text: 'Comics, movies, and long-running anime. Strong opinions on the best arc, happy to debate them over coffee.' },
    { icon: 'games', title: 'Retro & pixel games', text: 'PlayStation, Nintendo, and PC, with a soft spot for pixel art and anything that looks like it came out of a 16-bit cartridge.' },
    { icon: 'focus', title: 'These days', text: 'Focused on shipping great work and being present at home. The guitar and the consoles are still there, waiting for the weekend.' },
  ],
  howIWork: [
    'Clear ownership beats long meetings.',
    'Mentoring is part of the job, not a side quest.',
    'Ship it, measure it, then make it better.',
  ],
}
