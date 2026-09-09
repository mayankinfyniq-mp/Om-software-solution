"use client";

import { useState } from "react";
import { budgets } from "@/lib/data";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  company: "",
  budget: budgets[1],
  message: "",
};

const inputCls =
  "peer w-full border-b border-white/15 bg-transparent py-4 text-lg text-accent outline-none transition-colors duration-300 placeholder-transparent focus:border-primary";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-4 text-accent/45 transition-all duration-300 peer-focus:-top-3.5 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em]"
      >
        {label}
      </label>
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  /**
   * NOTE: this simulates a successful send. For production, POST to your
   * backend, Formspree, or a Resend/Next.js API route, e.g.:
   *   await fetch("https://formspree.io/f/yourId", { method: "POST", body: ... })
   */
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 900);
  };

  if (status === "sent") {
    return (
      <div className="animate-pop flex min-h-[26rem] flex-col items-center justify-center rounded-2xl border border-primary/30 bg-primary/5 p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl text-ink">
          ✓
        </span>
        <h3 className="mt-6 font-display text-3xl font-semibold">Message sent!</h3>
        <p className="mt-3 max-w-sm leading-relaxed text-accent/60">
          Thanks, {form.name.split(" ")[0] || "friend"} — your message is on its
          way. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setForm(initial);
            setStatus("idle");
          }}
          className="mt-8 rounded-full border border-white/15 px-6 py-3 text-sm transition-colors hover:border-primary hover:text-primary"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-12">
      <div className="grid gap-12 sm:grid-cols-2">
        <Field id="name" label="Your name *">
          <input
            id="name"
            name="name"
            required
            placeholder=" "
            autoComplete="name"
            value={form.name}
            onChange={update("name")}
            className={inputCls}
          />
        </Field>
        <Field id="email" label="Email *">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder=" "
            autoComplete="email"
            value={form.email}
            onChange={update("email")}
            className={inputCls}
          />
        </Field>
      </div>

      <Field id="company" label="Company (optional)">
        <input
          id="company"
          name="company"
          placeholder=" "
          autoComplete="organization"
          value={form.company}
          onChange={update("company")}
          className={inputCls}
        />
      </Field>

      <fieldset>
        <legend className="text-[11px] uppercase tracking-[0.3em] text-accent/45">
          Project budget
        </legend>
        <div className="mt-5 flex flex-wrap gap-3">
          {budgets.map((b) => (
            <label key={b} className="cursor-pointer">
              <input
                type="radio"
                name="budget"
                value={b}
                checked={form.budget === b}
                onChange={() => setForm((f) => ({ ...f, budget: b }))}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-white/15 px-5 py-2.5 text-sm text-accent/65 transition-all duration-300 hover:border-white/40 peer-checked:border-primary peer-checked:bg-primary peer-checked:font-semibold peer-checked:text-ink">
                {b}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="message" label="Tell us about your project *">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder=" "
          value={form.message}
          onChange={update("message")}
          className={cn(inputCls, "resize-none")}
        />
      </Field>

      <div className="flex flex-wrap items-center justify-between gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-primary px-9 py-4 text-sm font-bold uppercase tracking-[0.15em] text-ink transition-all duration-300 hover:scale-[1.04] active:scale-95 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message ↗"}
        </button>
        <p className="text-xs text-accent/40">We reply within 24 hours — usually much faster.</p>
      </div>
    </form>
  );
}
