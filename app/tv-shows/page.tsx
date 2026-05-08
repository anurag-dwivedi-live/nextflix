import CategorySection from "@/components/CategorySection";

export default function TvShowsPage() {
  return (
    <main className="pt-24">
      <div className="px-4 md:px-8">
        <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-6xl">
          TV Shows
        </h1>

        <p className="mt-4 max-w-2xl text-muted-foreground">
          Trending series, top-rated dramas, binge-worthy thrillers and more.
        </p>
      </div>

      <CategorySection
        title="Trending Now"
        endpoint="/api/category?type=tv&category=trending"
        viewAllHref="/tv-shows/trending"
        showGenres={false}
        vertical={true}
      />

      <CategorySection
        title="Popular Shows"
        endpoint="/api/category?type=tv&category=popular"
        viewAllHref="/tv-shows/popular"
        showGenres={false}
        vertical={true}
      />

      <CategorySection
        title="Top Rated"
        endpoint="/api/category?type=tv&category=top_rated"
        viewAllHref="/tv-shows/top_rated"
        showGenres={false}
        vertical={true}
      />

      <CategorySection
        title="Airing Today"
        endpoint="/api/category?type=tv&category=airing_today"
        viewAllHref="/tv-shows/airing_today"
        showGenres={false}
        vertical={true}
      />

      <CategorySection
        title="Currently Airing"
        endpoint="/api/category?type=tv&category=on_the_air"
        viewAllHref="/tv-shows/on_the_air"
        showGenres={false}
        vertical={true}
      />
    </main>
  );
}
