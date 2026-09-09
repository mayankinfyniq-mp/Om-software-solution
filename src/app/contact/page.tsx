import type { Metadata } from "next";
import PageHero from "@/components/sections/shared/PageHero";
import ContactForm from "@/components/sections/contact/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { contactBlocks, socials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start your project with OM Software Solutions. Tell us about your idea — we reply within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title={"LET'S BUILD\nSOMETHING GREAT"}
        accentLine={1}
        description="Tell us where you want to go — we'll help you get there, beautifully."
      />

      <section className="px-5 pb-28 md:px-10 md:pb-40">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <ContactForm />

          <aside>
            {contactBlocks.map((block) => (
              <Reveal key={block.label} y={24} className="border-t border-white/10 py-7">
                <p className="text-[11px] uppercase tracking-[0.3em] text-accent/40">
                  {block.label}
                </p>
                {block.href ? (
                  <a
                    href={block.href}
                    className="link-line mt-2 inline-block font-display text-xl text-accent/90 md:text-2xl"
                  >
                    {block.value}
                  </a>
                ) : (
                  <p className="mt-2 font-display text-xl leading-snug text-accent/90 md:text-2xl">
                    {block.value}
                  </p>
                )}
              </Reveal>
            ))}

            <Reveal y={24} className="border-t border-white/10 py-7">
              <p className="text-[11px] uppercase tracking-[0.3em] text-accent/40">Socials</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-accent/70">
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
            </Reveal>

            <Reveal y={24} delay={0.1} className="mt-10 rounded-2xl border border-primary/25 bg-primary/5 p-6">
              <p className="font-display text-lg font-semibold text-accent">
                Prefer to talk it through? ✦
              </p>
              <p className="mt-2 text-sm leading-relaxed text-accent/60">
                Book a free 30-minute discovery call — we&apos;ll map your idea to a
                realistic scope, timeline and budget. No strings attached.
              </p>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
