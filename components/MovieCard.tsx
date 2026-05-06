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
      className="group overflow-hidden transition hover:shadow-xl hover:text-foreground/80"
    >
      <div className="relative h-72 overflow-hidden rounded-md">
        {!loaded && (
          <Skeleton className="absolute inset-0 h-full w-full rounded-md" />
        )}

        <Image
          src={poster}
          alt={title || "Movie Poster"}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          onLoad={() => setLoaded(true)}
          className={`rounded-md object-cover transition duration-500 group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="mt-3 text-center text-sm">
        {title} ({year})
      </div>
    </Link>
  );
}
