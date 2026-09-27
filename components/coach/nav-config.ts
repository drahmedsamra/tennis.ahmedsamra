import {
  FileText,
  LayoutDashboard,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

export type CoachNavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
};

export const coachNavItems: CoachNavItem[] = [
  {
    title: "Dashboard",
    href: "/coach",
    icon: LayoutDashboard,
  },
  {
    title: "Players",
    href: "/coach/players",
    icon: Users,
  },
  {
    title: "Reports",
    href: "/coach/reports",
    icon: FileText,
  },
  {
    title: "Videos",
    href: "/coach/videos",
    icon: Video,
  },
];

export function isCoachNavActive(pathname: string, href: string) {
  if (href === "/coach") {
    return pathname === "/coach";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
