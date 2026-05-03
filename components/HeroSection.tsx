"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Info, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";

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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Fetch now playing movies for the hero section
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

  // Auto-scroll carousel every 4 seconds
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  // Update current movie index when carousel changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();
  }, [api]);

  if (loading) {
    return (
      <section className="pt-24 pb-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:px-10 lg:grid-cols-2 lg:px-16">
          {/* Left */}
          <div className="space-y-6">
            <Skeleton className="h-8 w-40 rounded-full" />
            <Skeleton className="h-16 w-full max-w-xl" />
            <Skeleton className="h-6 w-52" />
            <Skeleton className="h-24 w-full max-w-xl" />

            <div className="flex gap-4">
              <Skeleton className="h-11 w-40 rounded-md" />
              <Skeleton className="h-11 w-32 rounded-md" />
            </div>
          </div>

          {/* Right */}
          <Skeleton className="h-80 rounded-3xl md:h-130" />
        </div>
      </section>
    );
  }

  const movie = movies[current];

  return (
    <section className="relative overflow-hidden pt-24 pb-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-2 lg:px-16">
        {/* LEFT */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Now Playing
          </div>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            {movie.title}
          </h1>

          <div className="flex items-center gap-4 text-sm md:text-base">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="h-4 w-4 fill-yellow-400" />
              {movie.vote_average.toFixed(1)}
            </div>

            <span className="text-muted-foreground">
              {movie.release_date?.slice(0, 4)}
            </span>
          </div>

          <p className="max-w-xl leading-7 text-muted-foreground line-clamp-4">
            {movie.overview}
          </p>

          <div className="flex gap-4">
            <WatchlistBtn id={String(movie.id)} title={movie.title} />

            <Link href={`/movie/${movie.id}`}>
              <Button variant="secondary">
                <Info className="mr-2 h-4 w-4" />
                Details
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {movies.map((item) => (
              <CarouselItem key={item.id}>
                <div className="relative h-80 overflow-hidden rounded-3xl md:h-130">
                  <Image
                    src={
                      item.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                        : "/no-poster.png"
                    }
                    alt={item.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-background/70 via-background/10 to-transparent" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
