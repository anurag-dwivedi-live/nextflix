"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Info, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import WatchlistBtn from "./WatchlistBtn";

type Movie = {
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  release_date: string;
};

export default function HeroSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function loadMovies() {
      try {
        const res = await fetch("/api/hero");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();

        setMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  useEffect(() => {
    if (!movies.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  if (loading) {
    return (
      <section className="relative h-screen w-full overflow-hidden">
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-6 pb-16 md:items-center md:px-10 lg:px-16">
          <div className="max-w-2xl w-[80%] space-y-5">
            <Skeleton className="h-8 w-36 mt-16 rounded-full" />
            <Skeleton className="h-14 w-full max-w-3xl mt-8" />
            <Skeleton className="h-14 w-3/4 mt-0" />
            <div className="flex space-x-3 mt-8">
              <Skeleton className="h-5 w-18" />
              <Skeleton className="h-5 w-18" />
            </div>
            <Skeleton className="h-4 w-full mt-8" />
            <Skeleton className="h-4 w-full mt-0" />
            <Skeleton className="h-4 w-4/5" />

            <div className="flex gap-4 pt-2">
              <Skeleton className="h-11 w-40 rounded-md" />
              <Skeleton className="h-11 w-32 rounded-md" />
            </div>
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </section>
    );
  }

  const movie = movies[current];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Fade Slides */}
      {movies.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            current === index ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <Image
            src={
              item.backdrop_path
                ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                : "/no-poster.png"
            }
            alt={item.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            unoptimized
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/55 to-black/20" />

          {/* Navbar readability */}
          <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/80 to-transparent" />

          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-end px-6 pb-16 pt-10 md:items-center md:px-10 md:pt-16 lg:px-16">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Now Playing
          </div>

          <h1 className="text-4xl font-bold leading-tight md:text-7xl">
            {movie.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm md:text-base">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="h-4 w-4 fill-yellow-400" />
              {movie.vote_average.toFixed(1)}
            </div>

            <span className="text-white/70">
              {movie.release_date?.slice(0, 4)}
            </span>
          </div>

          <p className="mt-5 line-clamp-3 max-w-xl text-sm leading-7 text-white/80 md:text-base">
            {movie.overview}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <WatchlistBtn id={String(movie.id)} title={movie.title} />

            <Link href={`/movie/${movie.id}`}>
              <Button variant="secondary">
                <Info className="mr-2 h-4 w-4" />
                Details
              </Button>
            </Link>
          </div>

          {/* Dots */}
          <div className="mt-8 flex gap-2">
            {movies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all ${
                  current === index ? "w-8 bg-primary" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
