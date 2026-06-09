"use client";

import { useState } from "react";

const categories = [
  "General Enquiry",
  "Visa Services",
  "Passport Services",
  "Emergency Travel Certificate",
  "Document Authentication / Notarial",
  "Consular Assistance / Welfare",
  "Trade and Investment",
  "Media / Press",
  "Other",
];

interface Errors {
  [key: string]: string;
}

/**
 * Contact form — collects only the information needed to respond.
 * Includes client-side validation, a honeypot field for basic spam
 * protection, and an explicit consent checkbox.
 */
export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Please enter your full name.";
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = "Please enter a valid email address so we can reply to you.";
    if (!data.subject?.trim()) next.subject = "Please enter a brief subject for your enquiry.";
    if (!data.category) next.category = "Please choose the category that best fits your enquiry.";
    if (!data.message?.trim() || data.message.trim().length < 20)
      next.message = "Please describe your enquiry in at least 20 characters.";
    if (!data.consent)
      next.consent = "Please confirm you consent to the Mission processing your details.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    try {
      setStatus("sending");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded border-l-4 border-brand bg-mist p-6 text-sm leading-relaxed"
      >
        <h3 className="mb-2 font-serif text-lg font-bold text-brand-deep">
          Thank you — your enquiry has been received.
        </h3>
        <p>
          The relevant section of the Mission will respond to the email address you provided,
          normally within three working days. For urgent matters involving the safety of a
          Nigerian citizen, please call the 24-hour emergency line instead.
        </p>
      </div>
    );
  }

  const err = (field: string) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1 text-sm font-medium text-red-700">
        {errors[field]}
      </p>
    ) : null;

  const inputClass = (field: string) =>
    `w-full rounded border px-3 py-2.5 text-sm ${
      errors[field] ? "border-red-700" : "border-line"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby="form-privacy-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-semibold">
            Full name <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass("name")}
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-semibold">
            Email address <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass("email")}
          />
          {err("email")}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-semibold">
            Phone number <span className="font-normal text-ink/60">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass("phone")}
          />
        </div>
        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-semibold">
            Enquiry category <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue=""
            aria-invalid={!!errors.category}
            aria-describedby={errors.category ? "category-error" : undefined}
            className={inputClass("category")}
          >
            <option value="" disabled>
              Select a category…
            </option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {err("category")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="subject" className="mb-1 block text-sm font-semibold">
            Subject <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className={inputClass("subject")}
          />
          {err("subject")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1 block text-sm font-semibold">
            Message <span aria-hidden="true" className="text-red-700">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={inputClass("message")}
          />
          {err("message")}
        </div>
      </div>

      {/* Honeypot — hidden from people, attractive to bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            className="mt-0.5 h-4 w-4 accent-brand"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I consent to the Mission processing the details I have provided for the purpose of
            responding to this enquiry, in line with the{" "}
            <a href="/privacy-policy" className="font-semibold text-brand underline">
              Privacy Policy
            </a>
            . <span aria-hidden="true" className="text-red-700">*</span>
          </span>
        </label>
        {err("consent")}
      </div>

      <p id="form-privacy-note" className="mt-4 text-xs leading-relaxed text-ink/70">
        The Mission collects only the information needed to respond to your enquiry. Your details
        are not shared with third parties and are retained only for as long as necessary to
        resolve your enquiry. Do not include passport numbers, payment details or other sensitive
        information in this form.
      </p>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded border-l-4 border-red-700 bg-red-50 p-3 text-sm">
          Your message could not be sent. Please try again, or email the Mission directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 rounded bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-deep disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}
