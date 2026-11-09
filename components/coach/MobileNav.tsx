"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { coachNavItems, isCoachNavActive } from "@/components/coach/nav-config";

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-md lg:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-6 px-1 pb-[env(safe-area-inset-bottom)]">
        {coachNavItems.map((item) => {
          const Icon = item.icon;
          const active = isCoachNavActive(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 text-[10px] font-medium leading-none",
                  active ? "text-emerald-700 font-bold" : "text-slate-500",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    active ? "text-emerald-700" : "text-slate-400",
                  )}
                />
                <span className="truncate">{item.shortTitle ?? item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
