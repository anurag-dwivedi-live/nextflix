"use client";

import CinematicBanner from "./CinematicBanner";

export default function FeaturedBanner({ movie }: { movie: any }) {
  return <CinematicBanner movie={movie} badge="Featured" />;
}
