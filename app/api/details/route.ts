import { NextResponse } from "next/server";
import { TMDB_API_KEY } from "@/lib/config";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  const type = searchParams.get("type");

  if (!id || !type) {
    return NextResponse.json({ error: "Missing id or type" }, { status: 400 });
  }

  const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits,recommendations`;

  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json(data);
}
