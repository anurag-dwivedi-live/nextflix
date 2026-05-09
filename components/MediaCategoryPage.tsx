import CategorySection from "@/components/CategorySection";

type Props = {
  title: string;
  type: "movie" | "tv";
  category: string;
};

export default function MediaCategoryPage({ title, type, category }: Props) {
  return (
    <main className="pt-24">
      <div className="px-6 md:px-10 lg:px-16">
        <h1 className="pt-8 text-center text-5xl font-black tracking-tight">
          {title}
        </h1>
      </div>

      <CategorySection
        endpoint={`/api/category?type=${type}&category=${category}`}
        showGenres={false}
        vertical
        paginated
      />
    </main>
  );
}
