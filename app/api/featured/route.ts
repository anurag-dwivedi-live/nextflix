import { NextResponse } from "next/server";
import { TMDB_API_KEY } from "@/lib/config";

export async function GET() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch featured movies" },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json({
      primary: data.results[0],
      secondary: data.results[1],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
