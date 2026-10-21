export interface Project {
  id: string;
  title: string;
  category: 'Systems & IT' | 'Web Apps' | 'Creative Tech';
  description: string;
  highlight: string;
  tags: string[];
  metrics: string;
  details: {
    problem: string;
    solution: string;
    architecture: string[];
    impact: string;
  };
  demoUrl?: string;
  githubUrl?: string;
  iconName: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level: number; tag: string }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export const PORTFOLIO_INFO = {
  name: 'reeee.dev',
  wordmark: 'reeee.dev',
  role: 'Web Developer & Creative Technologist',
  tagline: 'Code, creativity, and everything in between.',
  status: 'Building useful things & exploring the web',
  location: 'Global Cloud / Remote',
  email: 'limrenee0414@gmail.com',
  githubUrl: 'https://github.com/Reeeeeee4',
  bio: `Just a developer who enjoys building useful things and exploring what the web can do. At reeee.dev, I share my projects, experiments, and the ideas I bring to life through code :)`,
};

export const PROJECTS: Project[] = [
  {
    id: 'netpulse-monitor',
    title: 'NetPulse Network Telemetry',
    category: 'Systems & IT',
    description: 'Real-time network diagnostic and latency monitoring dashboard tracking sub-second ping variance, packet loss, and port health across multi-region nodes.',
    highlight: 'Enterprise network metrics with zero-overhead telemetry daemons.',
    tags: ['TypeScript', 'Node.js', 'ICMP/SNMP', 'WebSockets', 'Chart.js', 'Linux'],
    metrics: '99.98% uptime telemetry • <5ms sample latency',
    iconName: 'Activity',
    details: {
      problem: 'Distributed server clusters lacked centralized, lightweight latency visualization without running heavyweight monitoring agents.',
      solution: 'Engineered a standalone telemetry daemon that polls nodes via ICMP and TCP sockets, streaming aggregated time-series telemetry via WebSockets to a retro dashboard.',
      architecture: [
        'Lightweight Node.js telemetry collector on edge nodes',
        'In-memory circular buffer for real-time jitter statistics',
        'Reactive TypeScript UI with instant anomaly notifications'
      ],
      impact: 'Identified routing degradation 14 minutes faster than legacy SNMP alerting systems.'
    }
  },
  {
    id: 'cloudvault-iam',
    title: 'CloudVault Zero-Trust Gateway',
    category: 'Systems & IT',
    description: 'Granular access management tool that generates ephemeral presigned tokens, audit logs, and automated IAM policy least-privilege audits.',
    highlight: 'Automated least-privilege policy generation & access auditing.',
    tags: ['Cloudflare Workers', 'AWS S3', 'TypeScript', 'Zero-Trust', 'Security'],
    metrics: '0 credential leaks • 100% ephemeral token lifetimes',
    iconName: 'ShieldCheck',
    details: {
      problem: 'Developer teams were sharing long-lived S3 access credentials, increasing blast radius in development environments.',
      solution: 'Built an ephemeral token service operating on Cloudflare Workers that generates 15-minute scoped cryptographic signed URLs with comprehensive IP logging.',
      architecture: [
        'Cloudflare Workers edge authentication layer',
        'HMAC SHA-256 signature verification pipeline',
        'Real-time access audit log stream into durable storage'
      ],
      impact: 'Eliminated permanent developer credential storage on local workstations.'
    }
  },
  {
    id: 'chromaflow-canvas',
    title: 'ChromaFlow Generative Studio',
    category: 'Creative Tech',
    description: 'Algorithmic vector graphic and SVG flow-field engine. Generates harmonized geometric art and exportable SVG assets using customizable mathematical attractors.',
    highlight: 'Mathematical flow fields rendered in real-time browser canvas.',
    tags: ['Creative Coding', 'HTML5 Canvas', 'Mathematics', 'SVG', 'TypeScript'],
    metrics: '60 FPS render loop • 0 external graphics libraries',
    iconName: 'Sparkles',
    details: {
      problem: 'Web interfaces often rely on heavy static raster graphics that don’t adapt dynamically to UI theme shifts.',
      solution: 'Developed an interactive Perlin noise and Lorenz attractor engine that draws procedural vector paths natively in canvas with instant SVG export.',
      architecture: [
        'Custom 2D Perlin noise generator in TypeScript',
        'OffscreenCanvas rendering worker for lag-free UI interaction',
        'Dynamic palette harmonizer adhering to brand guidelines'
      ],
      impact: 'Reduced asset payload size by 84% while creating dynamic interactive visual flair.'
    }
  },
  {
    id: 'sysmonit-agent',
    title: 'SysMonit Daemon & CLI',
    category: 'Systems & IT',
    description: 'Cross-platform system maintenance daemon written in TypeScript & PowerShell. Automates cache purging, log rotation, and CPU/RAM threshold warnings.',
    highlight: 'Automated disk hygiene and system health telemetry agent.',
    tags: ['PowerShell', 'Bash', 'TypeScript', 'Node CLI', 'Windows/Linux'],
    metrics: 'Reclaimed 40+ GB average temp bloat per host',
    iconName: 'Terminal',
    details: {
      problem: 'Workstations and dev servers frequently suffer performance bottlenecks due to runaway temp files, stale npm caches, and zombie processes.',
      solution: 'Created an intelligent daemon with configurable cron routines that gracefully cleans ephemeral build artifacts and issues desktop/webhook alerts.',
      architecture: [
        'Native PowerShell core integration for Windows hosts',
        'POSIX-compliant shell hooks for Linux/macOS environments',
        'Configurable JSON rulebook for safe directory exemptions'
      ],
      impact: 'Maintained optimal free disk space on high-density developer systems.'
    }
  },
  {
    id: 'y2k-retroarchivist',
    title: 'RetroArchivist Headless CMS',
    category: 'Web Apps',
    description: 'A nostalgic, ultra-fast headless publishing portal. Combines vintage Y2K design motifs with modern markdown parsing, static generation, and instant preview.',
    highlight: 'Instant static markdown builds with nostalgic micro-interactions.',
    tags: ['React', 'Vite', 'TypeScript', 'Markdown', 'Cloudflare Pages'],
    metrics: '100/100 Lighthouse Performance • 0.3s TTFB',
    iconName: 'FolderGit2',
    details: {
      problem: 'Content creators wanted a portfolio CMS that felt warm and playful like personal web shrines of the late 90s/early 2000s, without sacrificing modern build speeds.',
      solution: 'Engineered an ultra-lean CMS that compiles markdown trees into hyper-optimized static bundles deployable to Cloudflare Pages in seconds.',
      architecture: [
        'Unified / Remark markdown abstract syntax tree parser',
        'Client-side instant full-text search index',
        'Muted palette CSS custom property theme token engine'
      ],
      impact: 'Deployed across 12 personal project sites with 100% uptime on free tiers.'
    }
  },
  {
    id: 'sentinel-audit',
    title: 'CyberSentinel Compliance Scanner',
    category: 'Systems & IT',
    description: 'Automated SSL/TLS certificate health, DNSSEC validation, and open-port risk assessment scanner tailored for small-to-midsize tech stacks.',
    highlight: 'Proactive SSL expiration alerts & header security grading.',
    tags: ['Security', 'DNS/TLS', 'Node.js', 'REST API', 'Docker'],
    metrics: 'Over 1,200 domains scanned • Grade A+ CSP validator',
    iconName: 'Lock',
    details: {
      problem: 'Unexpected SSL certificate expirations and misconfigured security headers cause avoidable downtime and browser trust warnings.',
      solution: 'Designed an asynchronous scanner that checks cert chains, cipher suites, HSTS headers, and DNS records with automated webhook reminders 30 days prior to expiration.',
      architecture: [
        'Direct TLS socket handshake inspection in Node.js',
        'Automated scoring algorithm for HTTP security headers',
        'Scheduled health probes with Discord and email webhook alerts'
      ],
      impact: 'Prevented critical downtime across client infrastructure deployments.'
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Systems & Infrastructure',
    description: 'Hardened OS configuration, virtualization, and network architecture.',
    skills: [
      { name: 'Linux Administration (Ubuntu, Debian, RHEL)', level: 92, tag: 'OS' },
      { name: 'Windows Server & Active Directory', level: 85, tag: 'IT' },
      { name: 'Networking (DNS, DHCP, VLANs, WireGuard VPN)', level: 88, tag: 'Net' },
      { name: 'Docker & Containerization', level: 86, tag: 'DevOps' },
      { name: 'PowerShell & Bash Scripting', level: 90, tag: 'Automation' },
      { name: 'Hardware Diagnostics & Systems Maintenance', level: 94, tag: 'Support' }
    ]
  },
  {
    title: 'Web & Software Engineering',
    description: 'Modern, resilient web development using TypeScript and component architecture.',
    skills: [
      { name: 'React 19 & TypeScript', level: 95, tag: 'Frontend' },
      { name: 'Node.js & Express API Development', level: 90, tag: 'Backend' },
      { name: 'Vite & Build Tooling Architecture', level: 92, tag: 'Tooling' },
      { name: 'Vanilla CSS, CSS Custom Properties & Responsive Design', level: 96, tag: 'Styling' },
      { name: 'REST APIs & WebSocket Architecture', level: 88, tag: 'APIs' },
      { name: 'Database Management (PostgreSQL, SQLite)', level: 82, tag: 'Data' }
    ]
  },
  {
    title: 'Cloud, Hosting & DevOps',
    description: 'Zero-downtime deployment pipelines and serverless edge delivery.',
    skills: [
      { name: 'Cloudflare (Pages, Workers, DNS, Zero Trust)', level: 94, tag: 'Edge' },
      { name: 'AWS Essentials (S3, EC2, IAM Security)', level: 82, tag: 'Cloud' },
      { name: 'Git & GitHub Actions CI/CD Workflows', level: 90, tag: 'CI/CD' },
      { name: 'Nginx Reverse Proxy & SSL/TLS Configuration', level: 87, tag: 'Web' },
      { name: 'Automated Backup & Disaster Recovery', level: 89, tag: 'Reliability' }
    ]
  },
  {
    title: 'Security & Creative Tech',
    description: 'Zero-trust security practices paired with playful interactive coding.',
    skills: [
      { name: 'IT Security Auditing & Access Control (IAM)', level: 85, tag: 'Security' },
      { name: 'HTML5 Canvas & Generative Math Experiments', level: 88, tag: 'Creative' },
      { name: 'Web Audio API & Sound Synthesis', level: 84, tag: 'Audio' },
      { name: 'UX Micro-Interactions & Accessible UI', level: 91, tag: 'Design' }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: '2024 — Present',
    role: 'IT Systems Specialist & Independent Web Engineer',
    company: 'reeee.dev Lab',
    description: 'Delivering end-to-end IT infrastructure consulting, custom web applications, and automated maintenance workflows for clients and creative ventures.',
    achievements: [
      'Architected resilient Cloudflare Pages and Workers pipelines with 99.99% availability.',
      'Developed custom telemetry and diagnostics dashboards saving clients over 15 hours of manual debugging weekly.',
      'Authored automated PowerShell and Bash hygiene scripts across hybrid Windows/Linux server fleets.'
    ],
    tech: ['React', 'TypeScript', 'Cloudflare', 'Linux', 'PowerShell', 'Docker']
  },
  {
    period: '2022 — 2024',
    role: 'Systems & Infrastructure Support Engineer',
    company: 'Enterprise IT Solutions',
    description: 'Administered multi-site enterprise networks, managed directory services, and orchestrated workstation deployments and hardware diagnostics.',
    achievements: [
      'Streamlined network onboarding with automated DHCP/DNS reservations and policy group configurations.',
      'Enforced zero-trust identity policies and managed encrypted backup rotations.',
      'Maintained 98.7% first-touch resolution rate on critical hardware and connectivity tickets.'
    ],
    tech: ['Windows Server', 'Active Directory', 'Networking', 'VLANs', 'Hardware', 'Bash']
  },
  {
    period: '2020 — 2022',
    role: 'Junior Web Developer & Tech Technician',
    company: 'Digital Studio Lab',
    description: 'Created dynamic client web interfaces, configured web hosting environments, and built interactive creative tools.',
    achievements: [
      'Built responsive web interfaces with vanilla CSS and modern JavaScript.',
      'Assisted in setting up Nginx web servers and automated Let\'s Encrypt SSL rotations.',
      'Created custom interactive canvas toys and promotional mini-apps.'
    ],
    tech: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Nginx', 'Git']
  }
];
