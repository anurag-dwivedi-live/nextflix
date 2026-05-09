import MediaCategoryPage from "@/components/MediaCategoryPage";
import { mediaConfig } from "@/lib/media-config";

export default async function TvCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const title =
    mediaConfig.tvShows.categoryTitles[
      category as keyof typeof mediaConfig.tvShows.categoryTitles
    ] || "TV Shows";

  return <MediaCategoryPage title={title} type="tv" category={category} />;
}
