import Link from "next/link";

const menu = [
  {
    title: "Dashboard",
    href: "/coach",
  },
  {
    title: "Players",
    href: "/coach/players",
  },
  {
    title: "Reports",
    href: "/coach/reports",
  },
  {
    title: "Videos",
    href: "/coach/videos",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex min-h-screen w-72 flex-col bg-slate-900 text-white">

      {/* Logo */}

      <div className="border-b border-slate-800 px-6 py-8">

        <h1 className="text-3xl font-bold">
          🎾 Ahmed Samra
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Coach Dashboard
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">

        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl px-4 py-3 transition hover:bg-slate-800 hover:text-white"
          >
            {item.title}
          </Link>
        ))}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-4">

        <p className="text-center text-xs text-slate-500">
          Ahmed Samra Tennis
        </p>

      </div>

    </aside>
  );
}