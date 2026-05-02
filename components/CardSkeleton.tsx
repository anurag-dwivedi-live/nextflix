import { Skeleton } from "@/components/ui/skeleton";

export default function MovieCardSkeleton() {
  return (
    <div className="overflow-hidden backdrop-blur-md animate-pulse">
      <Skeleton className="h-72 w-full" />

      <div className="space-y-3 mt-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
