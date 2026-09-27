import Link from "next/link";
import {
  AlertCircle,
  CalendarDays,
  FilePlus,
  FileText,
  Plus,
  Users,
  Video,
} from "lucide-react";

import type { CoachDashboardData } from "@/services/dashboard";

type CoachDashboardViewProps = {
  data: CoachDashboardData;
};

function formatDate(value: string | null) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function playerAge(birthYear: number | null) {
  if (!birthYear) return null;
  const age = new Date().getFullYear() - birthYear;
  if (age < 4 || age > 80) return null;
  return age;
}

export default function CoachDashboardView({
  data,
}: CoachDashboardViewProps) {
  const { stats, recentPlayers, recentReports, error } = data;

  const statCards = [
    {
      label: "Players",
      value: stats.players,
      hint:
        stats.players > 0
          ? `${stats.activePlayers} active`
          : "No players yet",
      href: "/coach/players",
    },
    {
      label: "Reports",
      value: stats.reports,
      hint:
        stats.reports > 0
          ? `${stats.publishedReports} published`
          : "No reports yet",
      href: "/coach/reports",
    },
    {
      label: "Videos",
      value: stats.videos,
      hint: stats.videos > 0 ? "Linked to reports" : "None uploaded",
      href: "/coach/videos",
    },
  ];

  const quickActions = [
    {
      href: "/coach/players",
      label: "View Players",
      icon: Users,
    },
    {
      href: "/coach/players/new",
      label: "Add Player",
      icon: Plus,
      primary: true,
    },
    {
      href: "/coach/reports",
      label: "View Reports",
      icon: FileText,
    },
    {
      href: "/coach/reports/new",
      label: "Create Report",
      icon: FilePlus,
    },
    {
      href: "/coach/videos",
      label: "Videos",
      icon: Video,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm sm:px-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-800">
          AS
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            Coach Control Center
          </p>
          <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
            Welcome back, Ahmed Samra
          </h1>
          <p className="text-sm text-slate-500">
            Review players, reports, and videos from one place.
          </p>
        </div>
      </header>

      {error ? (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Some dashboard data could not be loaded. Existing records may still
            appear below.
          </p>
        </div>
      ) : null}

      <section className="grid grid-cols-3 gap-2 sm:gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-slate-200/80 bg-white px-3 py-3 shadow-sm transition hover:border-emerald-200 hover:shadow-md sm:px-4 sm:py-4"
          >
            <p className="text-[11px] font-medium text-slate-500 sm:text-sm">
              {card.label}
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {card.value}
            </p>
            <p className="mt-1 hidden text-xs text-slate-400 sm:block">
              {card.hint}
            </p>
          </Link>
        ))}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-slate-700">
          Quick actions
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className={
                  action.primary
                    ? "flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                    : "flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:border-emerald-200 hover:text-emerald-800"
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {action.label}
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Recent players
            </h2>
            <Link
              href="/coach/players"
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              View all
            </Link>
          </div>

          {recentPlayers.length === 0 ? (
            <EmptyState
              title="No players yet"
              description="Add a player to start building reports."
              href="/coach/players/new"
              action="Add Player"
            />
          ) : (
            <ul className="divide-y divide-slate-100">
              {recentPlayers.map((player) => {
                const age = playerAge(player.birth_year);

                return (
                  <li
                    key={player.id}
                    className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-900">
                        {player.name}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {player.player_code}
                        {age ? ` · ${age} yrs` : ""}
                        {player.last_report_date
                          ? ` · Last report ${formatDate(player.last_report_date)}`
                          : " · No reports"}
                      </p>
                    </div>
                    <Link
                      href={`/coach/players/${player.id}`}
                      className="shrink-0 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                    >
                      View
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Recent reports
            </h2>
            <Link
              href="/coach/reports"
              className="text-sm font-medium text-emerald-700 hover:underline"
            >
              View all
            </Link>
          </div>

          {recentReports.length === 0 ? (
            <EmptyState
              title="No reports yet"
              description="Create a technical report for a player."
              href="/coach/reports/new"
              action="Create Report"
            />
          ) : (
            <ul className="divide-y divide-slate-100">
              {recentReports.map((report) => (
                <li
                  key={report.id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-900">
                      {report.title}
                    </p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
                      <span>
                        {report.player_name || report.player_code || "Player"}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {formatDate(report.report_date)}
                      </span>
                      {report.report_type ? (
                        <span>{report.report_type}</span>
                      ) : null}
                      <span
                        className={
                          report.is_published
                            ? "text-emerald-700"
                            : "text-amber-700"
                        }
                      >
                        {report.is_published ? "Published" : "Draft"}
                      </span>
                    </p>
                  </div>
                  <Link
                    href={`/coach/reports/${report.id}`}
                    className="shrink-0 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    View
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-800">Videos</h2>
          <Link
            href="/coach/videos"
            className="text-sm font-medium text-emerald-700 hover:underline"
          >
            Open videos
          </Link>
        </div>

        {stats.videos > 0 ? (
          <p className="text-sm text-slate-600">
            {stats.videos} video{stats.videos === 1 ? "" : "s"} linked in the
            academy library. Open the videos section to manage them.
          </p>
        ) : (
          <EmptyState
            title="No videos yet"
            description="Player videos will appear here once they are added to reports."
            href="/coach/videos"
            action="Go to Videos"
          />
        )}
      </section>
    </div>
  );
}

function EmptyState({
  title,
  description,
  href,
  action,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-6 text-center">
      <p className="font-medium text-slate-800">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      <Link
        href={href}
        className="mt-3 inline-flex text-sm font-semibold text-emerald-700 hover:underline"
      >
        {action}
      </Link>
    </div>
  );
}
