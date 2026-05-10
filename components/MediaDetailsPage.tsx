import Image from "next/image";
import CastCard from "./CastCard";
import { Star } from "lucide-react";
import WatchNowBtn from "./WatchNowBtn";
import WatchlistBtn from "./WatchlistBtn";
import WatchTrailerBtn from "./WatchTrailerBtn";
import RecommendationsSection from "./RecommendationsSection";

type Props = {
  data: any;
};

export default function MediaDetailsPage({ data }: Props) {
  // Derive common fields for both movies and TV shows
  const title = data.title || data.name || "Untitled";

  // Find the first YouTube trailer in the videos list
  const trailer = data.videos?.results?.find(
    (video: any) => video.type === "Trailer" && video.site === "YouTube",
  );

  // Extract year, genres, and runtime in a way that works for both movies and TV shows
  const year =
    data.release_date?.slice(0, 4) || data.first_air_date?.slice(0, 4);
  const genres = data.genres?.map((g: any) => g.name).join(" • ");
  const runtime = data.runtime
    ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
    : null;

  const mediaType = data.title ? "movie" : "tv";

  return (
    <main className="min-h-screen bg-background text-white">
      {/* HERO */}
      <section className="relative min-h-[90vh] w-full overflow-hidden">
        {/* Backdrop */}
        <Image
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-black/30" />
        <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/40 to-transparent" />

        {/* CONTENT */}
        <div className="relative z-10 flex min-h-[90vh] items-end px-6 pb-20 pt-32 md:px-10 lg:px-16">
          <div className="grid w-full gap-10 lg:grid-cols-[300px_1fr] lg:items-end">
            {/* Poster */}
            <div className="mx-auto w-44 sm:w-52 md:w-60 lg:mx-0 lg:w-auto">
              <div className="relative aspect-2/3 overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={`https://image.tmdb.org/t/p/w780${data.poster_path}`}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="max-w-4xl">
              {/* Tagline */}
              {data.tagline && (
                <p className="mb-4 text-sm uppercase tracking-[0.3em] text-primary">
                  {data.tagline}
                </p>
              )}

              {/* Title */}
              <h1 className="text-5xl font-black tracking-tight md:text-7xl">
                {title}
              </h1>

              {/* Metadata */}
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/70 md:text-base">
                {year && <span>{year}</span>}

                {runtime && (
                  <>
                    <span>•</span>
                    <span>{runtime}</span>
                  </>
                )}

                {genres && (
                  <>
                    <span>•</span>
                    <span>{genres}</span>
                  </>
                )}

                <span>•</span>

                <span className="font-semibold text-yellow-400">
                  <Star className="inline h-5 w-5 fill-current" />
                  {data.vote_average?.toFixed(1)}
                </span>
              </div>

              {/* Overview */}
              <p className="mt-8 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">
                {data.overview}
              </p>

              {/* Buttons */}
              <div className="mt-10 flex flex-wrap gap-4">
                {/* Watch Now */}
                <WatchNowBtn id={data.id} type={mediaType} title={title} />

                {/* Watch Trailer */}
                {trailer && (
                  <WatchTrailerBtn
                    trailerKey={trailer.key}
                    trailerName={trailer.name}
                    title={title}
                  />
                )}

                {/* Watchlist */}
                <WatchlistBtn
                  id={String(data.id)}
                  title={title}
                  mediaType={mediaType}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="px-6 py-16 md:px-10 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div>
            <h2 className="text-2xl font-bold">Storyline</h2>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {data.overview}
            </p>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-white/50">
                Status
              </h3>

              <p className="mt-2 text-lg">{data.status}</p>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] text-white/50">
                Original Language
              </h3>

              <p className="mt-2 text-lg uppercase">{data.original_language}</p>
            </div>

            {data.budget > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-[0.2em] text-white/50">
                  Budget
                </h3>

                <p className="mt-2 text-lg">${data.budget.toLocaleString()}</p>
              </div>
            )}

            {data.revenue > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-[0.2em] text-white/50">
                  Revenue
                </h3>

                <p className="mt-2 text-lg">${data.revenue.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CAST */}
      {data.credits?.cast?.length > 0 && (
        <section className="px-6 pb-20 md:px-10 lg:px-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Top Cast</h2>

            <span className="text-sm text-white/50">
              {data.credits.cast.length} Cast Members
            </span>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar">
            {data.credits.cast.slice(0, 20).map((person: any) => (
              <CastCard
                key={person.id}
                name={person.name}
                character={person.character}
                profilePath={person.profile_path}
              />
            ))}
          </div>
        </section>
      )}

      {/* RECOMMENDATIONS */}
      <RecommendationsSection
        title="More Like This"
        items={data.recommendations?.results?.slice(0, 12)}
        mediaType={mediaType}
      />
    </main>
  );
}
