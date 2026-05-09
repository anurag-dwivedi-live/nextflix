import CategorySection from "@/components/CategorySection";

type Section = {
  readonly title: string;
  readonly category: string;
};

type Props = {
  title: string;
  description: string;
  type: "movie" | "tv";
  sections: readonly Section[];
  basePath: string;
};

export default function MediaBrowsePage({
  title,
  description,
  type,
  sections,
  basePath,
}: Props) {
  return (
    <main className="pt-24">
      <div className="px-4 md:px-8">
        <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-6xl">
          {title}
        </h1>

        <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
      </div>

      {sections.map((section) => (
        <CategorySection
          key={section.category}
          title={section.title}
          endpoint={`/api/category?type=${type}&category=${section.category}`}
          viewAllHref={`${basePath}/${section.category}`}
          showGenres={false}
          vertical
        />
      ))}
    </main>
  );
}
