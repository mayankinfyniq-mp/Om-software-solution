import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small eyebrow label with a saffron dot — the section signature. */
export default function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-accent/50",
        className
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </div>
  );
}
