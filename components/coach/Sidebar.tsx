import Link from "next/link";

const menu = [
  {
    title: "🏠 Dashboard",
    href: "/coach",
  },
  {
    title: "👥 Players",
    href: "/coach/players",
  },
  {
    title: "📝 Reports",
    href: "/coach/reports",
  },
  {
    title: "🎥 Videos",
    href: "/coach/videos",
  },
];

export default function Sidebar() {
  return (
    <aside
      className="
        w-full
        border-b
        bg-slate-900
        text-white

        lg:min-h-screen
        lg:w-72
        lg:border-b-0
        lg:border-l
        lg:border-slate-800
      "
    >
      {/* Header */}

      <div className="border-b border-slate-800 px-6 py-6">
        <h1 className="text-2xl font-bold">
          🎾 Ahmed Samra
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Coach Dashboard
        </p>
      </div>

      {/* Navigation */}

      <nav
        className="
          flex
          gap-2
          overflow-x-auto
          p-4

          lg:block
          lg:space-y-2
        "
      >
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="
              whitespace-nowrap
              rounded-xl
              bg-slate-800
              px-4
              py-3
              transition
              hover:bg-slate-700

              lg:block
              lg:bg-transparent
              lg:hover:bg-slate-800
            "
          >
            {item.title}
          </Link>
        ))}
      </nav>

      {/* Footer */}

      <div className="hidden border-t border-slate-800 p-4 lg:block">
        <p className="text-center text-xs text-slate-500">
          Ahmed Samra Tennis
        </p>
      </div>
    </aside>
  );
}