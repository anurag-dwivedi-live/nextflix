import MediaDetailsPage from "@/components/MediaDetailsPage";
import { getBaseUrl } from "@/lib/constants";

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/details?id=${id}&type=movie`, {
    next: {
      revalidate: 3600,
    },
  });
  const data = await res.json();
  return <MediaDetailsPage data={data} />;
}
