import HeroSection from "@/components/HeroSection";
import FeaturedBanner from "@/components/FeaturedBanner";
import { getBaseUrl } from "@/lib/constants";

export default async function Home() {
  const baseUrl = getBaseUrl();

  const res = await fetch(`${baseUrl}/api/featured`, {
    next: { revalidate: 3600 },
  });

  const data = await res.json();

  return (
    <main>
      <HeroSection />
      <FeaturedBanner movie={data.primary} />
      <FeaturedBanner movie={data.secondary} />
    </main>
  );
}
