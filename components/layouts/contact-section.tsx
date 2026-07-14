"use client";

import type { FormEvent } from "react";
import { AtSign, Mail, MessageCircle, Phone, Send, User } from "lucide-react";

import { contactInfo } from "@/config/contact";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type ContactSectionProps = {
  content: Dictionary["contact"];
};

const contactMethods = [
  {
    key: "phone",
    icon: Phone,
    value: contactInfo.phoneDisplay,
    href: contactInfo.phoneHref,
  },
  {
    key: "whatsapp",
    icon: MessageCircle,
    value: contactInfo.whatsappDisplay,
    href: contactInfo.whatsappHref,
  },
  {
    key: "email",
    icon: Mail,
    value: contactInfo.email,
    href: contactInfo.emailHref,
  },
] as const;

export function ContactSection({ content }: ContactSectionProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const message = [
      `${content.form.name}: ${formData.get("name") ?? ""}`,
      `${content.form.phone}: ${formData.get("phone") ?? ""}`,
      `${content.form.email}: ${formData.get("email") ?? ""}`,
      `${content.form.message}: ${formData.get("message") ?? ""}`,
    ].join("\n");

    window.open(
      `${contactInfo.whatsappHref}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-14 overflow-hidden lg:scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl px-6 py-32 lg:px-8 lg:py-44">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 xl:gap-28">
          <div className="luxury-reveal">
            <p className="text-[0.6875rem] font-semibold tracking-[0.28em] text-primary uppercase">
              {content.eyebrow}
            </p>
            <h2
              id="contact-heading"
              className="mt-6 max-w-3xl text-3xl font-semibold leading-[1.18] text-foreground sm:text-4xl lg:text-5xl"
            >
              {content.heading}
            </h2>
          </div>

          <div className="luxury-reveal luxury-reveal-delay-1 flex items-end">
            <p className="max-w-2xl text-base leading-[1.95] text-muted-foreground sm:text-lg">
              {content.introduction}
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-4 lg:mt-28 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              const label = content.methods[method.key];

              return (
                <a
                  key={method.key}
                  href={method.href}
                  target={method.key === "whatsapp" ? "_blank" : undefined}
                  rel={method.key === "whatsapp" ? "noreferrer" : undefined}
                  className={cn(
                    "luxury-reveal group relative min-h-40 overflow-hidden rounded-xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30",
                    index === 0 && "luxury-reveal-delay-1",
                    index === 1 && "luxury-reveal-delay-2",
                    index === 2 && "luxury-reveal-delay-3",
                  )}
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="flex size-10 items-center justify-center rounded-full border border-border/70 bg-background text-primary transition-colors duration-300 group-hover:border-primary/30">
                    <Icon className="size-4" aria-hidden />
                  </div>
                  <p className="mt-8 text-sm font-semibold text-foreground">
                    {label}
                  </p>
                  <p className="mt-3 break-words text-sm leading-7 text-muted-foreground">
                    {method.value}
                  </p>
                </a>
              );
            })}
          </div>

          <form
            className="luxury-reveal luxury-reveal-delay-2 rounded-xl border border-border/70 bg-card p-6 sm:p-8"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                id="contact-name"
                label={content.form.name}
                name="name"
                autoComplete="name"
                icon={User}
              />
              <FormField
                id="contact-phone"
                label={content.form.phone}
                name="phone"
                type="tel"
                autoComplete="tel"
                icon={Phone}
              />
              <FormField
                id="contact-email"
                label={content.form.email}
                name="email"
                type="email"
                autoComplete="email"
                icon={AtSign}
                className="sm:col-span-2"
              />
              <div className="sm:col-span-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-foreground"
                >
                  {content.form.message}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  className="mt-3 min-h-36 w-full resize-y rounded-xl border border-border/70 bg-background px-4 py-3 text-sm leading-7 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/40"
                  placeholder={content.form.messagePlaceholder}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex h-12 w-full items-center justify-center gap-3 rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-opacity duration-200 hover:opacity-90 sm:w-auto"
            >
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
  type?: string;
};

function FormField({
  autoComplete,
  className,
  icon: Icon,
  id,
  label,
  name,
  type = "text",
}: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative mt-3">
        <Icon
          className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-primary"
          aria-hidden
        />
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          className="h-12 w-full rounded-full border border-border/70 bg-background px-11 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/40"
        />
      </div>
    </div>
  );
}
