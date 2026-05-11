"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import MovieCard from "./MovieCard";
import { RiCommandLine } from "react-icons/ri";

type SearchResult = {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
};

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Debounced Search
  useEffect(() => {
    // Clear results if query is empty
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Reset selected index on new query
    setSelectedIndex(0);

    // Debounce API call by 400ms
    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/search?query=${encodeURIComponent(query)}`,
        );

        const data = await res.json();
        setResults(data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 400);

    // Cleanup timeout on query change
    return () => clearTimeout(timeout);
  }, [query]);

  // Keyboard Shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Check for Cmd+K or Ctrl+K
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";

      if (isCmdK) {
        e.preventDefault();
        setOpen(true);
      }
      // Close on Escape
      if (e.key === "Escape") {
        // Only close if dialog is open
        if (!open) return;
        setOpen(false);
        setQuery("");
        setResults([]);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus Input
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Load Recent Searches
  useEffect(() => {
    const stored = localStorage.getItem("recent-searches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Save Recent Search
  function saveRecentSearch(search: string) {
    if (!search.trim()) return;

    // Add new search to the front, remove duplicates, and limit to 5 items
    const updated = [
      search,
      ...recentSearches.filter((item) => item !== search),
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recent-searches", JSON.stringify(updated));
  }

  // Keyboard Navigation
  useEffect(() => {
    // Only navigate if dialog is open and there are results
    function handleNavigation(e: KeyboardEvent) {
      if (!open || results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === results.length - 1 ? 0 : prev + 1,
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? results.length - 1 : prev - 1,
        );
      }

      if (e.key === "Enter") {
        const selected = results[selectedIndex];
        if (!selected) return;

        router.push(
          `/${
            selected.media_type === "tv" ? "tv-shows" : "movies"
          }/details/${selected.id}`,
        );

        saveRecentSearch(query);
        setOpen(false);
        setQuery("");
        setResults([]);
      }
    }

    window.addEventListener("keydown", handleNavigation);

    return () => window.removeEventListener("keydown", handleNavigation);
  }, [open, results, selectedIndex, query, router, recentSearches]);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center text-white/70 transition hover:text-white md:gap-2 md:rounded-full md:border md:border-white/10 md:bg-white/5 md:px-4 md:py-2 md:text-sm md:backdrop-blur-md md:hover:bg-white/10"
      >
        <Search className="h-5 w-5 md:h-4 md:w-4" />
        <span className="hidden md:inline">Search movies, TV shows...</span>

        <kbd className="hidden items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/40 lg:inline-flex">
          <RiCommandLine className="text-sm" />K
        </kbd>
      </button>

      {/* Overlay */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-9999 overflow-y-auto bg-background/95 backdrop-blur-xl">
            {/* Header */}
            <div className="sticky top-0 z-10 mx-auto flex max-w-5xl items-center gap-4 border-b border-white/10 bg-background/95 px-6 py-6 backdrop-blur-xl md:px-10">
              <Search className="h-6 w-6 text-white/40" />

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies, TV shows..."
                className="flex-1 bg-transparent text-lg text-white outline-hidden placeholder:text-white/40 md:text-2xl"
              />

              <button
                onClick={() => {
                  saveRecentSearch(query);

                  setOpen(false);
                  setQuery("");
                  setResults([]);
                }}
                className="rounded-full p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
              {!query.trim() ? (
                <div className="flex h-[60vh] flex-col items-center justify-center text-center">
                  <Search className="h-16 w-16 text-white/10" />

                  <h2 className="mt-6 text-3xl font-bold">Search Nextflix</h2>

                  <p className="mt-3 max-w-md text-white/50">
                    Discover trending movies, TV shows and cinematic stories.
                  </p>

                  {recentSearches.length > 0 && (
                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                      {recentSearches.map((search) => (
                        <button
                          key={search}
                          onClick={() => setQuery(search)}
                          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : loading ? (
                <div className="py-20 text-center text-white/50">
                  Searching...
                </div>
              ) : results.length === 0 ? (
                <div className="py-20 text-center text-white/50">
                  No results found.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
                  {results.map((item, index) => (
                    <div
                      key={item.id}
                      className={`rounded-2xl transition ${
                        selectedIndex === index ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => {
                        saveRecentSearch(query);

                        setOpen(false);
                        setQuery("");
                        setResults([]);
                      }}
                    >
                      <MovieCard
                        id={String(item.id)}
                        title={item.title || item.name || "Untitled"}
                        year={
                          item.release_date?.slice(0, 4) ||
                          item.first_air_date?.slice(0, 4) ||
                          "N/A"
                        }
                        poster={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : "/no-poster.png"
                        }
                        mediaType={item.media_type}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
