"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toast } from "sonner";

import {
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
} from "@/lib/watchlist";

export default function WatchlistBtn(movie: { id: string; title: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isInWatchlist(movie.id));
  }, [movie.id]);

  const handleWatchlist = () => {
    if (saved) {
      removeFromWatchlist(movie.id);
      setSaved(false);

      toast.success(`${movie.title} removed from watchlist`);
    } else {
      addToWatchlist(movie.id);
      setSaved(true);

      toast.success(`${movie.title} added to watchlist`);
    }
  };

  return (
    <Button onClick={handleWatchlist} className="p-4">
      {saved ? (
        <FaBookmark className="h-4 w-4" />
      ) : (
        <FaRegBookmark className="h-4 w-4" />
      )}

      {saved ? "Added to Watchlist" : "Add to Watchlist"}
    </Button>
  );
}
