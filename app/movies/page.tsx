import MediaBrowsePage from "@/components/MediaBrowsePage";
import { mediaConfig } from "@/lib/media-config";

export default function MoviesPage() {
  return (
    <MediaBrowsePage
      title={mediaConfig.movies.title}
      description={mediaConfig.movies.description}
      type={mediaConfig.movies.type}
      sections={mediaConfig.movies.sections}
      basePath="/movies"
    />
  );
}
