import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "TV Shows", href: "/tv-shows" },
  { label: "Watchlist", href: "/watchlist" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-6 py-24 md:px-10 lg:px-16 bg-background/25 backdrop-blur-2xl">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-linear-to-t from-primary/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Huge Text */}
        <div className="max-w-4xl">
          <h2 className="text-5xl font-black uppercase leading-none tracking-tight md:text-7xl lg:text-8xl">
            Watch
            <br />
            Something
            <br />
            Incredible.
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Discover trending movies, iconic TV shows and build your personal
            cinematic universe with Nextflix.
          </p>
        </div>

        {/* Bottom Row */}
        <div className="mt-20 flex flex-col gap-10 border-t border-white/10 pt-10 md:flex-row md:items-end md:justify-between">
          {/* Navigation */}
          <div className="flex flex-wrap gap-6 text-sm md:text-base">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* GitHub */}
          <a
            href="https://github.com/anurag-dwivedi-live"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <FaGithub className="text-lg" />
            GitHub
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-xs text-muted-foreground">
          &copy; 2025 Nextflix
        </div>
      </div>

      <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 select-none overflow-hidden lg:block">
        <h1 className="text-[180px] font-black uppercase leading-none text-white/3">
          NEXTFLIX
        </h1>
      </div>
    </footer>
  );
}
