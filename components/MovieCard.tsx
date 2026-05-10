"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  id: string;
  title: string;
  year: string;
  poster: string;
  mediaType?: "movie" | "tv";
};

export default function MovieCard({
  id,
  title,
  year,
  poster,
  mediaType = "movie",
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      href={`/${mediaType === "movie" ? "movies" : "tv-shows"}/details/${id}`}
      className="group block overflow-hidden transition"
    >
      <div className="relative h-72 overflow-hidden rounded-xl bg-muted">
        {/* Skeleton */}
        {!loaded && (
          <Skeleton className="absolute inset-0 z-10 h-full w-full" />
        )}

        <Image
          src={poster}
          alt={`Poster for ${title}`}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          onLoad={() => setLoaded(true)}
          className={`rounded-xl object-cover transition-all duration-500 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="mt-3 text-center">
        <h3 className="line-clamp-1 text-sm font-medium">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{year}</p>
      </div>
    </Link>
  );
}
