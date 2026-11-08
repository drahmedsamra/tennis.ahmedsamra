"use client";

import type { FormEvent } from "react";
import { Phone, Send, User } from "lucide-react";

import { contactInfo } from "@/config/contact";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type ContactSectionProps = {
  content: Dictionary["contact"];
};

export function ContactSection({ content }: ContactSectionProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const message = [
      `${content.form.name}: ${formData.get("name") ?? ""}`,
      `${content.form.phone}: ${formData.get("phone") ?? ""}`,
      `${content.form.message}: ${formData.get("message") ?? ""}`,
    ].join("\n");

    window.open(
      `${contactInfo.whatsappHref}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-b-4 border-background bg-[#f6f8f5]">
      <div className="marketing-shell py-10 sm:py-20 lg:py-28">
        <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16">
          <p className="marketing-kicker">{content.eyebrow}</p>
          <div>
            <h2 id="contact-heading" className="marketing-heading max-w-3xl">{content.heading}</h2>
            <p className="marketing-copy mt-3 max-w-3xl sm:mt-5">{content.introduction}</p>
          </div>
        </div>

        <div className="mt-8 max-w-2xl border-t border-border/80 pt-8 sm:mt-12 sm:pt-10">
          <form className="border border-border/80 bg-muted/30 p-5 sm:p-8" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="contact-name" label={content.form.name} name="name" autoComplete="name" icon={User} required />
              <FormField id="contact-phone" label={content.form.phone} name="phone" type="tel" autoComplete="tel" icon={Phone} required />
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="text-sm font-medium text-foreground">{content.form.message}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  className="mt-3 min-h-32 w-full resize-y rounded-md border border-border bg-background px-4 py-3 text-sm leading-7 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
                  placeholder={content.form.messagePlaceholder}
                />
              </div>
            </div>

            <button type="submit" className="mt-8 inline-flex h-12 w-full items-center justify-center gap-3 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              <Send className="size-4" aria-hidden />
              {content.form.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

type FormFieldProps = {
  autoComplete?: string;
  className?: string;
  icon: typeof User;
  id: string;
  label: string;
  name: string;
  required?: boolean;
  type?: string;
};

function FormField({ autoComplete, className, icon: Icon, id, label, name, required = false, type = "text" }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>
      <div className="relative mt-3">
        <Icon className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-primary" aria-hidden />
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          className="h-12 w-full rounded-md border border-border bg-background px-11 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
        />
      </div>
    </div>
  );
}
