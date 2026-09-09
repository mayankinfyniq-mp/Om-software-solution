"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";

type Props = {
  /** Use "\n" for line breaks. */
  text: string;
  as?: React.ElementType;
  className?: string;
  /** Index of the line rendered in saffron. */
  accentLine?: number;
  /** Index of the line rendered as outlined (stroke) text. */
  strokeLine?: number;
  /** "mount" plays immediately, "scroll" waits until in view,
   *  "enter" waits for the preloader's om:enter event (page heroes). */
  trigger?: "mount" | "scroll" | "enter";
  delay?: number;
  stagger?: number;
  start?: string;
};

/**
 * Lusion-style masked character reveal. Each line is wrapped in an
 * overflow-hidden mask; characters rise from below with a slight rotation.
 */
export default function AnimatedHeading({
  text,
  as = "h2",
  className,
  accentLine,
  strokeLine,
  trigger = "scroll",
  delay = 0,
  stagger = 0.018,
  start = "top 88%",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const lines = text.split("\n");

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll<HTMLElement>("[data-char]");
    let onEnter: (() => void) | null = null;

    const ctx = gsap.context(() => {
      gsap.set(chars, { yPercent: 120, rotate: 5 });

      const play = (d = delay) =>
        gsap.to(chars, {
          yPercent: 0,
          rotate: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger,
          delay: d,
        });

      if (trigger === "mount") {
        play();
      } else if (trigger === "scroll") {
        ScrollTrigger.create({ trigger: el, start, once: true, onEnter: () => play(0) });
      } else if (trigger === "enter") {
        if (window.__omEnter) {
          play();
        } else {
          onEnter = () => play();
          window.addEventListener("om:enter", onEnter, { once: true });
        }
      }
    }, el);

    return () => {
      if (onEnter) window.removeEventListener("om:enter", onEnter);
      ctx.revert();
    };
  }, [text, trigger, delay, stagger, start, accentLine, strokeLine]);

  const Tag = as as React.ElementType;

  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, li) => (
        <span
          key={li}
          aria-hidden="true"
          className={`block overflow-hidden pb-[0.09em] -mb-[0.09em] ${
            li === strokeLine ? "text-stroke" : ""
          }`}
        >
          <span className={`inline-block ${li === accentLine ? "text-primary" : ""}`}>
            {line.split(" ").map((word, wi, words) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {word.split("").map((ch, ci) => (
                  <span key={ci} data-char className="inline-block will-change-transform">
                    {ch}
                  </span>
                ))}
                {wi < words.length - 1 ? "\u00A0" : null}
              </span>
            ))}
          </span>
        </span>
      ))}
    </Tag>
  );
}
