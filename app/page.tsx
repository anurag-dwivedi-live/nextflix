import HeroSection from "@/components/HeroSection";
import FeaturedBanner from "@/components/FeaturedBanner";
import { getBaseUrl } from "@/lib/constants";
import CategorySection from "@/components/CategorySection";

export default async function Home() {
  const baseUrl = getBaseUrl();

  const res = await fetch(`${baseUrl}/api/featured`, {
    next: { revalidate: 3600 },
  });

  const data = await res.json();

  return (
    <main>
      <HeroSection />
      <CategorySection
        title="Movies"
        endpoint="/api/category?type=movie"
        showGenres={true}
      />
      <FeaturedBanner movie={data.primary} />
      <CategorySection
        title="TV Shows"
        endpoint="/api/category?type=tv"
        showGenres={false}
      />
      <FeaturedBanner movie={data.secondary} />
    </main>
  );
}
