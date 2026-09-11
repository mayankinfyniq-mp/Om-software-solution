"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MenuOverlay from "@/components/layout/MenuOverlay";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("--:--");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );

    update();

    const t = setInterval(update, 20_000);

    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-all duration-500",
          scrolled && !open
            ? "border-b border-white/5 bg-ink/80 py-3 backdrop-blur-md"
            : "bg-transparent py-5"
        )}
      >
        <div className="flex items-center justify-between px-5 md:px-10">
          <Link
  href="/"
  aria-label="OM Software Solutions — home"
  className="group flex items-center gap-4"
  onClick={() => setOpen(false)}
>
  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-primary/20 bg-primary/10 p-1.5 backdrop-blur-sm">
    <img
      src="/images/logo.png"
      alt="OM Software Solutions"
      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  <div className="flex flex-col justify-center">
    <span className="font-display text-[15px] font-bold uppercase leading-none tracking-[0.12em] text-white">
      OM Software
    </span>

    <span className="mt-1.5 font-display text-[10px] font-medium uppercase leading-none tracking-[0.32em] text-white/55">
      Solutions
    </span>
  </div>
</Link>

          <div className="flex items-center gap-6 md:gap-10">
            <span
              suppressHydrationWarning
              className="hidden text-[11px] uppercase tracking-[0.2em] text-accent/45 lg:block"
            >
              Ahmedabad, IN — {time} IST
            </span>

            <Link
              href="/contact"
              className="hidden rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-ink md:block"
            >
              Start a project
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative z-[75] flex h-10 w-10 items-center justify-center"
            >
              <span
                className={cn(
                  "absolute h-[2px] w-6 bg-accent transition-all duration-300",
                  open ? "rotate-45 bg-primary" : "-translate-y-[4px]"
                )}
              />

              <span
                className={cn(
                  "absolute h-[2px] w-6 bg-accent transition-all duration-300",
                  open ? "-rotate-45 bg-primary" : "translate-y-[4px]"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}