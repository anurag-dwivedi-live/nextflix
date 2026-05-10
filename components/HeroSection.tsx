"use client";

import { useEffect, useState } from "react";
import CinematicBanner from "./CinematicBanner";

type Media = {
  id: number;
  title?: string;
  name?: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  mediaType?: "movie" | "tv";
};

type Props = {
  movies: Media[];
};

export default function HeroSection({ movies }: Props) {
  const [current, setCurrent] = useState(0);

  // Auto-rotate movies every 5 seconds
  useEffect(() => {
    if (!movies.length) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  const movie = movies[current];

  return (
    <CinematicBanner
      movie={movie}
      badge="Now Playing"
      showDots
      total={movies.length}
      current={current}
      onDotClick={setCurrent}
    />
  );
}
