import { NextResponse } from "next/server";
import { TMDB_API_KEY } from "@/lib/config";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const genre = searchParams.get("genre");
  const type = searchParams.get("type") || "movie";
  const page = searchParams.get("page") || "1";

  // NEW
  const category = searchParams.get("category") || "trending";

  let url = "";

  // Genre based discover
  if (genre) {
    url = `https://api.themoviedb.org/3/discover/${type}?api_key=${TMDB_API_KEY}&with_genres=${genre}&page=${page}`;
  }

  // Trending
  else if (category === "trending") {
    url = `https://api.themoviedb.org/3/trending/${type}/week?api_key=${TMDB_API_KEY}&page=${page}`;
  }

  // Other TMDb categories
  else {
    url = `https://api.themoviedb.org/3/${type}/${category}?api_key=${TMDB_API_KEY}&page=${page}`;
  }

  const res = await fetch(url);

  const data = await res.json();

  return NextResponse.json(data);
}
