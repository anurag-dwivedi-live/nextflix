"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import MovieCardSkeleton from "./CardSkeleton";
import { Button } from "./ui/button";
import { FaArrowRight } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "./ui/pagination";
import Link from "next/link";

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
  title?: string;
  endpoint: string;
  showGenres?: boolean;
  vertical?: boolean;
  viewAllHref?: string;
  paginated?: boolean;
};

export default function CategorySection({
  title = "",
  endpoint,
  showGenres = true,
  vertical = false,
  viewAllHref,
  paginated = false,
}: Props) {
  const [activeGenre, setActiveGenre] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Fetch movies
  useEffect(() => {
    async function loadMovies() {
      setLoading(true);

      try {
        const baseUrl = activeGenre
          ? `${endpoint}&genre=${activeGenre}`
          : endpoint;

        const url = `${baseUrl}&page=${page}`;

        const res = await fetch(url);
        const data = await res.json();

        const results = data.results || [];

        setMovies(
          vertical
            ? results.slice(0, Math.floor(results.length / 6) * 6)
            : results,
        );

        // TMDb max supported page is 500
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [activeGenre, endpoint, vertical, page]);

  // Sync URL page
  useEffect(() => {
    const currentPage = Number(searchParams.get("page")) || 1;

    setPage(currentPage);
  }, [searchParams]);

  function handlePageChange(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(newPage));

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const mediaType = endpoint.includes("type=tv") ? "tv" : "movie";

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

        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="flex items-center text-sm text-gray-400 transition hover:text-white"
          >
            View All
            <FaArrowRight size={12} className="ml-1" />
          </Link>
        )}
      </div>

      {/* Movie Grid / Row */}
      <div
        className={
          vertical
            ? "grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
            : "flex gap-5 overflow-x-auto pb-4 hide-scrollbar"
        }
      >
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={vertical ? "" : "min-w-50"}>
                <MovieCardSkeleton />
              </div>
            ))
          : movies.map((movie) => (
              <div key={movie.id} className={vertical ? "" : "min-w-50"}>
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
                  mediaType={mediaType}
                />
              </div>
            ))}
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="mt-16 flex justify-center">
          <Pagination>
            <PaginationContent>
              {/* Previous */}
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={`${pathname}?page=${page - 1}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page - 1);
                    }}
                  />
                </PaginationItem>
              )}

              {/* First Page */}
              <PaginationItem>
                <PaginationLink
                  href={`${pathname}?page=1`}
                  isActive={page === 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(1);
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {/* Left Dots */}
              {page > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Current -1 */}
              {page > 2 && (
                <PaginationItem>
                  <PaginationLink
                    href={`${pathname}?page=${page - 1}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page - 1);
                    }}
                  >
                    {page - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Current */}
              {page !== 1 && page !== totalPages && (
                <PaginationItem>
                  <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>
              )}

              {/* Current +1 */}
              {page < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink
                    href={`${pathname}?page=${page + 1}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page + 1);
                    }}
                  >
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Right Dots */}
              {page < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {/* Last Page */}
              {totalPages > 1 && (
                <PaginationItem>
                  <PaginationLink
                    href={`${pathname}?page=${totalPages}`}
                    isActive={page === totalPages}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(totalPages);
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Next */}
              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href={`${pathname}?page=${page + 1}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page + 1);
                    }}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
}
