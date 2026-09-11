/* ------------------------------------------------------------------ */
/*  OM Software Solutions — single source of truth for all content.    */
/*  Edit this file to update services, projects, stats, contact info…  */
/* ------------------------------------------------------------------ */

export type Service = {
  id: string;
  title: string;
  short: string;
  description: string;
  deliverables: string[];
  tags: string[];
};

export type ProjectResult = { value: string; label: string };

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

export type Milestone = { year: string; title: string; desc: string };
export type Value = { title: string; description: string };
export type Capability = { title: string; items: string[] };
export type EngagementModel = {
  title: string;
  description: string;
  features: string[];
  popular?: boolean;
};
export type Testimonial = { quote: string; author: string; role: string };
export type Stat = { value: number; suffix: string; label: string };

/* ------------------------------- Navigation ------------------------------ */

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/om-software-solutions" },
  { label: "Instagram", href: "https://www.instagram.com/omsoftwaresolutions" },
  { label: "Dribbble", href: "https://dribbble.com/omsoftwaresolutions" },
  { label: "GitHub", href: "https://github.com/omsoftwaresolutions" },
];

/* --------------------------------- Stats --------------------------------- */

export const stats: Stat[] = [
  { value: 10, suffix: "+", label: "Years of craft" },
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 80, suffix: "+", label: "Happy clients" },
  { value: 40, suffix: "+", label: "Designers & engineers" },
];

/* ------------------------------- Services -------------------------------- */

export const services: Service[] = [
  {
    id: "01",
    title: "Web Development",
    short: "High-performance sites & platforms",
    description:
      "Blazing-fast, scalable web platforms engineered for growth — from marketing sites that convert to complex SaaS products handling millions of requests.",
    deliverables: [
      "Corporate websites",
      "SaaS platforms",
      "E-commerce experiences",
      "Progressive web apps",
      "API design & development",
    ],
    tags: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    id: "02",
    title: "Mobile Development",
    short: "Native-feel iOS & Android apps",
    description:
      "Native-quality iOS and Android apps from a single codebase — designed, built and launched end-to-end, with app store strategy included.",
    deliverables: [
      "iOS & Android apps",
      "Cross-platform builds",
      "Offline-first architecture",
      "Push & real-time sync",
      "App store launch kit",
    ],
    tags: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
  },
  {
    id: "03",
    title: "UI/UX Design",
    short: "Interfaces users fall in love with",
    description:
      "Research-driven design that turns complexity into clarity. We design interfaces users don't need a manual for — and brands they remember.",
    deliverables: [
      "Product & UX design",
      "Design systems",
      "Interactive prototypes",
      "User research & testing",
      "Brand identity",
    ],
    tags: ["Figma", "Design tokens", "Motion design", "WebGL"],
  },
  {
    id: "04",
    title: "Cloud & DevOps",
    short: "Ship fast, scale safe",
    description:
      "Infrastructure that scales as you do. Zero-downtime deployments, observable systems and cloud bills that don't keep you up at night.",
    deliverables: [
      "Cloud architecture",
      "CI/CD pipelines",
      "Kubernetes & containers",
      "Monitoring & SRE",
      "Cost optimization",
    ],
    tags: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform"],
  },
  {
    id: "05",
    title: "AI & Data",
    short: "Intelligence baked into your product",
    description:
      "Practical AI that ships — LLM-powered features, intelligent automation and data platforms that turn raw numbers into decisions.",
    deliverables: [
      "LLM-powered apps",
      "Chatbots & RAG systems",
      "ML pipelines",
      "Analytics dashboards",
      "Data engineering",
    ],
    tags: ["Python", "OpenAI", "LangChain", "TensorFlow", "Kafka"],
  },
];

/* -------------------------------- Projects ------------------------------- */

export const projects: Project[] = [
  {
    slug: "payflow",
    title: "PayFlow",
    tagline: "Real-time payments analytics for Indian SMEs",
    category: "Web",
    year: "2025",
    image: "/images/work-fintech.jpg",
    description:
      "PayFlow gives 40,000+ Indian SMEs a live window into their money. We designed and built the complete platform — from the design system to the real-time data pipeline — replacing a decade-old tool with something teams genuinely enjoy using.",
    results: [
      { value: "+240%", label: "User engagement" },
      { value: "99.98%", label: "Uptime" },
      { value: "40k+", label: "Active businesses" },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets", "AWS"],
    tags: ["Fintech", "Dashboard", "Real-time"],
  },
  {
    slug: "medicare-plus",
    title: "MediCare Plus",
    tagline: "Telemedicine for 500k+ patients across Gujarat",
    category: "Mobile",
    year: "2025",
    image: "/images/work-health.jpg",
    description:
      "A telemedicine app connecting patients with 2,000+ doctors — video consultations, e-prescriptions and lifetime health records in one calm, trustworthy interface. Built offline-first for real-world Indian networks.",
    results: [
      { value: "4.9★", label: "Store rating" },
      { value: "500k+", label: "Downloads" },
      { value: "60%", label: "90-day retention" },
    ],
    stack: ["Flutter", "Firebase", "Node.js", "WebRTC"],
    tags: ["Healthcare", "Telemedicine", "Offline-first"],
  },
  {
    slug: "shopkart",
    title: "ShopKart",
    tagline: "Headless commerce for a D2C fashion brand",
    category: "E-Commerce",
    year: "2024",
    image: "/images/work-commerce.jpg",
    description:
      "A headless commerce experience with 3D product views, instant checkout and an admin suite the merchandising team actually loves. Speed was the brand — and the metric.",
    results: [
      { value: "+68%", label: "Conversion rate" },
      { value: "1.2s", label: "Largest contentful paint" },
      { value: "3×", label: "Repeat purchases" },
    ],
    stack: ["Next.js", "Headless Shopify", "Three.js", "Redis"],
    tags: ["Retail", "3D product views", "Headless"],
  },
  {
    slug: "trackiq",
    title: "TrackIQ",
    tagline: "AI fleet intelligence for 12,000 vehicles",
    category: "AI & Data",
    year: "2024",
    image: "/images/work-ai.jpg",
    description:
      "Predictive maintenance and route intelligence for logistics fleets across India. Streaming telemetry from 12,000 vehicles feeds ML models that catch failures weeks before they happen.",
    results: [
      { value: "−31%", label: "Fuel costs" },
      { value: "12k", label: "Vehicles tracked" },
      { value: "99.4%", label: "Prediction accuracy" },
    ],
    stack: ["React", "Python", "TensorFlow", "Kafka", "GCP"],
    tags: ["Logistics", "Machine learning", "IoT"],
  },
  {
    slug: "learnpro",
    title: "LearnPro",
    tagline: "Gamified K-12 learning with 1M+ students",
    category: "Mobile",
    year: "2023",
    image: "/images/work-edtech.jpg",
    description:
      "Offline-first lessons, live classes and a streak engine that keeps a million students coming back daily. Designed with teachers, tested in classrooms, shipped in six months.",
    results: [
      { value: "1M+", label: "Students" },
      { value: "4.7★", label: "Store rating" },
      { value: "3×", label: "Daily sessions" },
    ],
    stack: ["React Native", "Node.js", "MongoDB", "Agora"],
    tags: ["EdTech", "Live classes", "Gamification"],
  },
  {
    slug: "estateverse",
    title: "EstateVerse",
    tagline: "Interactive 3D walkthroughs for unbuilt homes",
    category: "WebGL",
    year: "2023",
    image: "/images/work-realestate.jpg",
    description:
      "An immersive WebGL sales tool that lets buyers explore — and configure — homes that don't exist yet. Finishes, furniture and views, all in real time in the browser.",
    results: [
      { value: "+45%", label: "Pre-bookings" },
      { value: "8 min", label: "Avg. session time" },
      { value: "120+", label: "Projects showcased" },
    ],
    stack: ["Three.js", "WebGL", "Next.js", "Blender"],
    tags: ["Real estate", "3D walkthroughs", "Configurator"],
  },
];

/* -------------------------------- Process -------------------------------- */

export const processSteps = [
  {
    n: "01",
    title: "Discover",
    desc: "We dig deep into your business, users and goals before a single pixel is drawn. No assumptions — evidence.",
    items: ["Stakeholder workshops", "User research", "Technical audit", "Product roadmap"],
  },
  {
    n: "02",
    title: "Design",
    desc: "From wireframes to a pixel-perfect, motion-ready design system. You'll click it, feel it and love it before we build it.",
    items: ["UX flows & wireframes", "High-fidelity design", "Design system", "Interactive prototypes"],
  },
  {
    n: "03",
    title: "Develop",
    desc: "Agile sprints with weekly demos. Clean, typed, tested code — reviewed by seniors, never thrown over a wall.",
    items: ["Agile sprints", "Code reviews", "Weekly demos", "QA automation"],
  },
  {
    n: "04",
    title: "Deliver",
    desc: "Zero-downtime launches, monitoring from day one and a team that stays with you long after go-live.",
    items: ["Zero-downtime launch", "Monitoring & analytics", "Team handover", "Ongoing support"],
  },
];

/* --------------------------------- About --------------------------------- */

export const values: Value[] = [
  {
    title: "Craft over shortcuts",
    description:
      "We sweat the last 5% — the easing curve, the empty state, the 40ms nobody notices. Everybody notices.",
  },
  {
    title: "Curiosity first",
    description:
      "We prototype before we promise. Every project starts with “what if”, never with “here's the template”.",
  },
  {
    title: "Radical transparency",
    description:
      "Weekly demos, honest estimates, open roadmaps. You'll always know exactly where your product stands.",
  },
  {
    title: "Ship with pride",
    description:
      "We don't hand over code — we hand over products we'd put our own name on. Because we do, every time.",
  },
];

export const milestones: Milestone[] = [
  {
    year: "2016",
    title: "OM is born",
    desc: "Three engineers, one rented desk in Ahmedabad and a stubborn belief that Indian software could look world-class.",
  },
  {
    year: "2018",
    title: "Going global",
    desc: "First international clients across the US and UK. 25 projects shipped, zero missed deadlines.",
  },
  {
    year: "2020",
    title: "Remote-first",
    desc: "The world changed; we adapted overnight. 50+ clients and a fully distributed senior team.",
  },
  {
    year: "2022",
    title: "Design studio",
    desc: "We launched our dedicated design practice — research, product design and motion under one roof.",
  },
  {
    year: "2024",
    title: "120 projects strong",
    desc: "A 40-person team crafting platforms used by millions across 6 countries.",
  },
  {
    year: "2026",
    title: "The next decade",
    desc: "AI-native products, immersive 3D web and the same obsession with craft. Want to build it with us?",
  },
];

export const capabilities: Capability[] = [
  {
    title: "Design",
    items: ["Product & UX design", "Design systems", "UX research", "Brand identity", "Motion & 3D design"],
  },
  {
    title: "Engineering",
    items: ["Web platforms", "Mobile apps", "APIs & integrations", "Cloud architecture", "AI & LLM solutions"],
  },
];

/* ------------------------------- Engagement ------------------------------ */

export const engagementModels: EngagementModel[] = [
  {
    title: "Fixed scope",
    description: "A defined outcome, a defined timeline, a defined price. Best for MVPs and launches.",
    features: ["Detailed discovery sprint", "Milestone-based payments", "Launch guarantee"],
  },
  {
    title: "Dedicated team",
    description: "Our senior designers and engineers embedded in your team, working your hours.",
    features: ["Hand-picked seniors", "Direct daily collaboration", "Scale up or down monthly"],
    popular: true,
  },
  {
    title: "Support retainer",
    description: "Continuous improvement for products we've built — or rescued.",
    features: ["Priority SLA", "Monthly improvement sprints", "Monitoring & analytics"],
  },
];

/* ------------------------------ Testimonials ----------------------------- */

export const testimonials: Testimonial[] = [
  {
    quote:
      "OM didn't just build our platform — they reimagined how our customers experience money. The result feels like a product from a company ten times our size.",
    author: "Rahul Mehta",
    role: "CEO · PayFlow",
  },
  {
    quote:
      "The attention to detail is insane. Every interaction, every transition — it all feels intentional. Our app store rating went from 3.8 to 4.9.",
    author: "Dr. Priya Patel",
    role: "Founder · MediCare Plus",
  },
  {
    quote:
      "Fast, honest and ridiculously talented. They shipped in four months what our previous vendor couldn't in a year.",
    author: "Arjun Desai",
    role: "COO · ShopKart",
  },
];

/* --------------------------------- Misc ---------------------------------- */

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
  "AWS",
  "GCP",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "OpenAI",
];

export const budgets = ["< ₹1L", "₹1–5L", "₹5–15L", "₹15L+"];

export const contactBlocks = [
  {
    label: "Email",
    value: "omsoftwaresolutionsindia@gmail.com",
    href: "mailto:omsoftwaresolutionsindia@gmail.com",
  },
  { label: "Phone", value: "+91 9909563850", href: "tel:+919484668161" },
  {
    label: "Studio",
    value: " Ahmedabad, Gujarat,India",
  },
  { label: "Hours", value: "Mon – Sat · 10:00 – 19:00 IST" },
];
