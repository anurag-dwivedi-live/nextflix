import { NextResponse } from "next/server";
import { TMDB_API_KEY } from "@/lib/config";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({
      results: [],
    });
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query,
      )}`,
      {
        next: {
          revalidate: 60,
        },
      },
    );

    const data = await res.json();

    // Only keep movie + tv
    const filtered = (data.results || []).filter(
      (item: any) => item.media_type === "movie" || item.media_type === "tv",
    );

    return NextResponse.json({
      results: filtered,
    });
  } catch {
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
