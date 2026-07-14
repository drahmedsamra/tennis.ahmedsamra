"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { cn } from "@/lib/utils";

type GallerySectionProps = {
  content: Dictionary["gallery"];
  locale: Locale;
};

export function GallerySection({ content, locale }: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage =
    activeIndex === null ? null : content.images[activeIndex] ?? null;
  const isRtl = locale === "ar";

  function openLightbox(index: number) {
    setActiveIndex(index);
  }

  function closeLightbox() {
    setActiveIndex(null);
  }

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === 0 ? content.images.length - 1 : current - 1;
    });
  }, [content.images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === content.images.length - 1 ? 0 : current + 1;
    });
  }, [content.images.length]);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        if (isRtl) {
          showNext();
        } else {
          showPrevious();
        }
      }

      if (event.key === "ArrowRight") {
        if (isRtl) {
          showPrevious();
        } else {
          showNext();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, isRtl, showNext, showPrevious]);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-14 overflow-hidden lg:scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl px-6 py-32 lg:px-8 lg:py-44">
        <div className="luxury-reveal max-w-3xl">
          <p className="text-[0.6875rem] font-semibold tracking-[0.28em] text-primary uppercase">
            {content.eyebrow}
          </p>
          <h2
            id="gallery-heading"
            className="mt-6 text-3xl font-semibold leading-[1.18] text-foreground sm:text-4xl lg:text-5xl"
          >
            {content.heading}
          </h2>
          <p className="mt-8 max-w-2xl text-base leading-[1.95] text-muted-foreground sm:text-lg">
            {content.subtitle}
          </p>
        </div>

        <div className="mt-20">
          <GalleryImageButton
            image={content.images[0]}
            index={0}
            onOpen={openLightbox}
            className="luxury-reveal luxury-reveal-delay-1 aspect-[4/5] sm:aspect-[16/9]"
            sizes="(min-width: 1152px) 1152px, calc(100vw - 48px)"
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.images.slice(1).map((image, index) => {
            const imageIndex = index + 1;

            return (
              <GalleryImageButton
                key={image.src}
                image={image}
                index={imageIndex}
                onOpen={openLightbox}
                className={cn(
                  "luxury-reveal aspect-[4/5]",
                  imageIndex === 1 && "sm:col-span-2 sm:aspect-[16/10]",
                  imageIndex === 4 && "lg:col-span-2 lg:aspect-[16/10]",
                  imageIndex === 7 && "sm:col-span-2 lg:col-span-1 lg:aspect-[4/5]",
                  imageIndex === 1 && "luxury-reveal-delay-1",
                  imageIndex === 2 && "luxury-reveal-delay-2",
                  imageIndex === 3 && "luxury-reveal-delay-3",
                  imageIndex === 4 && "luxury-reveal-delay-4",
                  imageIndex >= 5 && "luxury-reveal-delay-5",
                )}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, calc(100vw - 48px)"
              />
            );
          })}
        </div>
      </div>

      {activeImage && activeIndex !== null ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 p-4 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={content.lightboxLabel}
          onClick={closeLightbox}
        >
          <button
            type="button"
            aria-label={content.closeLabel}
            className="absolute end-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full border border-background/15 bg-background/10 text-background backdrop-blur transition-colors hover:bg-background/20 sm:end-6 sm:top-6"
            onClick={closeLightbox}
          >
            <X className="size-5" aria-hidden />
          </button>

          <button
            type="button"
            aria-label={content.previousLabel}
            className="absolute start-4 z-10 inline-flex size-10 items-center justify-center rounded-full border border-background/15 bg-background/10 text-background backdrop-blur transition-colors hover:bg-background/20 sm:start-6"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
          >
            {isRtl ? (
              <ChevronRight className="size-5" aria-hidden />
            ) : (
              <ChevronLeft className="size-5" aria-hidden />
            )}
          </button>

          <figure
            className="relative h-[78svh] w-full max-w-5xl overflow-hidden rounded-xl border border-background/15 bg-background/5"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </figure>

          <button
            type="button"
            aria-label={content.nextLabel}
            className="absolute end-4 z-10 inline-flex size-10 items-center justify-center rounded-full border border-background/15 bg-background/10 text-background backdrop-blur transition-colors hover:bg-background/20 sm:end-6"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
          >
            {isRtl ? (
              <ChevronLeft className="size-5" aria-hidden />
            ) : (
              <ChevronRight className="size-5" aria-hidden />
            )}
          </button>

          <p className="absolute bottom-4 start-1/2 -translate-x-1/2 text-xs font-medium tracking-wide text-background/75 sm:bottom-6">
            {activeIndex + 1} / {content.images.length}
          </p>
        </div>
      ) : null}
    </section>
  );
}

type GalleryImageButtonProps = {
  className?: string;
  image: Dictionary["gallery"]["images"][number];
  index: number;
  onOpen: (index: number) => void;
  sizes: string;
};

function GalleryImageButton({
  className,
  image,
  index,
  onOpen,
  sizes,
}: GalleryImageButtonProps) {
  return (
    <button
      type="button"
      aria-label={image.alt}
      className={cn(
        "group relative block w-full overflow-hidden rounded-xl border border-border/70 bg-muted text-start transition-all duration-300 hover:-translate-y-1 hover:border-primary/30",
        className,
      )}
      onClick={() => onOpen(index)}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </button>
  );
}
