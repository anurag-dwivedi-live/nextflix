"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import useFullScreen from "@/hooks/useFullScreen";

type Props = {
  trailerKey: string;
  trailerName?: string;
  title: string;
};

export default function WatchTrailerBtn({
  trailerKey,
  trailerName,
  title,
}: Props) {
  const [open, setOpen] = useState(false);
  useFullScreen(open);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
      >
        <Play className="mr-2 h-4 w-4" />
        Watch Trailer
      </button>

      {/* Fullscreen Player */}
      {open && (
        <div className="fixed inset-0 z-9999 bg-black">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6 z-20 rounded-full bg-black/60 p-3 text-white backdrop-blur-md transition hover:bg-black/80"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Video */}
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&vq=hd1080&rel=0&modestbranding=1`}
            title={trailerName || `${title} Trailer`}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      )}
    </>
  );
}
