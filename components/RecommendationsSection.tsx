import MovieCard from "./MovieCard";

type Props = {
  title?: string;
  items: any[];
  mediaType: "movie" | "tv";
};

export default function RecommendationsSection({
  title = "More Like This",
  items,
  mediaType,
}: Props) {
  if (!items?.length) return null;

  return (
    <section className="px-6 pb-24 md:px-10 lg:px-16">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <span className="text-sm text-white/50">{items.length} Titles</span>
      </div>

      {/* Row */}
      <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="min-w-45">
            <MovieCard
              id={String(item.id)}
              title={item.title || item.name || "Untitled"}
              year={
                item.release_date?.slice(0, 4) ||
                item.first_air_date?.slice(0, 4) ||
                "N/A"
              }
              poster={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                  : "/no-poster.png"
              }
              mediaType={mediaType}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
