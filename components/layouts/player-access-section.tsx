import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  FileText,
  LineChart,
  PlayCircle,
  Trophy,
  TrendingUp,
} from "lucide-react";

const cards = [
  {
    icon: FileText,
    title: "التقارير الفنية",
    badge: "آخر تقرير",
    badgeColor: "bg-green-500/10 text-green-600",
    description: "تقرير احترافي يوضح نقاط القوة وأولويات التطوير.",
    value: 100,
    label: "اكتمال التقرير",
  },
  {
    icon: TrendingUp,
    title: "تحليل الأداء",
    badge: "محدث",
    badgeColor: "bg-blue-500/10 text-blue-600",
    description: "متابعة تطور المستوى الفني والإحصائيات.",
    value: 82,
    label: "التطور الفني",
  },
  {
    icon: Trophy,
    title: "خطة التطوير",
    badge: "جاهزة",
    badgeColor: "bg-amber-500/10 text-amber-700",
    description: "برنامج تدريبي واضح يحدد أهداف المرحلة القادمة.",
    value: 68,
    label: "تنفيذ الخطة",
  },
];

export function PlayerAccessSection() {
  return (
    <section id="player-portal" className="bg-muted/40">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">

          {/* Header */}

          <div className="border-b border-border px-8 py-10">

            <div className="mx-auto max-w-3xl text-center">

              <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                🎾 بوابة اللاعب
              </span>

              <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                منصة احترافية لمتابعة تطورك
              </h2>

              <p className="mt-4 text-base text-muted-foreground">
                جميع تقاريرك وتحليل أدائك وخطة تطويرك في مكان واحد.
              </p>

              <Link
                href="/player"
                className="mt-8 inline-flex h-14 items-center gap-3 rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground transition hover:scale-[1.03] hover:shadow-xl"
              >
                الدخول إلى بوابة اللاعب
                <ArrowLeft className="h-5 w-5" />
              </Link>

              <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <BadgeCheck className="h-4 w-4 text-primary" />
                يتم تسجيل الدخول باستخدام كود اللاعب.
              </p>

            </div>

          </div>

          {/* Preview Cards */}

          <div className="grid gap-5 p-8 lg:grid-cols-2">
          {cards.map((card) => (
            <DashboardCard
              key={card.title}
              icon={<card.icon className="h-5 w-5" />}
              title={card.title}
              badge={card.badge}
              badgeColor={card.badgeColor}
              description={card.description}
            >
              <Progress
                label={card.label}
                value={card.value}
              />
            </DashboardCard>
          ))}

          <DashboardCard
            icon={<PlayCircle className="h-5 w-5" />}
            title="الفيديوهات"
            badge="12 فيديو"
            badgeColor="bg-primary/10 text-primary"
            description="تحليل فيديوهات المباريات والتدريبات مع ملاحظات المدرب."
          >

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-dashed border-border bg-muted/40 p-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <PlayCircle className="h-6 w-6" />
              </div>

              <div>
                <p className="font-semibold">
                  آخر فيديو تمت إضافته
                </p>

                <p className="text-sm text-muted-foreground">
                  تحليل المباراة الأخيرة
                </p>
              </div>

            </div>

          </DashboardCard>

          </div>

        </div>

      </div>

    </section>
  );
}

type DashboardCardProps = {
  icon: React.ReactNode;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  children?: React.ReactNode;
};

function DashboardCard({
  icon,
  title,
  badge,
  badgeColor,
  description,
  children,
}: DashboardCardProps) {
  return (
    <div className="group rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>

          <div>

            <h3 className="text-lg font-bold">
              {title}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>

          </div>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}
        >
          {badge}
        </span>

      </div>

      {children && children}

    </div>
  );
}

type ProgressProps = {
  label: string;
  value: number;
};

function Progress({
  label,
  value,
}: ProgressProps) {
  return (
    <div className="mt-5">

      <div className="mb-2 flex items-center justify-between">

        <span className="text-sm text-muted-foreground">
          {label}
        </span>

        <span className="text-sm font-bold text-primary">
          {value}%
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">

        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{ width: `${value}%` }}
        />

      </div>

    </div>
  );
}