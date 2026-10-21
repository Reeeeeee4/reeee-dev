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

export interface SkillItem {
  name: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
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
  bio: `Just a developer who enjoys building useful things and exploring what the web can do. At reeee.dev, I share my projects, experiments, and the ideas I bring to life through code :D`,
};

export const PROJECTS: Project[] = [
  {
    id: 'comfort-food',
    title: 'Comfort Food',
    category: 'Creative Tech',
    description: 'A cozy, story-driven idle cooking game built in Godot Engine. Serve meaningful meals to late-night customers and uncover their stories, one dish at a time.',
    highlight: 'A heartfelt game blending idle mechanics with narrative storytelling.',
    tags: ['Godot', 'GDScript', 'Game Dev', 'Narrative', 'Indie'],
    metrics: 'Story-driven • Cozy idle mechanics',
    iconName: 'Sparkles',
    githubUrl: 'https://github.com/Reeeeeee4/comfort-food',
    details: {
      problem: 'Wanted to explore storytelling through gameplay mechanics — making the act of cooking feel emotionally meaningful rather than just a score system.',
      solution: 'Built a cozy idle loop in Godot where each customer has a backstory revealed through their food orders, blending warm pixel art with gentle narrative beats.',
      architecture: [
        'Godot Engine scene system for modular customer and story states',
        'GDScript dialogue engine with branching narrative trees',
        'Custom idle timer system tied to emotional story progression'
      ],
      impact: 'A personal creative project exploring the intersection of comfort, food, and human connection through game design.'
    }
  },
  {
    id: 'daily-horoscope-bot',
    title: 'Daily Horoscope Bot',
    category: 'Creative Tech',
    description: 'An automated bot that delivers daily horoscope readings. A fun little automation project mixing astrology APIs with scheduled messaging — runs itself, no fuss.',
    highlight: 'Automated daily horoscope delivery with zero manual effort.',
    tags: ['Python', 'Automation', 'Bot', 'API', 'Scheduler'],
    metrics: 'Daily auto-delivery • 0 manual interventions',
    iconName: 'Activity',
    githubUrl: 'https://github.com/Reeeeeee4/daily-horoscope-bot',
    details: {
      problem: 'Wanted a fun automation challenge — building something that runs itself and brings a small daily ritual to users without any manual effort.',
      solution: 'Wrote a bot that pulls horoscope data from an API on a daily schedule and sends personalized readings, built as a lightweight and self-sustaining script.',
      architecture: [
        'Scheduled Python script with cron-style task runner',
        'External horoscope API integration with data parsing',
        'Configurable delivery targets and message formatting'
      ],
      impact: 'A playful, fully automated bot that runs quietly in the background — proving that automation can be whimsical too.'
    }
  },
  {
    id: 'rockoo',
    title: 'Rockoo',
    category: 'Web Apps',
    description: 'A personal creative web project and experiment in building something expressive and playful on the web — mixing UI ideas with a creative concept.',
    highlight: 'A creative web experiment with personality.',
    tags: ['Web', 'Creative', 'JavaScript', 'CSS', 'Interactive'],
    metrics: 'Personal project • Creative exploration',
    iconName: 'FolderGit2',
    githubUrl: 'https://github.com/Reeeeeee4/rockoo',
    details: {
      problem: 'Exploring how far you can push creative expression purely through web technologies — no heavy frameworks, just ideas and code.',
      solution: 'A self-initiated creative build combining interactive UI elements with an original concept, designed as a playground for web experimentation.',
      architecture: [
        'Vanilla JavaScript with custom interaction logic',
        'Expressive CSS animations and micro-transitions',
        'Lightweight and dependency-free build'
      ],
      impact: 'A reminder that the web is a creative medium — and that building just for fun is always worth it.'
    }
  },
  {
    id: 'first-game',
    title: 'First Game',
    category: 'Creative Tech',
    description: 'My very first game built in Godot following tutorials. A browser-playable platformer featuring a knight — a milestone project and the start of my game dev journey.',
    highlight: 'My first published game — a Godot platformer playable in the browser.',
    tags: ['Godot', 'GDScript', 'Platformer', 'Game Dev', 'HTML5'],
    metrics: '4/5 ⭐ on itch.io • Browser playable',
    iconName: 'Terminal',
    demoUrl: 'https://reee4.itch.io/first-game',
    details: {
      problem: 'Wanted to learn game development from scratch — picking up Godot and committing to shipping something real, even if it was small.',
      solution: 'Followed Godot tutorials to build a platformer with a knight character, then published it on itch.io as a playable HTML5 game to close the feedback loop.',
      architecture: [
        'Godot Engine with GDScript for player controller and physics',
        'Scene-based level design with tile maps',
        'Exported as HTML5 for instant browser play on itch.io'
      ],
      impact: 'Rated 4 out of 5 stars on itch.io — a proud first step into game development that sparked the Comfort Food project.'
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages & Development',
    description: 'Building applications and exploring solutions across different programming paradigms.',
    skills: [
      { name: 'C & Java', description: 'Programming fundamentals and problem-solving' },
      { name: 'Python & R', description: 'Scripting, data analysis, and computational experiments' },
      { name: 'JavaScript & PHP', description: 'Web development and application logic' },
      { name: 'Kotlin', description: 'Android application development' },
      { name: 'HTML5 & CSS3', description: 'Responsive layouts and modern web interfaces' },
      { name: 'SQL', description: 'Relational database queries and data management' }
    ]
  },
  {
    title: 'Web Development & Frameworks',
    description: 'Developing responsive websites and web applications with practical development tools and frameworks.',
    skills: [
      { name: 'Laravel & PHP', description: 'Server-side web development' },
      { name: 'WordPress', description: 'Website development and content management' },
      { name: 'Bootstrap & jQuery', description: 'UI development and interactive web components' },
      { name: 'Node.js & npm', description: 'JavaScript runtime and package management' },
      { name: 'Vite', description: 'Frontend development and build tooling' },
      { name: 'Git & GitHub', description: 'Version control and project collaboration' }
    ]
  },
  {
    title: 'Databases, Cloud & Data Science',
    description: 'Exploring data-driven applications, cloud services, and database technologies.',
    skills: [
      { name: 'MySQL & MariaDB', description: 'Relational database management' },
      { name: 'Google Cloud & Firebase', description: 'Cloud platform and application services' },
      { name: 'Anaconda & NumPy', description: 'Python environments and numerical computing' },
      { name: 'Pandas & Matplotlib', description: 'Data analysis and visualization' },
      { name: 'Apache Spark', description: 'Big data processing' },
      { name: 'Scikit-learn, TensorFlow & PyTorch', description: 'Machine learning tools' },
      { name: 'PowerShell & Windows Terminal', description: 'Command-line workflows and scripting' }
    ]
  },
  {
    title: 'Creative Technology & Design',
    description: 'Combining technical problem-solving with visual design and interactive experiences.',
    skills: [
      { name: 'Godot Engine', description: 'Game development and interactive prototypes' },
      { name: 'HTML5 Canvas', description: 'Browser-based graphics and visual experiments' },
      { name: 'Figma & Canva', description: 'Interface design and visual content' },
      { name: 'GIMP, Krita & Sketch', description: 'Image editing and digital graphics' },
      { name: 'Power BI', description: 'Data visualization and reporting' },
      { name: 'Itch.io', description: 'Publishing and showcasing game projects' }
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
