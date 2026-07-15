"use client";

import type { Report } from "@/types/reports";

type ReportFormProps = {
  report?: Partial<Report>;
  action: (formData: FormData) => void | Promise<void>;
  players: {
    id: string;
    preferred_name_ar: string;
    player_code: string;
  }[];
};

export default function ReportForm({
  report,
  action,
  players,
}: ReportFormProps) {
  return (
    <form action={action} className="space-y-8">
      <section className="rounded-2xl bg-white p-8 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          📝 Report Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Player
            </label>

            <select
              name="player_id"
              required
              defaultValue={report?.player_id}
              className="w-full rounded-xl border p-3"
            >
              <option value="">
                Select Player...
              </option>

              {players.map((player) => (
                <option
                  key={player.id}
                  value={player.id}
                >
                  {player.preferred_name_ar} ({player.player_code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Report Date
            </label>

            <input
  name="report_date"
  type="text"
  defaultValue={report?.report_date ?? ""}
  placeholder="2026-07-15"
  className="w-full rounded-xl border p-3"
/>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Title
            </label>

            <input
              name="title"
              required
              defaultValue={report?.title}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Report Type
            </label>

            <input
              name="report_type"
              defaultValue={report?.report_type}
              placeholder="Assessment"
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Report Period
            </label>

            <input
              name="report_period"
              defaultValue={report?.report_period ?? ""}
              placeholder="June 2026"
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Overall Rating
            </label>

            <input
              name="overall_rating"
              type="number"
              step="0.1"
              defaultValue={report?.overall_rating ?? ""}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">
              Summary
            </label>

            <textarea
              name="summary"
              rows={3}
              defaultValue={report?.summary ?? ""}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-medium">
              Report Content
            </label>

            <textarea
              name="content_markdown"
              rows={12}
              required
              defaultValue={report?.content_markdown}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              YouTube URL
            </label>

            <input
              name="youtube_url"
              defaultValue={report?.youtube_url ?? ""}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Author
            </label>

            <input
              name="author_name"
              defaultValue={report?.author_name ?? "Ahmed Samra"}
              className="w-full rounded-xl border p-3"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="published"
              name="is_published"
              type="checkbox"
              defaultChecked={report?.is_published ?? true}
            />

            <label htmlFor="published">
              Published
            </label>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-xl bg-green-600 px-8 py-4 font-semibold text-white hover:bg-green-700"
        >
          Save Report
        </button>
      </div>
    </form>
  );
}