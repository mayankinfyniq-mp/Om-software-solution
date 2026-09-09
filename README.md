# OM Software Solutions — Website

A premium, cinematic, multi-page website for **OM Software Solutions**, inspired by the
award-winning [lusion.co](https://lusion.co/) — rebuilt from scratch with the brand's
**Bhagva saffron (#FF671F)** palette on a deep cinematic navy.

![Stack](https://img.shields.io/badge/Next.js-14-black) ![Three.js](https://img.shields.io/badge/Three.js-WebGL-orange) ![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-green) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3-38bdf8)

---

## ✨ Features

- **Cinematic preloader** — brand mark, 0→100 counter, progress bar and a double-curtain (ink → saffron) exit
- **WebGL hero** — a saffron particle orb displaced by 3D simplex noise (Three.js custom shaders), with mouse parallax, scroll drift, mobile-optimized particle counts and a graceful no-WebGL fallback
- **Buttery smooth scrolling** — Lenis wired into GSAP's ticker, perfectly synced with ScrollTrigger
- **Page transitions** — ink + saffron curtain sweep on every route change (`template.tsx`)
- **Custom cursor** — dot + trailing ring that morphs into a labelled saffron bubble (`data-cursor-text="View"`)
- **Full-screen menu** — curtain drop, staggered masked link reveals, live IST clock in the navbar
- **GSAP choreography everywhere** — masked character reveals, word-by-word scrub statements, parallax images, animated counters, horizontal pinned process section, magnetic buttons, infinite marquees
- **5 pages** — Home, About, Services, Work (filterable + case-study modal + `?project=slug` deep links), Contact (validated form with success state)
- **Fully responsive** — fluid `clamp()` typography, adaptive layouts, mobile fallbacks for heavy effects, `prefers-reduced-motion` respected throughout
- **SEO-ready** — per-page metadata, Open Graph, semantic HTML, local variable fonts (no external requests)

## 🧱 Tech stack

| Layer      | Tech                                          |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 14 (App Router) + TypeScript          |
| Styling    | Tailwind CSS (custom design tokens)           |
| Animation  | GSAP + ScrollTrigger, Lenis smooth scroll     |
| 3D         | Three.js (custom GLSL shaders)                |
| Fonts      | Space Grotesk + Inter (local variable woff2)  |

> Note: PrimeVue is a **Vue.js** library and can't run inside Next.js (React), so the UI
> is built with Tailwind + bespoke GSAP-driven components — which is how
> lusion-style sites are built in practice.

## 🚀 Getting started

```bash
npm install     # install dependencies
npm run dev     # start dev server → http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

Requires **Node.js ≥ 18.17**.

## 📁 Project structure

```
om-software-solutions/
├── public/
│   └── images/                  # project covers & studio image (replace with your own)
├── src/
│   ├── app/
│   │   ├── fonts/               # Space Grotesk + Inter (variable, local)
│   │   ├── about/page.tsx       # About page
│   │   ├── services/page.tsx    # Services page
│   │   ├── work/page.tsx        # Work page (grid + modal)
│   │   ├── contact/page.tsx     # Contact page (form + info)
│   │   ├── globals.css          # design tokens, helpers, keyframes
│   │   ├── icon.svg             # favicon
│   │   ├── layout.tsx           # root layout (fonts, providers, nav, footer)
│   │   ├── not-found.tsx        # custom 404
│   │   ├── page.tsx             # home page
│   │   └── template.tsx         # curtain page transitions
│   ├── components/
│   │   ├── layout/              # Navbar, MenuOverlay, Footer
│   │   ├── providers/           # SmoothScroll (Lenis + GSAP wiring)
│   │   ├── sections/
│   │   │   ├── home/            # Hero, MarqueeBand, Manifesto, SelectedWork,
│   │   │   │                    # ServicesPreview, Process, Testimonials
│   │   │   ├── shared/          # PageHero, Stats
│   │   │   ├── work/            # WorkGrid, ProjectModal
│   │   │   ├── contact/         # ContactForm
│   │   │   └── services/        # ServiceBlocks, StackMarquee, EngagementModels
│   │   ├── three/HeroCanvas.tsx # WebGL particle orb (custom shaders)
│   │   └── ui/                  # Preloader, Cursor, Marquee, MagneticButton,
│   │                            # AnimatedHeading, Reveal, Counter, ParallaxImage,
│   │                            # ScrubText, SectionLabel, SectionHeading
│   ├── lib/
│   │   ├── data.ts              # ← ALL site content lives here (edit me!)
│   │   ├── gsap.ts              # gsap + ScrollTrigger registration
│   │   └── utils.ts             # cn(), useIsoLayoutEffect
│   └── types/global.d.ts
├── tailwind.config.ts           # brand colors (primary/secondary/accent/ink)
├── next.config.mjs
└── package.json
```

## 🎨 Customization

- **Colors** — `tailwind.config.ts` (`primary`, `secondary`, `accent`, `ink`, `inksoft`) + CSS variables in `globals.css`
- **Content** — everything (services, projects, stats, values, testimonials, contact info, socials) is in `src/lib/data.ts`
- **Images** — drop your own files into `public/images/` (current ones are AI-generated placeholders)
- **Fonts** — replace the woff2 files in `src/app/fonts/` and update `layout.tsx`
- **Contact form** — wire `submit()` in `src/components/sections/contact/ContactForm.tsx` to Formspree, Resend or your API

## ☁️ Deployment

**Vercel (recommended)** — push to GitHub → "Import Project" on vercel.com → zero config, done.

**Netlify** — build command `npm run build`, publish directory `.next` (with the Next.js runtime plugin).

**Static hosting** — add `output: "export"` to `next.config.mjs`, run `npm run build`, and deploy the generated `out/` folder to any static host.

---

Crafted with 🧡 in Ahmedabad, India · Design inspired by [lusion.co](https://lusion.co/)
