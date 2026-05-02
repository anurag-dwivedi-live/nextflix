"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import MovieCard from "@/components/MovieCard";
import MovieCardSkeleton from "@/components/CardSkeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { WATCHLIST_KEY } from "@/lib/config";

// Define the Movie type based on the expected API response
type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
};

export default function Watchlist() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // Load watchlist movies from localStorage and fetch their details from the API
  async function loadWatchlist() {
    setLoading(true);

    const ids: string[] = JSON.parse(
      localStorage.getItem(WATCHLIST_KEY) || "[]",
    );

    if (!ids.length) {
      setMovies([]);
      setLoading(false);
      return;
    }

    // Fetch movie details for each ID in parallel
    try {
      const results = await Promise.all(
        ids.map(async (id) => {
          const res = await fetch(`/api/movies?id=${id}`);

          if (!res.ok) {
            throw new Error(`Failed to fetch movie data for ID: ${id}`);
          }

          const data = await res.json();

          if (data.Error) {
            throw new Error(data.Error);
          }

          return data;
        }),
      );

      setMovies(results);
    } catch (error) {
      console.error("Failed to load watchlist:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWatchlist();
  }, []);

  // Clear the watchlist by removing the key from localStorage and updating state
  function clearAll() {
    localStorage.removeItem(WATCHLIST_KEY);
    setMovies([]);
  }

  // Render loading skeletons while fetching movie data
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
          <p className="mt-2 text-muted-foreground flex items-center">
            <Heart
              className="inline-block h-5 w-5 text-primary mr-2"
              fill="currentColor"
            />
            <span>{movies.length} saved movies</span>
          </p>
        </div>

        {movies.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Clear All</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear your watchlist?</AlertDialogTitle>

                <AlertDialogDescription>
                  This will remove all saved movies from your watchlist. This
                  action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction
                  onClick={clearAll}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      {/* Empty State */}
      {!movies.length ? (
        <div className="flex min-h-105 flex-col items-center justify-center rounded-3xl border bg-muted/30 text-center">
          <Heart className="mb-4 h-12 w-12 text-primary" fill="currentColor" />

          <h2 className="text-2xl font-semibold">No movies in watchlist</h2>

          <p className="mt-2 text-muted-foreground">
            Start adding movies you love.
          </p>

          <Link href="/" className="mt-6">
            <Button className="rounded px-4 py-5">
              <span>Browse Movies</span>
              <ArrowRightIcon className="inline-block h-5 w-5 text-foreground" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              id={movie.imdbID}
              title={movie.Title}
              year={movie.Year}
              poster={movie.Poster}
            />
          ))}
        </div>
      )}
    </section>
  );
}
