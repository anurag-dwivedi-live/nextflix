import { NextResponse } from "next/server";
import { TMDB_API_KEY } from "@/lib/config";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const genre = searchParams.get("genre");
  const type = searchParams.get("type") || "movie";

  const url = genre
    ? `https://api.themoviedb.org/3/discover/${type}?api_key=${TMDB_API_KEY}&with_genres=${genre}`
    : `https://api.themoviedb.org/3/trending/${type}/week?api_key=${TMDB_API_KEY}`;

  const res = await fetch(url);

  const data = await res.json();

  return NextResponse.json(data);
}
