"use client";

import { useEffect, useState } from "react";
import { Heart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import MovieCardSkeleton from "@/components/CardSkeleton";
import ConfirmDialog from "@/components/ConfirmDialog";
import ExploreBtn from "@/components/ExploreBtn";
import MovieCard from "@/components/MovieCard";

import {
  getWatchlist,
  removeFromWatchlist,
  clearWatchlist,
} from "@/lib/watchlist";
import { toast } from "sonner";

// Define the shape of media items in the watchlist
type WatchlistMedia = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  mediaType: "movie" | "tv";
};

export default function Watchlist() {
  const [movies, setMovies] = useState<WatchlistMedia[]>([]);
  const [loading, setLoading] = useState(true);

  // Load watchlist items from localStorage and fetch their details from the API
  async function loadWatchlist() {
    setLoading(true);
    const items = getWatchlist();
    if (!items.length) {
      setMovies([]);
      setLoading(false);
      return;
    }

    try {
      const results = await Promise.all(
        items.map(async (item) => {
          const res = await fetch(
            `/api/details?id=${item.id}&type=${item.mediaType}`,
          );

          if (!res.ok) throw new Error("Failed");
          const data = await res.json();
          return {
            ...data,
            mediaType: item.mediaType,
          };
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
  function handleRemove(id: number, title: string, mediaType: "movie" | "tv") {
    removeFromWatchlist(String(id), mediaType);
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
            {movies.length} saved content
          </p>
        </div>

        {/* Clear All Button */}
        {movies.length > 0 && (
          <ConfirmDialog
            title="Clear your watchlist?"
            description="This will remove all saved content permanently."
            confirmText="Clear All"
            onConfirm={clearAll}
            trigger={<Button variant="destructive">Clear All</Button>}
          />
        )}
      </div>

      {!movies.length ? (
        <div className="flex min-h-105 flex-col items-center justify-center rounded-3xl border bg-muted/30 text-center">
          <Heart className="mb-4 h-12 w-12 text-primary" fill="currentColor" />
          <h2 className="text-2xl font-semibold">Your watchlist is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Save movies and TV shows to watch later.
          </p>

          <div className="mt-6">
            <ExploreBtn text="Browse Titles" href="/" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {movies.map((movie) => (
            <div key={movie.id}>
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
                mediaType={movie.mediaType}
              />

              <ConfirmDialog
                title="Remove from watchlist?"
                description={`Remove ${
                  movie.title || movie.name
                } from your watchlist?`}
                confirmText="Remove"
                onConfirm={() =>
                  handleRemove(
                    movie.id,
                    movie.title || movie.name || "Untitled",
                    movie.mediaType,
                  )
                }
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
