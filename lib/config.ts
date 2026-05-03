// This file is responsible for loading and validating environment variables for the application. It ensures that all required variables are present and provides a centralized place to access them throughout the codebase.

function required(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }

  return value;
}

export const TMDB_API_KEY = required(
  process.env.NEXT_PUBLIC_TMDB_API_KEY,
  "TMDB_API_KEY",
);

export const WATCHLIST_KEY = required(
  process.env.NEXT_PUBLIC_WATCHLIST_KEY,
  "WATCHLIST_KEY",
);
