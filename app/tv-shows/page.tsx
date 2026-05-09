import MediaBrowsePage from "@/components/MediaBrowsePage";
import { mediaConfig } from "@/lib/media-config";

export default function TvShowsPage() {
  return (
    <MediaBrowsePage
      title={mediaConfig.tvShows.title}
      description={mediaConfig.tvShows.description}
      type={mediaConfig.tvShows.type}
      sections={mediaConfig.tvShows.sections}
      basePath="/tv-shows"
    />
  );
}
