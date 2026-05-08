"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
const navItems = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "TV Shows", href: "/tv-shows" },
  { label: "Watchlist", href: "/watchlist" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  // Hide navbar on scroll down and show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // ignore tiny scrolls
      if (Math.abs(currentScrollY - lastScrollY.current) < 10) return;

      if (currentScrollY < 50) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } border-b border-white/10 bg-background/35 backdrop-blur-2xl`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Nextflix Logo"
            width={120}
            height={50}
            priority
            className="h-auto w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-all duration-300 ${
                    active
                      ? "text-primary"
                      : "text-foreground hover:text-foreground/75"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <a
          href="https://github.com/anurag-dwivedi-live"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 lg:flex"
        >
          <FaGithub className="mr-2 text-base" />
          GitHub
          <GoArrowUpRight className="ml-2 text-lg" />
        </a>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="border-l border-white/10 bg-background p-6"
          >
            <SheetHeader>
              <SheetTitle className="sr-only">
                Mobile Navigation Menu
              </SheetTitle>

              <SheetDescription className="sr-only">
                Browse pages like Home, Movies, TV Shows and Watchlist.
              </SheetDescription>
            </SheetHeader>

            <div className="mb-8">
              <Image
                src="/logo.png"
                alt="Nextflix Logo"
                width={120}
                height={45}
                className="w-auto"
              />
            </div>

            <div className="space-y-3">
              {navItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <SheetClose key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={`block rounded-md px-4 py-3 text-sm font-medium transition-all ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground/75 hover:bg-white/5 hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </div>

            <SheetClose asChild>
              <a
                href="https://github.com/anurag-dwivedi-live"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center rounded justify-center bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
              >
                <FaGithub className="mr-2" />
                GitHub
                <GoArrowUpRight className="ml-2 text-lg" />
              </a>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
