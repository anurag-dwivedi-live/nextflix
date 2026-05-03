import { WATCHLIST_KEY } from "./config";

function parseWatchlist(): string[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(WATCHLIST_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getWatchlist(): string[] {
  return parseWatchlist();
}

export function addToWatchlist(id: string) {
  const items = getWatchlist();

  if (!items.includes(id)) {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify([...items, id]));
  }
}

export function removeFromWatchlist(id: string) {
  const updated = getWatchlist().filter((item) => item !== id);

  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
}

export function clearWatchlist() {
  localStorage.removeItem(WATCHLIST_KEY);
}

export function isInWatchlist(id: string) {
  return getWatchlist().includes(id);
}
