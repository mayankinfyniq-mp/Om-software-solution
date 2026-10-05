
"use client";

import { useState } from "react";
import { budgets } from "@/lib/data";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  mobile1: string;
  mobile2: string;
  company: string;
  budget: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  mobile1: "",
  mobile2: "",
  company: "",
  budget: budgets[1],
  message: "",
};

const inputCls =
  "peer w-full border-0 border-b border-white/15 bg-transparent py-4 text-lg text-accent outline-none ring-0 transition-colors duration-300 placeholder-transparent focus:border-primary focus:outline-none focus:ring-0";

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
        className={cn(
          "pointer-events-none absolute left-0 top-4 z-10 px-1",
          "bg-[#0b101a]",
          "text-accent/45",
          "transition-all duration-300 ease-out",
          "peer-focus:-top-3",
          "peer-focus:text-[11px]",
          "peer-focus:uppercase",
          "peer-focus:tracking-[0.2em]",
          "peer-focus:text-primary",
          "peer-[:not(:placeholder-shown)]:-top-3",
          "peer-[:not(:placeholder-shown)]:text-[11px]",
          "peer-[:not(:placeholder-shown)]:uppercase",
          "peer-[:not(:placeholder-shown)]:tracking-[0.2em]",
          "peer-[:not(:placeholder-shown)]:text-primary/80",
        )}
      >
        {label}
      </label>
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);

  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const [phoneError, setPhoneError] = useState(false);

  const update =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >,
    ) => {
      setForm((f) => ({
        ...f,
        [key]: e.target.value,
      }));

      // Clear the validation error when the user
      // enters either phone number.
      if (key === "mobile1" || key === "mobile2") {
        setPhoneError(false);
      }
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    // At least one phone number is required.
    if (!form.mobile1.trim() && !form.mobile2.trim()) {
      setPhoneError(true);
      return;
    }

    setPhoneError(false);
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to send message.",
        );
      }

      setStatus("sent");
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  };

  /*
   * SUCCESS STATE
   */
  if (status === "sent") {
    return (
      <div className="animate-pop flex min-h-[26rem] flex-col items-center justify-center rounded-2xl border border-primary/30 bg-primary/5 p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl text-ink">
          ✓
        </span>

        <h3 className="mt-6 font-display text-3xl font-semibold">
          Message sent!
        </h3>

        <p className="mt-3 max-w-sm leading-relaxed text-accent/60">
          Thanks, {form.name.split(" ")[0] || "friend"} — your
          message is on its way. We&apos;ll get back to you
          within 24 hours.
        </p>

        <button
          type="button"
          onClick={() => {
            setForm(initial);
            setPhoneError(false);
            setStatus("idle");
          }}
          className="mt-8 rounded-full border border-white/15 px-6 py-3 text-sm transition-colors hover:border-primary hover:text-primary"
        >
          Send another message
        </button>
      </div>
    );
  }

  /*
   * FORM
   */
  return (
    <form onSubmit={submit} className="space-y-12">
      {/* NAME + EMAIL */}
      <div className="grid gap-12 sm:grid-cols-2">
        <Field id="name" label="Your name *">
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder=" "
            autoComplete="name"
            value={form.name}
            onChange={update("name")}
            className={inputCls}
          />
        </Field>

        <Field id="email" label="Email (optional)">
          <input
            id="email"
            name="email"
            type="email"
            placeholder=" "
            autoComplete="email"
            value={form.email}
            onChange={update("email")}
            className={inputCls}
          />
        </Field>
      </div>

      {/* PHONE NUMBERS */}
      <div className="grid gap-12 sm:grid-cols-2">
        <Field id="mobile1" label="Contact number *">
          <input
            id="mobile1"
            name="mobile1"
            type="tel"
            placeholder=" "
            autoComplete="tel"
            inputMode="tel"
            value={form.mobile1}
            onChange={update("mobile1")}
            className={cn(
              inputCls,
              phoneError && "border-red-400/70",
            )}
          />
        </Field>

        <Field id="mobile2" label="Alternate contact number">
          <input
            id="mobile2"
            name="mobile2"
            type="tel"
            placeholder=" "
            inputMode="tel"
            value={form.mobile2}
            onChange={update("mobile2")}
            className={cn(
              inputCls,
              phoneError && "border-red-400/70",
            )}
          />
        </Field>
      </div>

      {/* PHONE VALIDATION */}
      {phoneError && (
        <p className="-mt-8 text-sm text-red-400">
          Please provide at least one contact number.
        </p>
      )}

      {/* COMPANY */}
      <Field id="company" label="Company (optional)">
        <input
          id="company"
          name="company"
          type="text"
          placeholder=" "
          autoComplete="organization"
          value={form.company}
          onChange={update("company")}
          className={inputCls}
        />
      </Field>

      {/* PROJECT BUDGET */}
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
                onChange={() =>
                  setForm((f) => ({
                    ...f,
                    budget: b,
                  }))
                }
                className="peer sr-only"
              />

              <span
                className="
                  inline-block
                  rounded-full
                  border
                  border-white/15
                  px-5
                  py-2.5
                  text-sm
                  text-accent/65
                  transition-all
                  duration-300
                  hover:border-white/40
                  peer-checked:border-primary
                  peer-checked:bg-primary
                  peer-checked:font-semibold
                  peer-checked:text-ink
                "
              >
                {b}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* MESSAGE */}
      <Field
        id="message"
        label="Tell us about your project *"
      >
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder=" "
          value={form.message}
          onChange={update("message")}
          className={cn(
            inputCls,
            "min-h-[9rem] resize-none",
          )}
        />
      </Field>

      {/* API ERROR */}
      {status === "error" && (
        <div
          role="alert"
          className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300"
        >
          Something went wrong while sending your message.
          Please try again.
        </div>
      )}

      {/* SUBMIT */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="
            rounded-full
            bg-primary
            px-9
            py-4
            text-sm
            font-bold
            uppercase
            tracking-[0.15em]
            text-ink
            transition-all
            duration-300
            hover:scale-[1.04]
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {status === "sending"
            ? "Sending…"
            : status === "error"
              ? "Try again ↗"
              : "Send message ↗"}
        </button>

        <p className="text-xs text-accent/40">
          We reply within 24 hours — usually much faster.
        </p>
      </div>
    </form>
  );
}
