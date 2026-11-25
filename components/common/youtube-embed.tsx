"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from "@/lib/youtube";

type YouTubeEmbedProps = {
  url: string;
  title?: string;
  autoPlay?: boolean;
  className?: string;
};

export function YouTubeEmbed({
  url,
  title = "YouTube Video",
  autoPlay = false,
  className = "",
}: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const embedUrl = getYouTubeEmbedUrl(url);
  const thumbnail = getYouTubeThumbnail(url);

  if (!embedUrl) {
    return (
      <div className={`flex items-center justify-center rounded-2xl bg-slate-100 p-6 text-sm text-slate-500 ${className}`}>
        رابط يوتيوب غير صالح / Invalid YouTube URL
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <div
        onClick={() => setIsPlaying(true)}
        className={`group relative aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-slate-900 shadow-md transition hover:shadow-xl ${className}`}
      >
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-700">
            <Play className="h-6 w-6 fill-current translate-x-0.5" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-md ${className}`}>
      <iframe
        src={`${embedUrl}&autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </div>
  );
}
