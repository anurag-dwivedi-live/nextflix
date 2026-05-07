import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <section className="flex h-screen items-center justify-center">
      <LoaderCircle className="h-10 w-10 animate-spin text-primary" />
    </section>
  );
}
