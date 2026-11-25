/**
 * Utility functions for parsing and embedding YouTube links.
 */

export function extractYouTubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // Pattern matches:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://m.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  // - https://www.youtube.com/shorts/VIDEO_ID
  const regExp =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#&?]*).*/;
  const match = trimmed.match(regExp);

  return match && match[1].length === 11 ? match[1] : null;
}

export function getYouTubeThumbnail(url: string | null | undefined): string {
  const videoId = extractYouTubeId(url);
  if (!videoId) {
    return "/images/placeholder-video.jpg";
  }
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function getYouTubeEmbedUrl(url: string | null | undefined): string | null {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}?rel=0`;
}
