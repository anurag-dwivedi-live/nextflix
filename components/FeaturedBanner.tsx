"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaStar, FaRegStar } from "react-icons/fa";
import WatchlistBtn from "./WatchlistBtn";
import Link from "next/link";
import { Info } from "lucide-react";

type Movie = {
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  release_date: string;
};

export default function FeaturedBanner({ movie }: { movie: Movie }) {
  // Calculate star ratings
  const rating = movie.vote_average / 2;
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        fill
        className="object-cover"
        unoptimized
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-16 md:items-center md:px-10 lg:px-16">
        <div className="max-w-2xl pt-10 md:pt-16">
          {/* Title */}
          <h2 className="text-4xl md:text-6xl font-bold tracking-wide">
            {movie.title}
          </h2>

          {/* Rating Row */}
          <div className="mt-4 flex items-center gap-3">
            {/* Stars */}
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(fullStars)].map((_, i) => (
                <FaStar key={i} />
              ))}

              {hasHalf && <FaStar className="opacity-60" />}

              {[...Array(5 - fullStars - (hasHalf ? 1 : 0))].map((_, i) => (
                <FaRegStar key={i} />
              ))}
            </div>

            {/* IMDb Text */}
            <span className="text-sm text-white/70">
              IMDb {movie.vote_average.toFixed(1)}
            </span>
          </div>

          {/* Overview */}
          <p className="mt-4 text-white/80 line-clamp-3 leading-relaxed md:max-w-[75%] font-poppins">
            {movie.overview}
          </p>

          {/* Button */}
          <div className="mt-6 flex flex-wrap gap-4">
            <WatchlistBtn id={String(movie.id)} title={movie.title} />

            <Link href={`/movie/${movie.id}`}>
              <Button variant="secondary">
                <Info className="mr-2 h-4 w-4" />
                Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
