"use client";

import { useMemo, useState, useTransition } from "react";
import {
  AlertCircle,
  Clock,
  Eye,
  Filter,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  Trophy,
  User,
  X,
} from "lucide-react";

import { updateRequestStatusAction } from "@/app/(coach)/coach/registrations/actions";
import type {
  PlayerRegistrationRequest,
  RegistrationRequestStatus,
} from "@/types/registration-request";
import { cn } from "@/lib/utils";

type RegistrationRequestsViewProps = {
  initialRequests: PlayerRegistrationRequest[];
};

const statusConfig: Record<
  RegistrationRequestStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  pending: {
    label: "Pending (جديد)",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-800 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-700",
  },
  contacted: {
    label: "Contacted (تم التواصل)",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-800 dark:text-blue-300",
    border: "border-blue-300 dark:border-blue-700",
  },
  approved: {
    label: "Approved (مقبول)",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-800 dark:text-emerald-300",
    border: "border-emerald-300 dark:border-emerald-700",
  },
  rejected: {
    label: "Rejected (مرفوض)",
    bg: "bg-red-50 dark:bg-red-950/40",
    text: "text-red-800 dark:text-red-300",
    border: "border-red-300 dark:border-red-700",
  },
};

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function RegistrationRequestsView({
  initialRequests,
}: RegistrationRequestsViewProps) {
  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedRequest, setSelectedRequest] =
    useState<PlayerRegistrationRequest | null>(null);
  const [isPending, startTransition] = useTransition();

  // Counts for filter pills
  const counts = useMemo(() => {
    return {
      all: requests.length,
      pending: requests.filter((r) => r.status === "pending").length,
      contacted: requests.filter((r) => r.status === "contacted").length,
      approved: requests.filter((r) => r.status === "approved").length,
      rejected: requests.filter((r) => r.status === "rejected").length,
    };
  }, [requests]);

  // Filtered and sorted list
  const filteredRequests = useMemo(() => {
    let result = [...requests];

    if (statusFilter !== "all") {
      result = result.filter((r) => r.status === statusFilter);
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.player_name.toLowerCase().includes(term) ||
          r.mobile_number.includes(term) ||
          (r.parent_name && r.parent_name.toLowerCase().includes(term))
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [requests, statusFilter, searchTerm, sortOrder]);

  function handleStatusChange(
    requestId: string,
    newStatus: RegistrationRequestStatus
  ) {
    // Optimistic UI update
    setRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: newStatus } : r))
    );
    if (selectedRequest?.id === requestId) {
      setSelectedRequest((prev) =>
        prev ? { ...prev, status: newStatus } : null
      );
    }

    startTransition(async () => {
      await updateRequestStatusAction(requestId, newStatus);
    });
  }

  return (
    <div className="space-y-6">
      {/* Header and Summary Cards */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
            <Sparkles className="size-3.5" />
            Academy Inquiries
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Registration Requests
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Review, contact, and manage new player applications from the
            website.
          </p>
        </div>

        {counts.pending > 0 ? (
          <div className="flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs font-bold text-amber-900 shadow-sm animate-pulse">
            <AlertCircle className="size-4 shrink-0 text-amber-700" />
            <span>{counts.pending} New Pending Request(s)</span>
          </div>
        ) : null}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        <button
          type="button"
          onClick={() => setStatusFilter("all")}
          className={cn(
            "rounded-xl border p-3.5 text-start transition shadow-sm",
            statusFilter === "all"
              ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20"
              : "border-slate-200 bg-white hover:border-slate-300"
          )}
        >
          <p className="text-xs font-medium text-slate-500">Total Requests</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{counts.all}</p>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("pending")}
          className={cn(
            "rounded-xl border p-3.5 text-start transition shadow-sm",
            statusFilter === "pending"
              ? "border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20"
              : "border-slate-200 bg-white hover:border-slate-300"
          )}
        >
          <p className="text-xs font-medium text-amber-700">Pending</p>
          <p className="mt-1 text-2xl font-bold text-amber-800">
            {counts.pending}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("contacted")}
          className={cn(
            "rounded-xl border p-3.5 text-start transition shadow-sm",
            statusFilter === "contacted"
              ? "border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20"
              : "border-slate-200 bg-white hover:border-slate-300"
          )}
        >
          <p className="text-xs font-medium text-blue-700">Contacted</p>
          <p className="mt-1 text-2xl font-bold text-blue-800">
            {counts.contacted}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("approved")}
          className={cn(
            "rounded-xl border p-3.5 text-start transition shadow-sm",
            statusFilter === "approved"
              ? "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20"
              : "border-slate-200 bg-white hover:border-slate-300"
          )}
        >
          <p className="text-xs font-medium text-emerald-700">Approved</p>
          <p className="mt-1 text-2xl font-bold text-emerald-800">
            {counts.approved}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter("rejected")}
          className={cn(
            "col-span-2 rounded-xl border p-3.5 text-start transition shadow-sm sm:col-span-1",
            statusFilter === "rejected"
              ? "border-red-500 bg-red-50/50 ring-2 ring-red-500/20"
              : "border-slate-200 bg-white hover:border-slate-300"
          )}
        >
          <p className="text-xs font-medium text-red-700">Rejected</p>
          <p className="mt-1 text-2xl font-bold text-red-800">
            {counts.rejected}
          </p>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by player name, phone, or parent name..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 ps-9 pe-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
          />
          {searchTerm ? (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="size-3.5" />
            <span>Sort:</span>
          </div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
            className="h-10 rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-medium text-slate-700 outline-none focus:border-emerald-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {filteredRequests.length === 0 ? (
          <div className="py-16 text-center">
            <User className="mx-auto size-10 text-slate-300" />
            <h3 className="mt-3 text-base font-semibold text-slate-800">
              No registration requests found
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              {searchTerm || statusFilter !== "all"
                ? "Try clearing filters or search terms."
                : "New player requests submitted through the homepage will appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead className="border-b border-slate-200 bg-slate-50/75 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3.5">Player Name</th>
                  <th className="px-3 py-3.5">Age & Gender</th>
                  <th className="px-4 py-3.5">Parent / Contact</th>
                  <th className="px-4 py-3.5">Level & Training</th>
                  <th className="px-4 py-3.5">Submitted</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.map((req) => {
                  const cfg = statusConfig[req.status] ?? statusConfig.pending;
                  const isNew = req.status === "pending";

                  return (
                    <tr
                      key={req.id}
                      className={cn(
                        "transition hover:bg-slate-50/80",
                        isNew && "bg-amber-50/30"
                      )}
                    >
                      {/* Player Name */}
                      <td className="px-4 py-3.5 font-medium text-slate-900">
                        <div className="flex items-center gap-2">
                          {isNew ? (
                            <span className="size-2 rounded-full bg-amber-500 ring-4 ring-amber-100" />
                          ) : null}
                          <span className="font-semibold">{req.player_name}</span>
                        </div>
                      </td>

                      {/* Age & Gender */}
                      <td className="px-3 py-3.5 text-slate-600">
                        <span>{req.age} yrs</span>
                        <span className="text-slate-400"> · </span>
                        <span className="text-xs text-slate-500">
                          {req.gender}
                        </span>
                      </td>

                      {/* Parent & Contact */}
                      <td className="px-4 py-3.5">
                        <p className="text-xs font-medium text-slate-800">
                          {req.parent_name || "Self (Adult)"}
                        </p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                          <a
                            href={`tel:${req.mobile_number}`}
                            className="inline-flex items-center gap-1 font-mono hover:text-emerald-700"
                          >
                            <Phone className="size-3" />
                            {req.mobile_number}
                          </a>
                          {req.whatsapp_number ? (
                            <a
                              href={`https://wa.me/${req.whatsapp_number.replace(
                                /\D/g,
                                ""
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              title="Open WhatsApp"
                              className="text-emerald-600 hover:text-emerald-700"
                            >
                              <MessageCircle className="size-3.5" />
                            </a>
                          ) : null}
                        </div>
                      </td>

                      {/* Tennis Level & Training */}
                      <td className="px-4 py-3.5">
                        <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                          {req.current_level || "Not specified"}
                        </span>
                        <p className="mt-1 text-xs text-slate-500">
                          {req.preferred_training_type || "Training"}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                        {formatDate(req.created_at)}
                      </td>

                      {/* Status Dropdown */}
                      <td className="px-4 py-3.5">
                        <select
                          value={req.status}
                          disabled={isPending}
                          onChange={(e) =>
                            handleStatusChange(
                              req.id,
                              e.target.value as RegistrationRequestStatus
                            )
                          }
                          className={cn(
                            "rounded-lg border px-2.5 py-1 text-xs font-bold outline-none transition cursor-pointer",
                            cfg.bg,
                            cfg.text,
                            cfg.border
                          )}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedRequest(req)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                        >
                          <Eye className="size-3.5" />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Modal / Drawer */}
      {selectedRequest ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-lg border px-2.5 py-0.5 text-xs font-bold",
                      statusConfig[selectedRequest.status]?.bg,
                      statusConfig[selectedRequest.status]?.text,
                      statusConfig[selectedRequest.status]?.border
                    )}
                  >
                    {statusConfig[selectedRequest.status]?.label}
                  </span>
                  <span className="text-xs text-slate-400">
                    ID: {selectedRequest.id.slice(0, 8)}...
                  </span>
                </div>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {selectedRequest.player_name}
                </h2>
                <p className="text-xs text-slate-500">
                  Submitted on {formatDate(selectedRequest.created_at)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-6 space-y-6 text-sm">
              {/* Section 1: Player info */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <h4 className="flex items-center gap-2 font-bold text-slate-800">
                  <User className="size-4 text-emerald-600" />
                  Player Information
                </h4>
                <dl className="mt-3 grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
                  <div>
                    <dt className="text-slate-400">Date of Birth</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">
                      {selectedRequest.date_of_birth}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Age</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">
                      {selectedRequest.age} years
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Gender</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">
                      {selectedRequest.gender}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Section 2: Contact Info */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <h4 className="flex items-center gap-2 font-bold text-slate-800">
                  <Phone className="size-4 text-emerald-600" />
                  Parent & Contact Details
                </h4>
                <dl className="mt-3 grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
                  <div>
                    <dt className="text-slate-400">Parent / Guardian</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">
                      {selectedRequest.parent_name || "Self (Adult)"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Mobile Number</dt>
                    <dd className="mt-0.5">
                      <a
                        href={`tel:${selectedRequest.mobile_number}`}
                        className="font-bold text-emerald-700 hover:underline"
                      >
                        {selectedRequest.mobile_number}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">WhatsApp</dt>
                    <dd className="mt-0.5">
                      {selectedRequest.whatsapp_number ? (
                        <a
                          href={`https://wa.me/${selectedRequest.whatsapp_number.replace(
                            /\D/g,
                            ""
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-emerald-700 hover:underline"
                        >
                          {selectedRequest.whatsapp_number}
                        </a>
                      ) : (
                        <span className="text-slate-400">Same as mobile</span>
                      )}
                    </dd>
                  </div>
                  {selectedRequest.email ? (
                    <div className="col-span-2 sm:col-span-3">
                      <dt className="text-slate-400">Email Address</dt>
                      <dd className="mt-0.5 font-medium text-slate-800">
                        {selectedRequest.email}
                      </dd>
                    </div>
                  ) : null}
                </dl>

                {/* Direct Action Buttons */}
                <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-slate-200/60">
                  <a
                    href={`tel:${selectedRequest.mobile_number}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-900"
                  >
                    <Phone className="size-3.5" />
                    Call Mobile
                  </a>
                  <a
                    href={`https://wa.me/${(
                      selectedRequest.whatsapp_number ||
                      selectedRequest.mobile_number
                    ).replace(/\D/g, "")}?text=${encodeURIComponent(
                      `مرحباً، كابتن أحمد سمرة بخصوص طلب التسجيل للاعب ${selectedRequest.player_name}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
                  >
                    <MessageCircle className="size-3.5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Section 3: Tennis Background */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <h4 className="flex items-center gap-2 font-bold text-slate-800">
                  <Trophy className="size-4 text-emerald-600" />
                  Tennis Background
                </h4>
                <dl className="mt-3 grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
                  <div>
                    <dt className="text-slate-400">Played Before?</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">
                      {selectedRequest.played_before ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Current Level</dt>
                    <dd className="mt-0.5 font-semibold text-emerald-700">
                      {selectedRequest.current_level || "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Experience Duration</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">
                      {selectedRequest.tennis_experience || "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Tournaments Experience</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">
                      {selectedRequest.tournament_experience ? "Yes" : "No"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Current Club</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">
                      {selectedRequest.current_club || "None"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Previous Coach</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">
                      {selectedRequest.previous_coach || "None"}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Section 4: Training Preferences */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <h4 className="flex items-center gap-2 font-bold text-slate-800">
                  <Clock className="size-4 text-emerald-600" />
                  Training Preferences
                </h4>
                <dl className="mt-3 grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
                  <div>
                    <dt className="text-slate-400">Training Type</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">
                      {selectedRequest.preferred_training_type || "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Preferred Time</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">
                      {selectedRequest.preferred_time || "—"}
                    </dd>
                  </div>
                  <div className="col-span-2 sm:col-span-3">
                    <dt className="text-slate-400">Preferred Days</dt>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {selectedRequest.preferred_days &&
                      selectedRequest.preferred_days.length > 0 ? (
                        selectedRequest.preferred_days.map((day) => (
                          <span
                            key={day}
                            className="rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800"
                          >
                            {day}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400">Flexible / Any day</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Notes */}
              {selectedRequest.additional_notes ? (
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                  <h4 className="font-bold text-slate-800">Additional Notes</h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-700 whitespace-pre-wrap">
                    {selectedRequest.additional_notes}
                  </p>
                </div>
              ) : null}

              {/* Status Update Actions */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                <p className="text-xs font-bold text-emerald-900">
                  Update Request Status:
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(["pending", "contacted", "approved", "rejected"] as const).map(
                    (st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() =>
                          handleStatusChange(selectedRequest.id, st)
                        }
                        className={cn(
                          "rounded-lg border px-3 py-1.5 text-xs font-bold transition",
                          selectedRequest.status === st
                            ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                            : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                        )}
                      >
                        {statusConfig[st].label}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
