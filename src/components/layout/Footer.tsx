"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import Marquee from "@/components/ui/Marquee";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionLabel from "@/components/ui/SectionLabel";
import { useLenisInstance } from "@/components/providers/SmoothScroll";
import { navLinks, services, socials } from "@/lib/data";
import { useIsoLayoutEffect } from "@/lib/hooks";

export default function Footer() {
  const lenis = useLenisInstance();
  const watermark = useRef<HTMLDivElement>(null);
  const [year] = useState(() => new Date().getFullYear());

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        watermark.current,
        { yPercent: 14 },
        {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: watermark.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const toTop = () =>
    lenis
      ? lenis.scrollTo(0, { duration: 1.4 })
      : window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      {/* ------------------------------ Big CTA ------------------------------ */}
      <section className="relative px-5 py-24 text-center md:px-10 md:py-36">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[130px]"
        />
        <div className="relative">
          <SectionLabel className="justify-center">Next project?</SectionLabel>
          <AnimatedHeading
            as="h2"
            trigger="scroll"
            text={"LET'S MAKE IT\nEXTRAORDINARY"}
            accentLine={1}
            className="mx-auto mt-6 font-display text-[clamp(2.4rem,7vw,6.5rem)] font-bold uppercase leading-[0.95] tracking-tight"
          />
          <div className="mt-12 flex justify-center">
            <MagneticButton>
              <Link
                href="/contact"
                data-cursor-text="Go"
                className="group relative flex h-36 w-36 items-center justify-center rounded-full bg-primary text-center text-sm font-bold uppercase leading-tight text-ink transition-transform duration-300 hover:scale-105 md:h-44 md:w-44"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 100 100"
                  className="animate-spin-slow absolute -inset-5 h-auto w-auto"
                >
                  <defs>
                    <path
                      id="om-footer-circle"
                      d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
                    />
                  </defs>
                  <text className="fill-accent/45 text-[5.5px] font-semibold uppercase tracking-[0.32em]">
                    <textPath href="#om-footer-circle">
                      Start a project ✦ Start a project ✦ Start a project ✦
                    </textPath>
                  </text>
                </svg>
                <span>
                  Start a<br />
                  project ↗
                </span>
              </Link>
            </MagneticButton>
          </div>
          <a
            href="mailto:omsoftwaresolutionsindia@gmail.com"
            className="link-line mt-14 inline-block font-display text-xl text-accent/80 md:text-2xl"
          >
            omsoftwaresolutionsindia@gmail.com
          </a>
        </div>
      </section>

      {/* ------------------------------ Marquee ------------------------------ */}
      <div className="overflow-hidden border-y border-white/5 py-8 md:py-10" aria-hidden>
  <Marquee duration={32} pauseOnHover>
    <span className="flex shrink-0 items-center">
      <span className="mx-6 whitespace-nowrap font-display text-4xl font-bold uppercase leading-none tracking-[-0.03em] text-stroke transition-colors duration-300 hover:text-primary md:mx-10 md:text-6xl lg:text-8xl">
        Let&apos;s work together
      </span>

      <span className="mx-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-lg text-ink md:mx-4 md:h-10 md:w-10 md:text-xl lg:h-12 lg:w-12 lg:text-2xl">
        ✦
      </span>
    </span>
  </Marquee>
</div>

      {/* ------------------------------ Columns ------------------------------ */}
      <div className="grid gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr_1.3fr] md:px-10 md:py-20">
        <div>
           <Link
    href="/"
    aria-label="OM Software Solutions — home"
    className="group inline-flex items-center gap-3.5"
  >
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary/20 p-1.5 shadow-[0_0_20px_rgba(235,137,26,0.12)] transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
      <img
        src="/images/logo.png"
        alt="OM Software Solutions"
        className="h-full w-full object-contain"
      />
    </div>

    <div className="flex flex-col justify-center">
      <span className="font-display text-lg font-bold uppercase leading-[1.1] tracking-[0.1em] text-white sm:text-xl">
        OM Software
      </span>

      <span className="mt-1 text-[9px] font-medium uppercase leading-none tracking-[0.32em] text-white/55 sm:text-[10px]">
        Solutions
      </span>
    </div>
  </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-accent/55">
            A full-stack software studio crafting cinematic digital products from
            Ahmedabad, India — for the world.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-accent/60">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="link-line transition-colors hover:text-primary"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="text-[11px] uppercase tracking-[0.3em] text-accent/40">Sitemap</p>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-line text-accent/70 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-accent/40">Expertise</p>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link href="/services" className="link-line text-accent/70 transition-colors hover:text-accent">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-accent/40">Contact</p>
          <ul className="mt-5 space-y-3 text-sm text-accent/70">
            <li>
              <a href="mailto:omsoftwaresolutionsindia@gmail.com" className="link-line">
                omsoftwaresolutionsindia@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+919909563850" className="link-line">
                +91 9909563850
              </a>
            </li>
            <li className="leading-relaxed">
              SG Highway,
              <br />
              Ahmedabad, Gujarat 380015
            </li>
            <li className="text-accent/45">Mon – Sat · 10:00 – 19:00 IST</li>
          </ul>
        </div>
      </div>

      {/* ----------------------------- Watermark ----------------------------- */}
      <div
        ref={watermark}
        aria-hidden
        className="pointer-events-none -mb-[7vw] select-none text-center font-display text-[26vw] font-bold uppercase leading-[0.75] tracking-tight text-white/[0.035]"
      >
        OM
      </div>

      {/* ---------------------------- Bottom bar ----------------------------- */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 px-5 py-6 text-xs text-accent/45 md:flex-row md:px-10">
        <p suppressHydrationWarning>
          © {year} OM Software Solutions. All rights reserved.
        </p>
        <p className="flex items-center gap-2">
          Crafted with <span className="text-primary">🧡</span> in Ahmedabad, India
        </p>
        <button
          onClick={toTop}
          className="link-line uppercase tracking-widest transition-colors hover:text-primary"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
