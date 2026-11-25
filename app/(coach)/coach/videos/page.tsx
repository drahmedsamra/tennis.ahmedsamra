import { getVideos } from "@/services/videos";
import VideosList from "@/components/coach/VideosList";

export const dynamic = "force-dynamic";

export default async function VideosPage() {
  const videos = await getVideos();

  return <VideosList videos={videos} />;
}
