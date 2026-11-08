import { MessageCircle, Phone } from "lucide-react";

import { contactInfo } from "@/config/contact";

type MobileContactActionsProps = {
  callLabel: string;
  whatsappLabel: string;
};

export function MobileContactActions({
  callLabel,
  whatsappLabel,
}: MobileContactActionsProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-between px-5 sm:hidden">
      <a
        href={contactInfo.phoneHref}
        aria-label={callLabel}
        title={callLabel}
        className="pointer-events-auto inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_24px_rgba(13,38,28,0.25)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Phone className="size-5" aria-hidden />
      </a>
      <a
        href={contactInfo.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label={whatsappLabel}
        title={whatsappLabel}
        className="pointer-events-auto inline-flex size-12 items-center justify-center rounded-full border border-primary/25 bg-background text-primary shadow-[0_10px_24px_rgba(13,38,28,0.18)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <MessageCircle className="size-5" aria-hidden />
      </a>
    </div>
  );
}
