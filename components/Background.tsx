"use client";

import { useEffect, useState } from "react";

// Created by Google Gemini with Tailwind CSS and React
export default function CursorBackground() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Cursor Primary Glow */}
      <div
        className="absolute h-80 w-80 rounded-full bg-primary/20 blur-3xl transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${position.x - 160}px, ${position.y - 160}px)`,
        }}
      />

      {/* Cursor Secondary Glow */}
      <div
        className="absolute h-64 w-64 rounded-full bg-rose-500/10 blur-3xl transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${position.x - 120}px, ${position.y - 120}px)`,
        }}
      />

      {/* Permanent Purple Orb */}
      <div className="absolute left-[8%] top-[12%] h-72 w-72 animate-pulse rounded-full bg-violet-500/10 blur-3xl" />

      {/* Permanent Blue Orb */}
      <div className="absolute right-[10%] top-[18%] h-80 w-80 rounded-full bg-sky-500/10 blur-3xl animate-[float_12s_ease-in-out_infinite]" />

      {/* Permanent Amber Orb */}
      <div className="absolute bottom-[12%] left-[20%] h-72 w-72 rounded-full bg-amber-400/10 blur-3xl animate-[float_14s_ease-in-out_infinite]" />

      {/* Permanent Emerald Orb */}
      <div className="absolute bottom-[10%] right-[15%] h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl animate-[float_16s_ease-in-out_infinite]" />

      {/* Noise Light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_40%)]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/50" />

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          25% {
            transform: translate(30px, -20px) scale(1.05);
          }
          50% {
            transform: translate(-20px, 25px) scale(0.95);
          }
          75% {
            transform: translate(20px, 15px) scale(1.03);
          }
        }
      `}</style>
    </div>
  );
}
