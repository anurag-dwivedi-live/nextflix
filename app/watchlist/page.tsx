"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ArrowRightIcon, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import MovieCardSkeleton from "@/components/CardSkeleton";
import ConfirmDialog from "@/components/ConfirmDialog";

import {
  getWatchlist,
  removeFromWatchlist,
  clearWatchlist,
} from "@/lib/watchlist";
import { toast } from "sonner";

// TMDB API returns a lot of data, but we only need a few fields for the watchlist page
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};

export default function Watchlist() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Load watchlist movies from localStorage and TMDB API
  async function loadWatchlist() {
    setLoading(true);

    const ids = getWatchlist();

    if (!ids.length) {
      setMovies([]);
      setLoading(false);
      return;
    }

    try {
      const results = await Promise.all(
        ids.map(async (id) => {
          const res = await fetch(`/api/movies?id=${id}`);

          if (!res.ok) throw new Error("Failed");

          return res.json();
        }),
      );

      setMovies(results);
    } catch (error) {
      console.error(error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWatchlist();
  }, []);

  // Remove movie from watchlist and update state
  function handleRemove(id: number, title: string) {
    removeFromWatchlist(String(id));

    setMovies((prev) => prev.filter((movie) => movie.id !== id));

    toast.success(`${title} removed from watchlist`);
  }

  // Clear entire watchlist and update state
  function clearAll() {
    clearWatchlist();
    setMovies([]);
    toast.success("Watchlist cleared");
  }

  // Show loading skeletons while fetching movies
  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-28 md:px-10 lg:px-16">
        <h1 className="mb-8 text-4xl font-bold">My Watchlist</h1>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-28 md:px-10 lg:px-16">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold">My Watchlist</h1>

          <p className="mt-2 flex items-center text-muted-foreground">
            <Heart className="mr-2 h-5 w-5 text-primary" fill="currentColor" />
            {movies.length} saved movies
          </p>
        </div>

        {/* Clear All Button */}
        {movies.length > 0 && (
          <ConfirmDialog
            title="Clear your watchlist?"
            description="This will remove all saved movies permanently."
            confirmText="Clear All"
            onConfirm={clearAll}
            trigger={<Button variant="destructive">Clear All</Button>}
          />
        )}
      </div>

      {!movies.length ? (
        <div className="flex min-h-105 flex-col items-center justify-center rounded-3xl border bg-muted/30 text-center">
          <Heart className="mb-4 h-12 w-12 text-primary" fill="currentColor" />

          <h2 className="text-2xl font-semibold">No movies in watchlist</h2>

          <p className="mt-2 text-muted-foreground">
            Start adding movies you love.
          </p>

          <Link href="/" className="mt-6">
            <Button className="px-4 py-5">
              Browse Movies
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {movies.map((movie) => (
            <div key={movie.id} className="group">
              <Link href={`/movie/${movie.id}`}>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/no-poster.png"
                    }
                    alt={movie.title}
                    className="h-72 w-full object-cover transition group-hover:scale-105"
                  />
                </div>

                <p className="mt-3 text-center text-sm font-medium">
                  {movie.title} ({movie.release_date?.slice(0, 4)})
                </p>
              </Link>

              {/* Remove Movie Button */}
              <ConfirmDialog
                title="Remove movie?"
                description={`Remove ${movie.title} from your watchlist?`}
                confirmText="Remove"
                onConfirm={() => handleRemove(movie.id, movie.title)}
                trigger={
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                }
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
