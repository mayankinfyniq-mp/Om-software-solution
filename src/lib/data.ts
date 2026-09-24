/* ------------------------------------------------------------------ */
/*  OM Software Solutions — single source of truth for all content.  */
/*  Company established in 2026.                                     */
/* ------------------------------------------------------------------ */

export type Service = {
  id: string;
  title: string;
  short: string;
  description: string;
  deliverables: string[];
  tags: string[];
};

export type ProjectResult = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  image: string;
  description: string;
  results: ProjectResult[];
  stack: string[];
  tags: string[];
};

export type Milestone = {
  year: string;
  title: string;
  desc: string;
};

export type Value = {
  title: string;
  description: string;
};

export type Capability = {
  title: string;
  items: string[];
};

export type EngagementModel = {
  title: string;
  description: string;
  features: string[];
  popular?: boolean;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};


/* ------------------------------- Navigation ------------------------------ */

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];


/* -------------------------------- Socials -------------------------------- */

export const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/om-software-solutions",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/omsoftwaresolutions",
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/omsoftwaresolutions",
  },
  {
    label: "GitHub",
    href: "https://github.com/omsoftwaresolutions",
  },
];


/* --------------------------------- Stats --------------------------------- */

export const stats: Stat[] = [
  {
    value: 2026,
    suffix: "",
    label: "Founded",
  },
  {
    value: 2,
    suffix: "+",
    label: "Months in operation",
  },
  {
    value: 3,
    suffix: "+",
    label: "Active projects",
  },
  {
    value: 1,
    suffix: "",
    label: "Focused studio",
  },
];


/* ------------------------------- Services -------------------------------- */

export const services: Service[] = [
  {
    id: "01",
    title: "Web Development",
    short: "Modern websites & web platforms",
    description:
      "We build fast, responsive and distinctive websites for businesses that want a stronger digital presence — from polished company websites to custom web applications.",
    deliverables: [
      "Business websites",
      "Landing pages",
      "Portfolio websites",
      "Web applications",
      "E-commerce websites",
      "API integrations",
    ],
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
    ],
  },

  {
    id: "02",
    title: "Mobile Development",
    short: "Modern iOS & Android experiences",
    description:
      "We design and develop mobile experiences focused on usability, performance and a consistent visual identity across devices.",
    deliverables: [
      "iOS & Android apps",
      "Cross-platform applications",
      "Mobile UI development",
      "Firebase integration",
      "Push notifications",
      "App deployment support",
    ],
    tags: [
      "Flutter",
      "React Native",
      "Firebase",
      "Node.js",
    ],
  },

  {
    id: "03",
    title: "UI/UX Design",
    short: "Interfaces built around your users",
    description:
      "We turn ideas into clear, modern interfaces through structured UX thinking, visual design and interactive prototypes.",
    deliverables: [
      "Website UI/UX",
      "Mobile app UI/UX",
      "Wireframes",
      "Interactive prototypes",
      "Design systems",
      "Brand-focused interfaces",
    ],
    tags: [
      "Figma",
      "Design systems",
      "Motion design",
      "Prototyping",
    ],
  },

  {
    id: "04",
    title: "AI Solutions",
    short: "Practical AI for real products",
    description:
      "We help businesses explore and integrate practical AI features into websites, applications and internal workflows.",
    deliverables: [
      "AI chat interfaces",
      "AI automation",
      "Document analysis",
      "AI-powered search",
      "API integrations",
      "Custom AI prototypes",
    ],
    tags: [
      "Python",
      "OpenAI",
      "LLM APIs",
      "RAG",
      "FastAPI",
    ],
  },

  {
    id: "05",
    title: "Creative Development",
    short: "Interactive experiences with motion",
    description:
      "For brands that want something beyond a standard website, we create immersive interfaces using animation, interaction and 3D technologies.",
    deliverables: [
      "Scroll animations",
      "Interactive websites",
      "3D web experiences",
      "WebGL experiments",
      "GSAP animations",
      "Micro-interactions",
    ],
    tags: [
      "GSAP",
      "Three.js",
      "WebGL",
      "Framer Motion",
      "Lenis",
    ],
  },
];


/* -------------------------------- Projects ------------------------------- */

export const projects: Project[] = [
  {
    slug: "om-studio",
    title: "OM Studio",
    tagline: "A cinematic digital identity for a modern software studio",
    category: "Web",
    year: "2026",
    image: "/images/work-ai.jpg",
    description:
      "The official digital experience for OM Software Solutions — designed around a dark visual system, expressive typography, smooth transitions and a strong focus on technology and craftsmanship.",
    results: [
      {
        value: "2026",
        label: "Studio launch",
      },
      {
        value: "Next.js",
        label: "Technology",
      },
      {
        value: "01",
        label: "Digital identity",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Three.js",
    ],
    tags: [
      "Agency",
      "Creative development",
      "Digital identity",
    ],
  },

  {
    slug: "business-web",
    title: "Business Web",
    tagline: "A modern web presence for growing businesses",
    category: "Web",
    year: "2026",
    image: "/images/work-commerce.jpg",
    description:
      "A business-focused website concept built around clear communication, strong visual hierarchy and conversion-focused sections for companies looking to modernize their online presence.",
    results: [
      {
        value: "2026",
        label: "Recent work",
      },
      {
        value: "Responsive",
        label: "Design",
      },
      {
        value: "SEO",
        label: "Ready",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
    ],
    tags: [
      "Business",
      "Corporate",
      "Web design",
    ],
  },

  {
    slug: "ai-platform",
    title: "AI Platform",
    tagline: "An exploration of AI-powered product experiences",
    category: "AI & Web",
    year: "2026",
    image: "/images/work-ai.jpg",
    description:
      "A product concept exploring how AI can be integrated into a modern web application through conversational interfaces, structured information and intelligent workflows.",
    results: [
      {
        value: "AI",
        label: "Core technology",
      },
      {
        value: "Web",
        label: "Platform",
      },
      {
        value: "2026",
        label: "Concept",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "AI APIs",
    ],
    tags: [
      "Artificial intelligence",
      "SaaS",
      "Product concept",
    ],
  },

  {
    slug: "commerce-experience",
    title: "Commerce Experience",
    tagline: "A visual e-commerce experience for modern brands",
    category: "E-Commerce",
    year: "2026",
    image: "/images/work-commerce.jpg",
    description:
      "A modern e-commerce experience focused on product storytelling, smooth navigation, responsive layouts and a clean purchasing journey.",
    results: [
      {
        value: "2026",
        label: "Recent work",
      },
      {
        value: "Mobile-first",
        label: "Approach",
      },
      {
        value: "E-Commerce",
        label: "Focus",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shopify",
    ],
    tags: [
      "E-Commerce",
      "Retail",
      "Product design",
    ],
  },

  {
    slug: "health-platform",
    title: "Health Platform",
    tagline: "A clean digital experience for healthcare services",
    category: "Healthcare",
    year: "2026",
    image: "/images/work-health.jpg",
    description:
      "A healthcare interface concept focused on accessibility, trust and straightforward user journeys for patients and service providers.",
    results: [
      {
        value: "UX",
        label: "First approach",
      },
      {
        value: "Responsive",
        label: "Experience",
      },
      {
        value: "2026",
        label: "Concept",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
    ],
    tags: [
      "Healthcare",
      "UX",
      "Web application",
    ],
  },

  {
    slug: "property-experience",
    title: "Property Experience",
    tagline: "An immersive digital experience for real estate",
    category: "WebGL",
    year: "2026",
    image: "/images/work-realestate.jpg",
    description:
      "An interactive real-estate concept combining strong visual storytelling with smooth motion and immersive 3D elements to make property discovery more engaging.",
    results: [
      {
        value: "3D",
        label: "Experience",
      },
      {
        value: "WebGL",
        label: "Technology",
      },
      {
        value: "2026",
        label: "Concept",
      },
    ],
    stack: [
      "Three.js",
      "WebGL",
      "Next.js",
      "GSAP",
    ],
    tags: [
      "Real estate",
      "3D",
      "Interactive web",
    ],
  },
];


/* -------------------------------- Process -------------------------------- */

export const processSteps = [
  {
    n: "01",
    title: "Discover",
    desc:
      "We start by understanding your business, audience, goals and technical requirements before deciding what needs to be built.",
    items: [
      "Requirement discussion",
      "Business understanding",
      "Technical planning",
      "Project roadmap",
    ],
  },

  {
    n: "02",
    title: "Design",
    desc:
      "We turn the requirements into a clear visual direction and user experience before development begins.",
    items: [
      "UX flows",
      "Wireframes",
      "High-fidelity design",
      "Interactive prototypes",
    ],
  },

  {
    n: "03",
    title: "Develop",
    desc:
      "Development happens in focused stages with regular communication, testing and progress reviews.",
    items: [
      "Frontend development",
      "Backend development",
      "API integrations",
      "Testing & refinement",
    ],
  },

  {
    n: "04",
    title: "Launch",
    desc:
      "Once everything is tested and approved, we prepare the project for deployment and stay available for improvements.",
    items: [
      "Deployment",
      "Performance checks",
      "Final QA",
      "Post-launch support",
    ],
  },
];


/* --------------------------------- About --------------------------------- */

export const values: Value[] = [
  {
    title: "Craft over shortcuts",
    description:
      "We care about the details that make a digital product feel polished — from typography and spacing to interactions and performance.",
  },

  {
    title: "Build with curiosity",
    description:
      "We experiment with new technologies and ideas while keeping the final product practical, maintainable and useful.",
  },

  {
    title: "Clear communication",
    description:
      "As a growing studio, we believe in direct communication, realistic timelines and keeping clients involved throughout the process.",
  },

  {
    title: "Grow together",
    description:
      "Every project is an opportunity to build something valuable for the client while continuously improving our own craft.",
  },
];


/* ------------------------------- Milestones ------------------------------ */

export const milestones: Milestone[] = [
  {
    year: "2026",
    title: "The idea becomes OM",
    desc:
      "OM Software Solutions begins in Ahmedabad with a clear ambition — to build digital experiences that combine strong engineering, thoughtful design and modern technology.",
  },

  {
    year: "2026",
    title: "From first build to first clients",
    desc:
      "Within the first few months, OM begins turning ideas into real websites and digital products, working closely with early clients and building a foundation for long-term partnerships.",
  },

  {
    year: "2026",
    title: "Building what comes next",
    desc:
      "With the foundation in place, OM is expanding its capabilities across web, AI, mobile and creative development — one meaningful project at a time.",
  },
];


/* ------------------------------ Capabilities ----------------------------- */

export const capabilities: Capability[] = [
  {
    title: "Design",
    items: [
      "Product & UX design",
      "Website UI/UX",
      "Design systems",
      "Interactive prototypes",
      "Motion design",
      "Brand-focused interfaces",
    ],
  },

  {
    title: "Engineering",
    items: [
      "Web development",
      "Mobile applications",
      "APIs & integrations",
      "Database development",
      "Cloud deployment",
      "AI-powered solutions",
    ],
  },

  {
    title: "Creative Technology",
    items: [
      "GSAP animation",
      "Three.js",
      "WebGL",
      "Interactive experiences",
      "3D web experiences",
      "Performance optimization",
    ],
  },
];


/* ------------------------------- Engagement ------------------------------ */

export const engagementModels: EngagementModel[] = [
  {
    title: "Project Based",
    description:
      "A clearly defined project with agreed deliverables, timeline and scope. Suitable for websites, MVPs and digital launches.",
    features: [
      "Defined project scope",
      "Milestone-based development",
      "Regular progress updates",
      "Launch support",
    ],
  },

  {
    title: "Dedicated Development",
    description:
      "Work directly with our development team for a longer-term product or application build.",
    features: [
      "Dedicated development capacity",
      "Direct communication",
      "Flexible development roadmap",
      "Ongoing improvements",
    ],
    popular: true,
  },

  {
    title: "Monthly Support",
    description:
      "Ongoing technical and design support for websites and applications after launch.",
    features: [
      "Website updates",
      "Bug fixes",
      "Performance improvements",
      "Small feature additions",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "OM Software Solutions is a new studio built around a simple idea: create thoughtful, modern digital products without unnecessary complexity.",
    author: "OM Software Solutions",
    role: "Studio statement · 2026",
  },
];


/* -------------------------------- Tech Stack ------------------------------ */

export const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Flutter",
  "React Native",
  "Python",
  "Three.js",
  "GSAP",
  "Tailwind CSS",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "AWS",
  "Vercel",
  "Docker",
  "OpenAI",
];


/* -------------------------------- Budgets -------------------------------- */

export const budgets = [
  "< ₹1L",
  "₹1–3L",
  "₹3–5L",
  "₹5L+",
];


/* ------------------------------ Contact Info ------------------------------ */

export const contactBlocks = [
  {
    label: "Email",
    value: "omsoftwaresolutionsindia@gmail.com",
    href: "mailto:omsoftwaresolutionsindia@gmail.com",
  },

  {
    label: "Phone",
    value: "+91 9909563850",
    href: "tel:+919909563850",
  },

  {
    label: "Studio",
    value: "Ahmedabad, Gujarat, India",
  },

  {
    label: "Hours",
    value: "Mon – Sat · 10:00 – 19:00 IST",
  },
];