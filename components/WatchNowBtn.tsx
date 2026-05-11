"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ExternalLink, Play, X } from "lucide-react";
import useFullScreen from "@/hooks/useFullScreen";

type Provider = {
  provider_id: number;
  provider_name: string;
  logo_path: string;
};

type Props = {
  id: number;
  type: "movie" | "tv";
  title: string;
};

export default function WatchNowBtn({ id, type, title }: Props) {
  const [open, setOpen] = useState(false);
  useFullScreen(open);

  // Providers state
  const [providers, setProviders] = useState<{
    link?: string;
    flatrate?: Provider[];
    rent?: Provider[];
    buy?: Provider[];
  } | null>(null);

  // Fetch providers on mount or when id/type changes
  useEffect(() => {
    async function loadProviders() {
      try {
        const res = await fetch(`/api/providers?id=${id}&type=${type}`);
        const data = await res.json();
        setProviders(data.results?.US || null);
      } catch (error) {
        console.error(error);
      }
    }

    loadProviders();
  }, [id, type]);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
      >
        <Play className="mr-2 h-4 w-4" />
        Watch Now
      </button>

      {/* Fullscreen Sheet */}
      {open && (
        <div className="fixed inset-0 z-9999 overflow-y-auto bg-black/95 backdrop-blur-xl">
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            className="fixed right-6 top-6 z-20 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
            {/* Heading */}
            <h2 className="text-4xl font-black md:text-6xl">Where to Watch</h2>
            <p className="mt-4 text-lg text-white/60">
              Stream, rent or buy {title}
            </p>

            {!providers ? (
              <p className="mt-16 text-white/50">
                No streaming providers available.
              </p>
            ) : (
              <div className="mt-16 space-y-16">
                {providers.flatrate?.length ? (
                  <ProviderSection
                    title="Streaming"
                    items={providers.flatrate}
                    link={providers.link}
                  />
                ) : null}

                {providers.rent?.length ? (
                  <ProviderSection title="Rent" items={providers.rent} />
                ) : null}

                {providers.buy?.length ? (
                  <ProviderSection title="Buy" items={providers.buy} />
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Component for each provider section (Streaming, Rent, Buy)
function ProviderSection({
  title,
  items,
  link,
}: {
  title: string;
  items: Provider[];
  link?: string;
}) {
  return (
    <section>
      <h3 className="mb-6 text-2xl font-bold">{title}</h3>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((provider) => (
          <a
            key={provider.provider_id}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
          >
            {/* Logo */}
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={`https://image.tmdb.org/t/p/w300${provider.logo_path}`}
                alt={provider.provider_name}
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>

            {/* Name */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium">{provider.provider_name}</p>

              <ExternalLink className="h-4 w-4 text-white/40 transition group-hover:text-white" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
