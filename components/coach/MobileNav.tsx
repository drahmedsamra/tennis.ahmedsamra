"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { coachNavItems, isCoachNavActive } from "@/components/coach/nav-config";

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-md lg:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-4 px-2 pb-[env(safe-area-inset-bottom)]">
        {coachNavItems.map((item) => {
          const Icon = item.icon;
          const active = isCoachNavActive(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
                  active ? "text-emerald-700" : "text-slate-500",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    active ? "text-emerald-700" : "text-slate-400",
                  )}
                />
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
