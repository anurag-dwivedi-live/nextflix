import MediaCategoryPage from "@/components/MediaCategoryPage";
import { mediaConfig } from "@/lib/media-config";

export default async function MoviesCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const title =
    mediaConfig.movies.categoryTitles[
      category as keyof typeof mediaConfig.movies.categoryTitles
    ] || "Movies";

  return <MediaCategoryPage title={title} type="movie" category={category} />;
}
