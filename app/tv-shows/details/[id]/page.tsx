import MediaDetailsPage from "@/components/MediaDetailsPage";
import { getBaseUrl } from "@/lib/constants";

export default async function TvDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/details?id=${id}&type=tv`, {
    next: {
      revalidate: 3600,
    },
  });
  const data = await res.json();
  return <MediaDetailsPage data={data} />;
}
