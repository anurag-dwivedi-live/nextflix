import { WATCHLIST_KEY } from "./config";

// This module manages the user's watchlist using localStorage. It provides functions to get the current watchlist, add an item to the watchlist, remove an item from the watchlist, and check if an item is in the watchlist.

export function getWatchlist() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(WATCHLIST_KEY) || "[]");
}

export function addToWatchlist(id: string) {
  const items = getWatchlist();

  if (!items.includes(id)) {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify([...items, id]));
  }
}

export function removeFromWatchlist(id: string) {
  const items = getWatchlist().filter((item: string) => item !== id);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(items));
}

export function isInWatchlist(id: string) {
  return getWatchlist().includes(id);
}
