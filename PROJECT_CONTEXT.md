# PROJECT_CONTEXT — Ahmed Samra Tennis

Personal brand + player-reports site for coach Ahmed Samra. Arabic-first marketing site, player lookup portal (by `player_code`), and an unprotected coach CRUD dashboard. Data lives in Supabase. No Shopify, no payments, no auth users.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4, shadcn (base-nova), lucide-react, `@base-ui/react`
- Supabase JS + `@supabase/ssr` (anon/publishable key only)
- react-markdown + remark-gfm for report body
- Fonts: Cairo (AR), Inter (EN)

## Architecture

Three **route groups**, each with its own `<html>`/`<body>` (no root `app/layout.tsx`):

| Group | Locale | Role |
|---|---|---|
| `(default)` | AR RTL at `/` | Marketing homepage |
| `(english)` | EN LTR at `/en` | Same homepage, English dictionary |
| `(player)` | AR | Portal: search by code → profile → report markdown |
| `(coach)` | AR layout, EN copy | Control center dashboard + players/reports CRUD; videos stubbed |

Request interception is `proxy.ts` (Next 16), not `middleware.ts`. It only strips `/ar` prefixes. It does **not** protect `/coach`.

`app/api/` is empty. Mutations are Server Actions. Reads are server components + `services/*`.

No global client store (no Redux/Zustand). Navbar/gallery use local `useState`. Forms use native `<form action>` and `useActionState` on player search.

## Data layer

**Clients**

- `lib/supabase/server.ts` — `createClient()` cookie-aware server client
- `lib/supabase/client.ts` — browser client (module singleton; **not currently imported**)

Env names (values never in this file):

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

`.env.example` currently documents only `NEXT_PUBLIC_SITE_URL`. Images allow Pexels + that project’s Supabase Storage public URL (`next.config.ts`).

**Tables (inferred from app usage; no migrations in repo)**

```
players 1──* player_reports  (?──* report_videos)
```

- `players`: `id`, `player_code` (public lookup key, e.g. AST-0001), bilingual names, `egypt_tennis_id`, `birth_year`, `gender`, `dominant_hand`/`dominant_eye`, club/coach, parent contact, `photo_url`, `notes`, `active`, timestamps
- `player_reports`: `player_id` FK, `title`, `summary`, `content_markdown`, `report_type`, `report_period`, `overall_rating`, `author_name`, `youtube_url`, `report_date`, `is_published`, timestamps
- `report_videos`: counted on coach dashboard only; `services/videos.ts` is empty; `/coach/videos*` is placeholder

Types: `types/player.ts`, `types/reports.ts`. `types/database.ts` is empty (no generated Supabase types).

**Services**

- `services/players.ts` — list/get/create/update/delete; `getPlayer(playerCode)` also loads reports; `getReport(reportId)` lives here (debug `console.log`)
- `services/reports.ts` — list with nested `players(...)`, get/create/update/delete
- `services/dashboard.ts` — `getCoachDashboard()`: counts (players, active, reports, published, videos) plus recent player/report previews; `getDashboardStats()` wraps the counts

Deletes exist in services but are not wired to UI.

## Auth / access (current reality)

There is **no** `getUser` / `signIn` / session gate.

- Player access = knowledge of `player_code`. Search lowercases the code then `.eq("player_code", ...)`.
- Coach routes are public URLs. CRUD uses the **publishable** key, so security depends entirely on Supabase RLS (not defined in this repo). If RLS is open, anyone can read/write player PII and reports.
- Player portal does **not** filter `is_published` or `active`.
- `robots.ts` allows `/` for all crawlers (including `/coach`).

## Routes

- `/`, `/en` — marketing (`HomePage`)
- `/player` — code search (`searchPlayer` action)
- `/player/[id]` — `[id]` is **player_code**, not UUID
- `/player/[id]/report` — stub
- `/player/[id]/report/[reportId]` — markdown report (does not verify report belongs to that player)
- `/coach` — control center (stats, quick actions, recent players/reports, videos empty state)
- `/coach/players`, `/new`, `/[id]`, `/[id]/edit` — `[id]` is **UUID**
- `/coach/reports`, `/new`, `/[id]`, `/[id]/edit`
- `/coach/videos`, `/videos/new` — “Hello”
- `sitemap.ts` / `robots.ts` — marketing locales only in sitemap

i18n: `lib/i18n/*` + `dictionaries/{ar,en}.json`. AR is unprefixed; EN is `/en`. Coach/player are Arabic-layout only.

## UI / forms

- Marketing: `components/layouts/*` (hero, assessment, benefits, player access, services, about, contact, navbar, footer). Dictionary-driven for some sections; several landing blocks are hardcoded Arabic.
- Player: `components/player/*` (+ `playerid/` for dashboard).
- Coach: `Sidebar` (desktop) + `MobileNav` (bottom tabs), `CoachDashboardView`, `PlayersTable`, `ReportsTable`, `PlayerForm`, `ReportForm` — HTML `required` only, no zod. Nav items in `components/coach/nav-config.ts`. There is still **no** login/logout.
- Untracked/WIP duplicates: `components/player/PlayerSearchBox.tsx` (clone of search form), `components/common/SearchBox.tsx` (currently a FeatureCard copy). Backup hero file in layouts.

## Conventions for future changes

- Prefer `services/*` for queries; keep Server Actions thin (FormData → service → `redirect`).
- Do not assume auth exists; adding it is a greenfield (middleware/proxy + RLS + stop using anon for writes).
- Do not confuse URL params: portal `id` = `player_code`; coach `id` = UUID.
- Next 16 docs live under `node_modules/next/dist/docs/` (see `AGENTS.md`).
- No Shopify or other commerce APIs.

## Fragile / incomplete

1. Unauthenticated coach dashboard + client-side key for mutations
2. Parent PII (`parent_phone`, etc.) fetched for anyone with a code
3. `is_published` unused on player reads
4. Search `.toLowerCase()` vs likely mixed-case codes
5. Empty `types/database.ts`, empty `docs/*.md`, empty migrations
6. Debug logs in `getReport` and report page
7. Duplicate HTML documents per route group; `not-found.tsx` has its own html
8. `components.json` has `"rtl": false` while default locale is RTL
9. Videos feature unfinished; delete unused
10. `.env.example` missing Supabase var names
