import type { CSSProperties, ReactNode } from "react";

/**
 * Infinite marquee — content is duplicated across two tracks that translate
 * -100% of their own width for a seamless loop. Pure CSS (no JS), so it works
 * in server components too.
 */
export default function Marquee({
  children,
  duration = 40,
  className = "",
  pauseOnHover = false,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={`flex overflow-hidden ${pauseOnHover ? "marquee-pause" : ""} ${className}`}>
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className="marquee-track flex w-max shrink-0 items-center"
          style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
