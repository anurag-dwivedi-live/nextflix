import { WATCHLIST_KEY } from "./config";

export type WatchlistItem = {
  id: string;
  title: string;
  mediaType: "movie" | "tv";
};

// Helper function to safely parse the watchlist from localStorage
function parseWatchlist(): WatchlistItem[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(WATCHLIST_KEY) || "[]");
  } catch {
    return [];
  }
}

// Public API for managing the watchlist
export function getWatchlist(): WatchlistItem[] {
  return parseWatchlist();
}

// Adds an item to the watchlist if it doesn't already exist
export function addToWatchlist(item: WatchlistItem) {
  const items = getWatchlist();

  const exists = items.some(
    (watchlistItem) =>
      watchlistItem.id === item.id &&
      watchlistItem.mediaType === item.mediaType,
  );

  if (!exists) {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify([...items, item]));
  }
}

// Removes an item from the watchlist based on its ID and media type
export function removeFromWatchlist(id: string, mediaType: "movie" | "tv") {
  const updated = getWatchlist().filter(
    (item) => !(item.id === id && item.mediaType === mediaType),
  );

  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
}

// Clears the entire watchlist from localStorage
export function clearWatchlist() {
  localStorage.removeItem(WATCHLIST_KEY);
}

// Checks if an item is already in the watchlist based on its ID and media type
export function isInWatchlist(id: string, mediaType: "movie" | "tv") {
  return getWatchlist().some(
    (item) => item.id === id && item.mediaType === mediaType,
  );
}
