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
};

export default function MovieCard({ id, title, year, poster }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      href={`/movie/${id}`}
      className="group block overflow-hidden transition"
    >
      {/* Poster */}
      <div className="relative h-72 overflow-hidden rounded-xl">
        {/* Skeleton ONLY for image */}
        {!loaded && (
          <Skeleton className="absolute inset-0 h-full w-full rounded-xl" />
        )}

        <Image
          src={poster}
          alt={title || "Movie Poster"}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          onLoad={(e) => {
            if (e.currentTarget.complete) {
              setLoaded(true);
            }
          }}
          className={`rounded-xl object-cover transition duration-500 group-hover:scale-105 ${
            loaded ? "block" : "hidden"
          }`}
        />
      </div>

      {/* Content ALWAYS visible */}
      <div className="mt-3 text-center">
        <h3 className="line-clamp-1 text-sm font-medium">{title}</h3>

        <p className="mt-1 text-xs text-muted-foreground">{year}</p>
      </div>
    </Link>
  );
}
