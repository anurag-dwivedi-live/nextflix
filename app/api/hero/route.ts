import { NextResponse } from "next/server";
import { TMDB_API_KEY } from "@/lib/config";

export async function GET() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch TMDB");
    }

    const data = await res.json();

    return NextResponse.json(data.results.slice(0, 4));
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load hero movies" },
      { status: 500 },
    );
  }
}
