"use client";

import Image from "next/image";
import Link from "next/link";
import { Info, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import WatchlistBtn from "./WatchlistBtn";

type Movie = {
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  release_date: string;
};

type Props = {
  movie: Movie;
  badge?: string;
  showDots?: boolean;
  total?: number;
  current?: number;
  onDotClick?: (index: number) => void;
};

export default function CinematicBanner({
  movie,
  badge,
  showDots,
  total,
  current,
  onDotClick,
}: Props) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <Image
        src={
          movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : "/no-poster.png"
        }
        alt={movie.title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        unoptimized
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/55 to-black/20" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-end px-6 pb-16 pt-10 md:items-center md:px-10 md:pt-16 lg:px-16">
        <div className="max-w-2xl">
          {/* Optional Badge */}
          {badge && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-primary" />
              {badge}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight md:text-7xl">
            {movie.title}
          </h1>

          {/* Rating */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm md:text-base">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="h-4 w-4 fill-yellow-400" />

              {movie.vote_average.toFixed(1)}
            </div>

            <span className="text-white/70">
              {movie.release_date?.slice(0, 4)}
            </span>
          </div>

          {/* Overview */}
          <p className="mt-5 line-clamp-3 max-w-xl text-sm leading-7 text-white/80 md:text-base">
            {movie.overview}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-wrap gap-4">
            <WatchlistBtn id={String(movie.id)} title={movie.title} />

            <Link href={`/movie/${movie.id}`}>
              <Button variant="secondary">
                <Info className="mr-2 h-4 w-4" />
                Details
              </Button>
            </Link>
          </div>

          {/* Optional Dots */}
          {showDots && total && onDotClick !== undefined && (
            <div className="mt-8 flex gap-2">
              {Array.from({ length: total }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => onDotClick(index)}
                  className={`h-2 rounded-full transition-all ${
                    current === index ? "w-8 bg-primary" : "w-2 bg-white/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
