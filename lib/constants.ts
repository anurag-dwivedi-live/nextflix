// This file contains constants and utility functions for the Nextflix application.
export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // client-side
    return "";
  }

  // server-side
  const host = process.env.VERCEL_URL || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";

  return `${protocol}://${host}`;
}
