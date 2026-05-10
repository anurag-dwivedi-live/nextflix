import Image from "next/image";

type Props = {
  name: string;
  character: string;
  profilePath: string | null;
};

export default function CastCard({ name, character, profilePath }: Props) {
  return (
    <div className="group min-w-35 max-w-35">
      {/* Image */}
      <div className="relative aspect-2/3 overflow-hidden rounded-2xl bg-white/5">
        <Image
          src={
            profilePath
              ? `https://image.tmdb.org/t/p/w500${profilePath}`
              : "/no-poster.png"
          }
          alt={name}
          fill
          sizes="140px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="mt-3">
        <h3 className="line-clamp-1 font-medium text-white">{name}</h3>

        <p className="mt-1 line-clamp-1 text-sm text-white/50">{character}</p>
      </div>
    </div>
  );
}
