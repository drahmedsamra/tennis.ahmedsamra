import {
  FileText,
  Images,
  LayoutDashboard,
  UserPlus,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

export type CoachNavItem = {
  title: string;
  shortTitle?: string;
  href: string;
  icon: LucideIcon;
};

export const coachNavItems: CoachNavItem[] = [
  {
    title: "Dashboard",
    shortTitle: "Overview",
    href: "/coach",
    icon: LayoutDashboard,
  },
  {
    title: "Registration Requests",
    shortTitle: "Requests",
    href: "/coach/registrations",
    icon: UserPlus,
  },
  {
    title: "Gallery",
    shortTitle: "Gallery",
    href: "/coach/gallery",
    icon: Images,
  },
  {
    title: "Players",
    shortTitle: "Players",
    href: "/coach/players",
    icon: Users,
  },
  {
    title: "Reports",
    shortTitle: "Reports",
    href: "/coach/reports",
    icon: FileText,
  },
  {
    title: "Videos",
    shortTitle: "Videos",
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
