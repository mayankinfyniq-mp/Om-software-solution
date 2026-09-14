"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";
export default function ScrubText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 45%",
            scrub: 0.6,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [text]);

  return (
    <p ref={ref} className={className} aria-label={text.replace(/\*/g, "")}>
      {text.split(" ").map((word, i) => {
        const accent = word.startsWith("*");
        const clean = word.replace(/^\*+|\*+$/g, "");
        return (
          <span
            key={i}
            data-word
            className={`inline-block ${accent ? "text-primary" : ""}`}
          >
            {clean}
            {"\u00A0"}
          </span>
        );
      })}
    </p>
  );
}
