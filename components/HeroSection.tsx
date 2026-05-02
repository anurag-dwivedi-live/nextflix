"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Info, Star } from "lucide-react";
import { BsSave2Fill } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";

// Hardcoded movie data for demonstration purposes.
// In a real app, this would come from an API.
// Since OMDB doesn't provide trending movies endpoint, so we are hardcoding it here
const movies = [
  {
    id: "tt1160419",
    title: "Dune: Part Two",
    year: "2024",
    rating: "8.9",
    genre: ["Sci-Fi", "Adventure"],
    plot: "Paul Atreides unites with the Fremen while seeking revenge against those who destroyed his family.",
    image:
      "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
  },
  {
    id: "tt15398776",
    title: "Oppenheimer",
    year: "2023",
    rating: "8.6",
    genre: ["Drama", "History"],
    plot: "The story of J. Robert Oppenheimer and the creation of the atomic bomb.",
    image:
      "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
  },
  {
    id: "tt1877830",
    title: "The Batman",
    year: "2022",
    rating: "8.0",
    genre: ["Crime", "Action"],
    plot: "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind clues.",
    image:
      "https://image.tmdb.org/t/p/original/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
  },
  {
    id: "tt1630029",
    title: "Avatar: The Way of Water",
    year: "2022",
    rating: "7.9",
    genre: ["Fantasy", "Adventure"],
    plot: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
    image:
      "https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
  },
];

export default function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [animateText, setAnimateText] = useState(true);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setAnimateText(false);

      setTimeout(() => {
        setCurrent(api.selectedScrollSnap());
        setAnimateText(true);
      }, 180);
    };

    onSelect();
    api.on("select", onSelect);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  const movie = movies[current];

  return (
    <section className="relative overflow-hidden pt-24 pb-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-2 lg:px-16">
        {/* LEFT */}
        <div
          className={`space-y-6 transition-all duration-500 ${
            animateText
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
          key={movie.id}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Featured Today
          </div>

          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="h-4 w-4 fill-yellow-400" />
              {movie.rating}
            </div>

            <span className="text-muted-foreground">{movie.year}</span>

            <div className="flex gap-2">
              {movie.genre.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs text-foreground/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <p className="max-w-xl leading-7 text-muted-foreground">
            {movie.plot}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button className="p-4">
              <BsSave2Fill className="mr-2 h-4 w-4 fill-white" />
              Add to Watchlist
            </Button>

            <Link href={`/movie/${movie.id}`}>
              <Button variant="secondary" className="p-4">
                <Info className="mr-2 h-4 w-4" />
                Details
              </Button>
            </Link>
          </div>

          {/* Dots */}
          <div className="flex gap-2 pt-2">
            {movies.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  current === index ? "w-8 bg-primary" : "w-2 bg-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {movies.map((item) => (
                <CarouselItem key={item.id}>
                  <div className="relative h-80 overflow-hidden rounded-3xl md:h-130">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-background/70 via-background/10 to-transparent" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
