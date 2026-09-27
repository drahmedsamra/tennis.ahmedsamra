"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { coachNavItems, isCoachNavActive } from "@/components/coach/nav-config";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full min-h-screen w-72 flex-col bg-slate-900 text-white">
      <div className="border-b border-slate-800 px-6 py-6">
        <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
          Coach
        </p>
        <h1 className="mt-1 text-xl font-bold">Ahmed Samra</h1>
        <p className="mt-1 text-sm text-slate-400">Tennis Control Center</p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {coachNavItems.map((item) => {
          const Icon = item.icon;
          const active = isCoachNavActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-emerald-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <p className="text-center text-xs text-slate-500">
          Ahmed Samra Tennis
        </p>
      </div>
    </aside>
  );
}
