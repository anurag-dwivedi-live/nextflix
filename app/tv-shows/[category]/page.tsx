import CategorySection from "@/components/CategorySection";

const titles: Record<string, string> = {
  trending: "Trending Shows",
  popular: "Popular Shows",
  top_rated: "Top Rated Shows",
  airing_today: "Airing Today",
  on_the_air: "Currently Airing",
};

export default async function TvCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category } = await params;
  const title = titles[category] || "TV Shows";

  return (
    <main className="pt-24">
      <div className="px-6 md:px-10 lg:px-16">
        <h1 className="text-5xl font-black tracking-tight text-center pt-8">
          {title}
        </h1>
      </div>

      <CategorySection
        endpoint={`/api/category?type=tv&category=${category}`}
        showGenres={false}
        vertical
        paginated
      />
    </main>
  );
}
