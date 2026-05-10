import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  text?: string;
  href?: string;
};

export default function ExploreBtn({ text = "Explore", href = "/" }: Props) {
  return (
    <Link href={href}>
      <Button className="group rounded-full border border-white/20 bg-white/10 px-8 py-6 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
        {text}

        <span className="transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight />
        </span>
      </Button>
    </Link>
  );
}
