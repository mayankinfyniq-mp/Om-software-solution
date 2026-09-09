"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsoLayoutEffect } from "@/lib/hooks";

/** Number that counts up when scrolled into view. */
export default function Counter({
  value,
  suffix = "",
  className = "",
  duration = 2,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: value,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
        },
      });
    });
    return () => ctx.revert();
  }, [value, duration]);

  return (
    <span className={className}>
      <span ref={ref}>0</span>
      <span className="text-primary">{suffix}</span>
    </span>
  );
}
