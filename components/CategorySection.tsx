"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import MovieCardSkeleton from "./CardSkeleton";
import { Button } from "./ui/button";
import { FaArrowRight } from "react-icons/fa";

const genres = [
  { name: "All", id: "" },
  { name: "Action", id: 28 },
  { name: "Comedy", id: 35 },
  { name: "Adventure", id: 12 },
  { name: "Horror", id: 27 },
];

type Movie = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
};

type Props = {
  title: string;
  endpoint: string;
  showGenres?: boolean;
};

export default function CategorySection({
  title,
  endpoint,
  showGenres = true,
}: Props) {
  const [activeGenre, setActiveGenre] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch movies when component mounts or activeGenre changes
  useEffect(() => {
    async function loadMovies() {
      setLoading(true);

      try {
        const url = activeGenre ? `${endpoint}&genre=${activeGenre}` : endpoint;
        const res = await fetch(url);
        const data = await res.json();

        setMovies(data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [activeGenre]);

  return (
    <section className="px-6 py-16 md:px-10 lg:px-16">
      {/* Tabs */}
      {showGenres && (
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {genres.map((genre) => (
            <Button
              key={genre.name}
              variant={activeGenre === String(genre.id) ? "default" : "outline"}
              onClick={() => setActiveGenre(String(genre.id))}
              className="rounded-full px-6"
            >
              {genre.name}
            </Button>
          ))}
        </div>
      )}

      {/* Header */}
      <div
        className={`mb-6 flex items-center justify-between ${
          showGenres ? "mt-10" : "mt-0"
        }`}
      >
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button
          variant="default"
          size="sm"
          className="bg-transparent text-gray-400 hover:bg-transparent hover:text-white"
        >
          <span className="mr-1">View All</span>
          <FaArrowRight size={12} />
        </Button>
      </div>

      {/* Movie Row */}
      <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="min-w-50">
                <MovieCardSkeleton />
              </div>
            ))
          : movies.map((movie) => (
              <div key={movie.id} className="min-w-50">
                <MovieCard
                  id={String(movie.id)}
                  title={movie.title || movie.name || "Untitled"}
                  year={
                    movie.release_date?.slice(0, 4) ||
                    movie.first_air_date?.slice(0, 4) ||
                    "N/A"
                  }
                  poster={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/no-poster.png"
                  }
                />
              </div>
            ))}
      </div>
    </section>
  );
}
