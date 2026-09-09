"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";

/**
 * Image with scroll parallax + hover zoom. The parallax (GSAP) and the zoom
 * (CSS group-hover) are applied to separate elements so the transforms never
 * fight each other.
 */
export default function ParallaxImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img.current,
        { yPercent: -9 },
        {
          yPercent: 9,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
        <img
          ref={img}
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute left-0 top-[-9%] h-[118%] w-full object-cover"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </div>
  );
}
