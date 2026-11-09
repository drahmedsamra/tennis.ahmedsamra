"use client";

import { useId, useMemo, useRef, useState, useTransition } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Loader2,
  Phone,
  Sparkles,
  Trophy,
  User,
} from "lucide-react";

import { submitPlayerRegistration } from "@/app/actions/register-player";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type PlayerRegistrationFormProps = {
  locale: Locale;
  content: Dictionary["registration"];
};

export function PlayerRegistrationForm({
  locale,
  content,
}: PlayerRegistrationFormProps) {
  const formId = useId();
  const isRtl = locale === "ar";
  const formRef = useRef<HTMLFormElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Dynamic state
  const [dob, setDob] = useState("");
  const [playedBefore, setPlayedBefore] = useState("true");
  const [tournamentExp, setTournamentExp] = useState("false");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Auto-calculated age
  const calculatedAge = useMemo(() => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    if (Number.isNaN(birthDate.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 0 && age <= 100 ? age : null;
  }, [dob]);

  const isAdult = calculatedAge !== null && calculatedAge >= 18;

  const daysList: Array<{ key: keyof typeof content.days; value: string }> = [
    { key: "Saturday", value: "Saturday" },
    { key: "Sunday", value: "Sunday" },
    { key: "Monday", value: "Monday" },
    { key: "Tuesday", value: "Tuesday" },
    { key: "Wednesday", value: "Wednesday" },
    { key: "Thursday", value: "Thursday" },
    { key: "Friday", value: "Friday" },
  ];

  function toggleDay(day: string) {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage(null);

    const formData = new FormData(event.currentTarget);

    // Append selected days
    formData.delete("preferred_days");
    selectedDays.forEach((day) => formData.append("preferred_days", day));

    startTransition(async () => {
      const res = await submitPlayerRegistration(
        { success: false },
        formData
      );

      if (res.success) {
        setStatusMessage({
          type: "success",
          text: content.successMessage,
        });
        formRef.current?.reset();
        setDob("");
        setSelectedDays([]);
        setPlayedBefore("true");
        setTournamentExp("false");
      } else {
        setStatusMessage({
          type: "error",
          text: res.error || content.errorMessage,
        });
      }
    });
  }

  return (
    <section
      id="register"
      className="border-b-4 border-background bg-gradient-to-b from-[#f3f7f3] to-background py-8 sm:py-12"
    >
      <div className="marketing-shell">
        {/* Compact Card Header */}
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border-2 transition-all duration-300",
            isExpanded
              ? "border-primary/40 bg-card shadow-lg ring-1 ring-primary/20"
              : "border-primary/25 bg-card/90 shadow-sm hover:border-primary/50 hover:shadow-md"
          )}
        >
          {/* Subtle decorative top bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-primary via-emerald-500 to-primary" />

          <div className="p-6 sm:p-8">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Sparkles className="size-3.5" aria-hidden />
                  {content.badge}
                </div>

                <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {content.cardTitle}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {content.cardDescription}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-expanded={isExpanded}
                aria-controls={formId}
                className={cn(
                  "inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-xl px-6 text-sm font-semibold transition-all duration-200",
                  isExpanded
                    ? "border border-border bg-muted/60 text-foreground hover:bg-muted"
                    : "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg"
                )}
              >
                {isExpanded ? (
                  <>
                    <span>{content.collapseButton}</span>
                    <ChevronUp className="size-4" aria-hidden />
                  </>
                ) : (
                  <>
                    <span>{content.expandButton}</span>
                    <ChevronDown className="size-4" aria-hidden />
                  </>
                )}
              </button>
            </div>

            {/* Expandable Form Container */}
            <div
              id={formId}
              className={cn(
                "grid transition-all duration-500 ease-in-out",
                isExpanded
                  ? "mt-8 grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0 pointer-events-none"
              )}
            >
              <div className="overflow-hidden">
                <div className="border-t border-border/80 pt-8">
                  {statusMessage ? (
                    <div
                      className={cn(
                        "mb-8 flex items-start gap-3 rounded-xl border p-4 text-sm font-medium",
                        statusMessage.type === "success"
                          ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                          : "border-destructive/30 bg-destructive/10 text-destructive"
                      )}
                    >
                      {statusMessage.type === "success" ? (
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                      ) : (
                        <AlertCircle className="mt-0.5 size-5 shrink-0" />
                      )}
                      <div>
                        {statusMessage.type === "success" ? (
                          <p className="font-bold">{content.successTitle}</p>
                        ) : null}
                        <p className="mt-0.5">{statusMessage.text}</p>
                      </div>
                    </div>
                  ) : null}

                  <form
                    ref={formRef}
                    onSubmit={handleFormSubmit}
                    dir={isRtl ? "rtl" : "ltr"}
                    className="space-y-8"
                  >
                    {/* SECTION A: Player Information */}
                    <div className="rounded-xl border border-border/70 bg-muted/30 p-5 sm:p-6">
                      <div className="flex items-center gap-2 border-b border-border/60 pb-3 text-base font-bold text-foreground">
                        <User className="size-4 text-primary" aria-hidden />
                        <h3>{content.sectionPlayer}</h3>
                      </div>

                      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Player Full Name */}
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="player_name"
                            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                          >
                            {content.playerName}{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <input
                            id="player_name"
                            name="player_name"
                            type="text"
                            required
                            placeholder={content.playerNamePlaceholder}
                            className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                        {/* Date of Birth */}
                        <div>
                          <label
                            htmlFor="date_of_birth"
                            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                          >
                            {content.dateOfBirth}{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <div className="relative mt-1.5">
                            <input
                              id="date_of_birth"
                              name="date_of_birth"
                              type="date"
                              required
                              value={dob}
                              onChange={(e) => setDob(e.target.value)}
                              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                        </div>

                        {/* Auto-calculated Age */}
                        <div>
                          <label
                            htmlFor="calculated_age_display"
                            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                          >
                            {content.age}
                          </label>
                          <div className="mt-1.5 flex h-11 items-center rounded-lg border border-border bg-muted/60 px-3.5 text-sm font-semibold text-foreground">
                            {calculatedAge !== null ? (
                              <span className="text-primary">
                                {calculatedAge} {content.ageUnit}
                              </span>
                            ) : (
                              <span className="text-muted-foreground/60">
                                —
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Gender */}
                        <div className="sm:col-span-2 lg:col-span-4">
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {content.gender}{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <div className="mt-2 flex gap-4">
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary">
                              <input
                                type="radio"
                                name="gender"
                                value="Male"
                                defaultChecked
                                className="accent-primary"
                              />
                              <span>{content.genderMale}</span>
                            </label>
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary">
                              <input
                                type="radio"
                                name="gender"
                                value="Female"
                                className="accent-primary"
                              />
                              <span>{content.genderFemale}</span>
                            </label>
                          </div>
                        </div>

                        {/* Preferred Player Code (Optional) */}
                        <div className="sm:col-span-2 lg:col-span-4">
                          <label
                            htmlFor="preferred_player_code"
                            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                          >
                            {isRtl
                              ? "كود الدخول المفضل لك لبوابة اللاعب (اختياري)"
                              : "Preferred Player Access Code (Optional)"}
                          </label>
                          <input
                            id="preferred_player_code"
                            name="preferred_player_code"
                            type="text"
                            maxLength={15}
                            placeholder={
                              isRtl
                                ? "مثال: SAMRA-10 أو 2012 (أو اتركه فارغاً)"
                                : "e.g. SAMRA-10 or 2012 (or leave blank)"
                            }
                            className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm uppercase placeholder:normal-case text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                          <p className="mt-1 text-[11px] text-muted-foreground">
                            {isRtl
                              ? "يمكنك كتابة كود تفضله ليسهل عليك حفظه، أو اتركه فارغاً وسننشئ لك كوداً مخصصاً."
                              : "Choose a memorable code, or leave blank and we will generate one for you."}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* SECTION B: Parent / Guardian Information */}
                    <div className="rounded-xl border border-border/70 bg-muted/30 p-5 sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                        <div className="flex items-center gap-2 text-base font-bold text-foreground">
                          <Phone className="size-4 text-primary" aria-hidden />
                          <h3>{content.sectionParent}</h3>
                        </div>
                        {isAdult ? (
                          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                            ✓ {content.parentNoteAdult}
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Parent Name */}
                        <div>
                          <label
                            htmlFor="parent_name"
                            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                          >
                            {content.parentName}{" "}
                            {!isAdult ? (
                              <span className="text-muted-foreground/70">
                                (مطلوب للناشئين)
                              </span>
                            ) : null}
                          </label>
                          <input
                            id="parent_name"
                            name="parent_name"
                            type="text"
                            required={!isAdult && calculatedAge !== null}
                            placeholder={content.parentNamePlaceholder}
                            className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                        {/* Mobile Number */}
                        <div>
                          <label
                            htmlFor="mobile_number"
                            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                          >
                            {content.mobileNumber}{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <input
                            id="mobile_number"
                            name="mobile_number"
                            type="tel"
                            required
                            placeholder="01xxxxxxxxx"
                            dir="ltr"
                            className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                        {/* WhatsApp Number */}
                        <div>
                          <label
                            htmlFor="whatsapp_number"
                            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                          >
                            {content.whatsappNumber}
                          </label>
                          <input
                            id="whatsapp_number"
                            name="whatsapp_number"
                            type="tel"
                            placeholder="01xxxxxxxxx"
                            dir="ltr"
                            className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                        {/* Email */}
                        <div className="sm:col-span-2 lg:col-span-3">
                          <label
                            htmlFor="email"
                            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                          >
                            {content.email}
                          </label>
                          <div className="relative mt-1.5">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="player@example.com"
                              dir="ltr"
                              className="h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION C: Tennis Background */}
                    <div className="rounded-xl border border-border/70 bg-muted/30 p-5 sm:p-6">
                      <div className="flex items-center gap-2 border-b border-border/60 pb-3 text-base font-bold text-foreground">
                        <Trophy className="size-4 text-primary" aria-hidden />
                        <h3>{content.sectionTennis}</h3>
                      </div>

                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        {/* Played Before */}
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {content.playedBefore}
                          </label>
                          <div className="mt-2 flex gap-4">
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary">
                              <input
                                type="radio"
                                name="played_before"
                                value="true"
                                checked={playedBefore === "true"}
                                onChange={() => setPlayedBefore("true")}
                                className="accent-primary"
                              />
                              <span>{content.yes}</span>
                            </label>
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary">
                              <input
                                type="radio"
                                name="played_before"
                                value="false"
                                checked={playedBefore === "false"}
                                onChange={() => setPlayedBefore("false")}
                                className="accent-primary"
                              />
                              <span>{content.no}</span>
                            </label>
                          </div>
                        </div>

                        {/* Tournament Experience */}
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {content.tournamentExperience}
                          </label>
                          <div className="mt-2 flex gap-4">
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary">
                              <input
                                type="radio"
                                name="tournament_experience"
                                value="true"
                                checked={tournamentExp === "true"}
                                onChange={() => setTournamentExp("true")}
                                className="accent-primary"
                              />
                              <span>{content.yes}</span>
                            </label>
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary">
                              <input
                                type="radio"
                                name="tournament_experience"
                                value="false"
                                checked={tournamentExp === "false"}
                                onChange={() => setTournamentExp("false")}
                                className="accent-primary"
                              />
                              <span>{content.no}</span>
                            </label>
                          </div>
                        </div>

                        {/* Current Level */}
                        <div>
                          <label
                            htmlFor="current_level"
                            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                          >
                            {content.currentLevel}
                          </label>
                          <select
                            id="current_level"
                            name="current_level"
                            defaultValue="Beginner"
                            className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          >
                            <option value="Beginner">
                              {content.levelBeginner}
                            </option>
                            <option value="Intermediate">
                              {content.levelIntermediate}
                            </option>
                            <option value="Advanced">
                              {content.levelAdvanced}
                            </option>
                            <option value="Competitive Player">
                              {content.levelCompetitive}
                            </option>
                          </select>
                        </div>

                        {/* Tennis Experience (years) */}
                        <div>
                          <label
                            htmlFor="tennis_experience"
                            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                          >
                            {content.tennisExperience}
                          </label>
                          <select
                            id="tennis_experience"
                            name="tennis_experience"
                            defaultValue="Less than 1 Year"
                            className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          >
                            <option value="Never Played">
                              {content.expNever}
                            </option>
                            <option value="Less than 1 Year">
                              {content.expLessThan1}
                            </option>
                            <option value="1–3 Years">
                              {content.exp1to3}
                            </option>
                            <option value="More than 3 Years">
                              {content.expMoreThan3}
                            </option>
                          </select>
                        </div>

                        {/* Current Club */}
                        <div>
                          <label
                            htmlFor="current_club"
                            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                          >
                            {content.currentClub}
                          </label>
                          <input
                            id="current_club"
                            name="current_club"
                            type="text"
                            placeholder={content.currentClubPlaceholder}
                            className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                        {/* Previous Coach */}
                        <div>
                          <label
                            htmlFor="previous_coach"
                            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                          >
                            {content.previousCoach}
                          </label>
                          <input
                            id="previous_coach"
                            name="previous_coach"
                            type="text"
                            placeholder={content.previousCoachPlaceholder}
                            className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                        {/* Federation Registration ID */}
                        <div className="sm:col-span-2">
                          <label
                            htmlFor="egypt_tennis_id"
                            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                          >
                            {content.egyptTennisId}
                          </label>
                          <input
                            id="egypt_tennis_id"
                            name="egypt_tennis_id"
                            type="text"
                            placeholder={content.egyptTennisIdPlaceholder}
                            className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION D: Training Preferences */}
                    <div className="rounded-xl border border-border/70 bg-muted/30 p-5 sm:p-6">
                      <div className="flex items-center gap-2 border-b border-border/60 pb-3 text-base font-bold text-foreground">
                        <Clock className="size-4 text-primary" aria-hidden />
                        <h3>{content.sectionTraining}</h3>
                      </div>

                      <div className="mt-5 space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          {/* Training Type */}
                          <div>
                            <label
                              htmlFor="preferred_training_type"
                              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                            >
                              {content.preferredTrainingType}
                            </label>
                            <select
                              id="preferred_training_type"
                              name="preferred_training_type"
                              defaultValue="Private"
                              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            >
                              <option value="Private">
                                {content.trainingPrivate}
                              </option>
                              <option value="Semi-Private">
                                {content.trainingSemiPrivate}
                              </option>
                              <option value="Group Training">
                                {content.trainingGroup}
                              </option>
                              <option value="Not Sure Yet">
                                {content.trainingNotSure}
                              </option>
                            </select>
                          </div>

                          {/* Preferred Time */}
                          <div>
                            <label
                              htmlFor="preferred_time"
                              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                            >
                              {content.preferredTime}
                            </label>
                            <select
                              id="preferred_time"
                              name="preferred_time"
                              defaultValue="Evening"
                              className="mt-1.5 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            >
                              <option value="Evening">
                                {content.timeEvening}
                              </option>
                              <option value="Afternoon">
                                {content.timeAfternoon}
                              </option>
                              <option value="Morning">
                                {content.timeMorning}
                              </option>
                            </select>
                          </div>
                        </div>

                        {/* Preferred Days (Multi-select) */}
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            {content.preferredDays}
                          </label>
                          <div className="mt-2.5 flex flex-wrap gap-2">
                            {daysList.map(({ key, value }) => {
                              const isSelected = selectedDays.includes(value);
                              return (
                                <button
                                  key={value}
                                  type="button"
                                  onClick={() => toggleDay(value)}
                                  className={cn(
                                    "rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all",
                                    isSelected
                                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                      : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-muted/50"
                                  )}
                                >
                                  {content.days[key]}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Additional Notes */}
                        <div>
                          <label
                            htmlFor="additional_notes"
                            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                          >
                            {content.additionalNotes}
                          </label>
                          <textarea
                            id="additional_notes"
                            name="additional_notes"
                            rows={3}
                            placeholder={content.additionalNotesPlaceholder}
                            className="mt-1.5 w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Bar */}
                    <div className="flex justify-end border-t border-border/80 pt-6">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                      >
                        {isPending ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />
                            <span>{content.submittingButton}</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="size-4" />
                            <span>{content.submitButton}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
