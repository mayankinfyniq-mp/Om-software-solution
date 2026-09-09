"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";

const LenisContext = createContext<Lenis | null>(null);

/** Direct access to the Lenis instance (null before mount / if reduced motion). */
export const useLenisInstance = () => useContext(LenisContext);

/**
 * Ref that always points at the latest Lenis instance — safe to read inside
 * long-lived GSAP timelines without re-running their effects.
 */
export function useLenisRef() {
  const value = useContext(LenisContext);
  const ref = useRef<Lenis | null>(value);
  useIsoLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}

/**
 * Buttery smooth scrolling (Lenis) wired into GSAP's ticker so ScrollTrigger
 * stays perfectly in sync. Disabled for users who prefer reduced motion.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({ lerp: 0.1, smoothWheel: true });
    instance.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    // Keep ScrollTrigger measurements honest once fonts & images settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      window.removeEventListener("load", refresh);
      setLenis(null);
    };
  }, []);

  // Reset scroll position on every route change (Lenis needs an explicit reset).
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
