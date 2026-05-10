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

type Props = {
  id: string;
  title: string;
  mediaType: "movie" | "tv";
};

export default function WatchlistBtn({ id, title, mediaType }: Props) {
  const [saved, setSaved] = useState(false);

  // Check if the item is already in the watchlist when the component mounts
  useEffect(() => {
    setSaved(isInWatchlist(id, mediaType));
  }, [id, mediaType]);

  // Handle adding/removing from watchlist
  const handleWatchlist = () => {
    if (saved) {
      removeFromWatchlist(id, mediaType);
      setSaved(false);
      toast.success(`${title} removed from watchlist`);
    } else {
      addToWatchlist({ id, title, mediaType });
      setSaved(true);
      toast.success(`${title} added to watchlist`);
    }
  };

  return (
    <Button
      onClick={handleWatchlist}
      className="rounded-full border border-white/20 bg-white/10 px-8 py-6 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
    >
      {saved ? (
        <FaBookmark className="h-4 w-4" />
      ) : (
        <FaRegBookmark className="h-4 w-4" />
      )}

      {saved ? "Added to Watchlist" : "Add to Watchlist"}
    </Button>
  );
}
