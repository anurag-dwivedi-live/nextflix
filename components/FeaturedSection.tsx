"use client";

import { useEffect, useState } from "react";
import FeaturedBanner from "./FeaturedBanner";

type Movie = {
  id: number;
  title: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  release_date: string;
};

export default function FeaturedSection({ index = 0 }: { index?: number }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured movies on mount
  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await fetch("/api/featured");

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();

        setMovies([data.primary, data.secondary]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadFeatured();
  }, []);

  if (loading || !movies[index]) return null;

  return <FeaturedBanner movie={movies[index]} />;
}
