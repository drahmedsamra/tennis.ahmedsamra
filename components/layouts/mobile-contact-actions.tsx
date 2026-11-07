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
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-5 sm:hidden">
      <div className="grid w-full max-w-sm grid-cols-2 gap-2 rounded-md border border-border/80 bg-background p-2 shadow-[0_12px_32px_rgba(13,38,28,0.18)]">
        <a
          href={contactInfo.phoneHref}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-primary px-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Phone className="size-4" aria-hidden />
          {callLabel}
        </a>
        <a
          href={contactInfo.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-border bg-background px-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <MessageCircle className="size-4" aria-hidden />
          {whatsappLabel}
        </a>
      </div>
    </div>
  );
}
