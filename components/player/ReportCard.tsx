import Link from "next/link";

type Props = {
  id: string;
  playerId: string;
  title: string;
  summary: string;
  date: string;
};

export default function ReportCard({
  id,
  playerId,
  title,
  summary,
  date,
}: Props) {
  return (
    <Link href={`/player/${playerId}/report/${id}`}>
      <div className="rounded-3xl border bg-white p-6 shadow transition hover:shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            📄 {title}
          </h2>
        </div>

        <p className="mt-5 text-xl text-gray-600">
          {summary}
        </p>

        <p className="mt-6 text-gray-400">
          {date}
        </p>
      </div>
    </Link>
  );
}