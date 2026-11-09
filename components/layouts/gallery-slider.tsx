"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Pause,
  Play,
  Sparkles,
  X,
} from "lucide-react";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { GalleryImage } from "@/types/gallery";

type GallerySliderProps = {
  content: Dictionary["gallery"];
  locale: Locale;
  initialImages?: GalleryImage[];
};

export function GallerySlider({
  content,
  locale,
  initialImages = [],
}: GallerySliderProps) {
  const isRtl = locale === "ar";

  // Normalize images: either from Supabase or fallback to dictionary
  const slides =
    initialImages.length > 0
      ? initialImages.map((img) => ({
          id: img.id,
          src: img.image_url,
          title: isRtl
            ? img.title_ar
            : img.title_en || img.title_ar,
          description: isRtl
            ? img.description_ar
            : img.description_en || img.description_ar,
          category: img.category || (isRtl ? "الأكاديمية" : "Academy"),
        }))
      : content.images.map((img, idx) => ({
          id: `fallback-${idx}`,
          src: img.src,
          title: isRtl ? `لحظة من تدريبات الأكاديمية #${idx + 1}` : `Academy Moment #${idx + 1}`,
          description: img.alt || content.subtitle,
          category: isRtl ? "تدريب" : "Training",
        }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Swipe detection refs
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = slides.length;

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying || isLightboxOpen || totalSlides <= 1) return;

    const timer = setInterval(() => {
      showNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [isPlaying, isLightboxOpen, showNext, totalSlides]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        if (isRtl) {
          setLightboxIndex((prev) => (prev + 1) % totalSlides);
        } else {
          setLightboxIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
        }
      } else if (e.key === "ArrowRight") {
        if (isRtl) {
          setLightboxIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
        } else {
          setLightboxIndex((prev) => (prev + 1) % totalSlides);
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, isRtl, totalSlides]);

  // Touch Swipe Handlers
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.targetTouches[0].clientX;
  }

  function handleTouchMove(e: React.TouchEvent) {
    touchEndX.current = e.targetTouches[0].clientX;
  }

  function handleTouchEnd() {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const isSignificantSwipe = Math.abs(distance) > 50;

    if (isSignificantSwipe) {
      if (distance > 0) {
        // Swiped Left
        if (isRtl) {
          showPrev();
        } else {
          showNext();
        }
      } else {
        // Swiped Right
        if (isRtl) {
          showNext();
        } else {
          showPrev();
        }
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }

  function openLightbox(index: number) {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  }

  const activeLightboxSlide = slides[lightboxIndex];

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-14 overflow-hidden py-24 sm:py-32 lg:scroll-mt-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold tracking-widest text-emerald-600 uppercase">
            <Sparkles className="size-3.5" />
            {content.eyebrow}
          </div>
          <h2
            id="gallery-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {content.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {content.subtitle}
          </p>
        </div>

        {/* Carousel Showcase Container */}
        <div
          className="relative mt-12 overflow-hidden rounded-3xl border border-border/80 bg-slate-950 shadow-2xl transition-all sm:mt-16"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Slide Stage */}
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={slide.id}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isActive
                      ? "pointer-events-auto opacity-100 z-10"
                      : "pointer-events-none opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.title || "Academy Photo"}
                    fill
                    priority={idx === 0}
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    className={`object-cover transition-transform duration-1000 ease-out ${
                      isActive ? "scale-100" : "scale-105"
                    }`}
                  />

                  {/* Gradient Overlay for Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent sm:via-slate-950/30" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent opacity-80" />

                  {/* Slide Content Caption */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
                    <div className="max-w-2xl text-start">
                      {slide.category ? (
                        <span className="inline-block rounded-lg bg-emerald-500/90 px-3 py-1 text-xs font-bold text-white shadow-sm backdrop-blur">
                          {slide.category}
                        </span>
                      ) : null}

                      <h3 className="mt-2.5 text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                        {slide.title}
                      </h3>

                      {slide.description ? (
                        <p className="mt-2 text-xs leading-relaxed text-slate-200 line-clamp-2 sm:text-sm sm:line-clamp-3">
                          {slide.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Top Bar Floating Controls */}
            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4 sm:p-6">
              {/* Counter Badge */}
              <div className="rounded-full border border-white/20 bg-slate-950/60 px-3.5 py-1 text-xs font-semibold text-white/90 backdrop-blur-md">
                <span>{String(currentIndex + 1).padStart(2, "0")}</span>
                <span className="mx-1 text-white/40">/</span>
                <span>{String(totalSlides).padStart(2, "0")}</span>
              </div>

              {/* Action Buttons (Lightbox & Play/Pause) */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  title={isPlaying ? "إيقاف السلايدر مؤقتاً" : "تشغيل السلايدر"}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-white/90 backdrop-blur-md transition hover:bg-white/20"
                >
                  {isPlaying ? (
                    <Pause className="size-4" />
                  ) : (
                    <Play className="size-4" />
                  )}
                </button>
                <button
                  type="button"
                  title={isRtl ? "تكبير الصورة" : "Expand Image"}
                  onClick={() => openLightbox(currentIndex)}
                  className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-white/90 backdrop-blur-md transition hover:bg-white/20"
                >
                  <Maximize2 className="size-4" />
                </button>
              </div>
            </div>

            {/* Navigation Arrows (Start / End respecting RTL) */}
            <button
              type="button"
              aria-label={content.previousLabel}
              onClick={showPrev}
              className="absolute start-3 top-1/2 z-20 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-white backdrop-blur-md transition hover:scale-110 hover:bg-white/20 sm:start-6 sm:size-12"
            >
              {isRtl ? (
                <ChevronRight className="size-5 sm:size-6" />
              ) : (
                <ChevronLeft className="size-5 sm:size-6" />
              )}
            </button>

            <button
              type="button"
              aria-label={content.nextLabel}
              onClick={showNext}
              className="absolute end-3 top-1/2 z-20 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-white backdrop-blur-md transition hover:scale-110 hover:bg-white/20 sm:end-6 sm:size-12"
            >
              {isRtl ? (
                <ChevronLeft className="size-5 sm:size-6" />
              ) : (
                <ChevronRight className="size-5 sm:size-6" />
              )}
            </button>
          </div>

          {/* Dots Indicator Bar */}
          <div className="flex items-center justify-center gap-2 border-t border-white/10 bg-slate-950/80 px-4 py-3.5 backdrop-blur-sm sm:gap-3 sm:py-4">
            {slides.map((_, dotIdx) => {
              const isDotActive = dotIdx === currentIndex;
              return (
                <button
                  key={dotIdx}
                  type="button"
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  onClick={() => setCurrentIndex(dotIdx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isDotActive
                      ? "w-8 bg-emerald-500 shadow-sm shadow-emerald-500/50"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && activeLightboxSlide ? (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/95 p-4 backdrop-blur-xl sm:p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            type="button"
            aria-label={content.closeLabel}
            onClick={() => setIsLightboxOpen(false)}
            className="absolute end-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:end-6 sm:top-6"
          >
            <X className="size-6" />
          </button>

          {/* Previous in Lightbox */}
          <button
            type="button"
            aria-label={content.previousLabel}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
            }}
            className="absolute start-4 top-1/2 z-10 -translate-y-1/2 flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:start-8 sm:size-12"
          >
            {isRtl ? (
              <ChevronRight className="size-6" />
            ) : (
              <ChevronLeft className="size-6" />
            )}
          </button>

          {/* Lightbox Figure */}
          <div
            className="relative flex max-h-[82svh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-black/60 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full flex-1">
              <Image
                src={activeLightboxSlide.src}
                alt={activeLightboxSlide.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Lightbox Caption Footer */}
            <div className="border-t border-white/10 bg-slate-950/90 p-4 text-start sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  {activeLightboxSlide.category ? (
                    <span className="text-xs font-bold text-emerald-400">
                      {activeLightboxSlide.category}
                    </span>
                  ) : null}
                  <h4 className="text-lg font-bold text-white sm:text-xl">
                    {activeLightboxSlide.title}
                  </h4>
                </div>
                <div className="text-xs font-semibold text-white/60">
                  {lightboxIndex + 1} / {totalSlides}
                </div>
              </div>
              {activeLightboxSlide.description ? (
                <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  {activeLightboxSlide.description}
                </p>
              ) : null}
            </div>
          </div>

          {/* Next in Lightbox */}
          <button
            type="button"
            aria-label={content.nextLabel}
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev + 1) % totalSlides);
            }}
            className="absolute end-4 top-1/2 z-10 -translate-y-1/2 flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:end-8 sm:size-12"
          >
            {isRtl ? (
              <ChevronLeft className="size-6" />
            ) : (
              <ChevronRight className="size-6" />
            )}
          </button>
        </div>
      ) : null}
    </section>
  );
}
