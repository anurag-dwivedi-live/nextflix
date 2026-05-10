import { NextResponse } from "next/server";
import { TMDB_API_KEY } from "@/lib/config";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  const type = searchParams.get("type");

  if (!id || !type) {
    return NextResponse.json({ error: "Missing id or type" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=${TMDB_API_KEY}`,
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch providers" },
      { status: 500 },
    );
  }
}
