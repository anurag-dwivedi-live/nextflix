import { OMDB_API_KEY } from "@/lib/config";
import { NextResponse } from "next/server";

// GET /api/movies?id=__
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing movie id" }, { status: 400 });
  }

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`,
  );

  const data = await res.json();

  return NextResponse.json(data);
}
