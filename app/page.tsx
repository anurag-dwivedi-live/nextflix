import HeroSection from "@/components/HeroSection";
import FeaturedBanner from "@/components/FeaturedBanner";
import { getBaseUrl } from "@/lib/constants";
import CategorySection from "@/components/CategorySection";

export default async function Home() {
  const baseUrl = getBaseUrl();

  const featuredRes = await fetch(`${baseUrl}/api/featured`, {
    next: { revalidate: 3600 },
  });

  const heroRes = await fetch(`${baseUrl}/api/hero`, {
    next: { revalidate: 3600 },
  });

  const featuredData = await featuredRes.json();
  const heroMovies = await heroRes.json();

  return (
    <main>
      <HeroSection movies={heroMovies} />

      <CategorySection
        title="Movies"
        endpoint="/api/category?type=movie"
        showGenres
      />

      <FeaturedBanner movie={featuredData.primary} />

      <CategorySection
        title="TV Shows"
        endpoint="/api/category?type=tv"
        showGenres={false}
      />

      <FeaturedBanner movie={featuredData.secondary} />
    </main>
  );
}
