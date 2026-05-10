import { BASE_URL } from "@/lib/config";
import CategorySectionClient from "./CategorySectionClient";

type Props = {
  title?: string;
  endpoint: string;
  showGenres?: boolean;
  vertical?: boolean;
  viewAllHref?: string;
  paginated?: boolean;
};

export default async function CategorySection({
  title = "",
  endpoint,
  showGenres = true,
  vertical = false,
  viewAllHref,
  paginated = false,
}: Props) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    next: {
      revalidate: 3600,
    },
  });

  const data = await res.json();

  return (
    <CategorySectionClient
      title={title}
      endpoint={endpoint}
      showGenres={showGenres}
      vertical={vertical}
      viewAllHref={viewAllHref}
      paginated={paginated}
      initialMovies={data.results || []}
      initialTotalPages={Math.min(data.total_pages || 1, 500)}
    />
  );
}
