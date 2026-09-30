import { PlayIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import { useTrendingAll } from "../../hooks/useTmdb";

export function HeroBanner() {
  const { data, loading } = useTrendingAll("week");

  if (loading) {
    return (
      <div className="relative w-full h-[85vh] bg-gray-900 animate-pulse flex items-end pb-20 px-12">
        <div className="space-y-4 w-full max-w-lg">
          <div className="h-4 w-24 bg-gray-700 rounded" />
          <div className="h-12 w-80 bg-gray-700 rounded" />
          <div className="h-4 w-full bg-gray-700 rounded" />
          <div className="h-4 w-3/4 bg-gray-700 rounded" />
          <div className="flex gap-3 mt-6">
            <div className="h-10 w-32 bg-gray-700 rounded-full" />
            <div className="h-10 w-32 bg-gray-700 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  const movie = data?.results?.[0];
  if (!movie) return null;

  const title = movie.title || movie.name;
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : movie.first_air_date
      ? new Date(movie.first_air_date).getFullYear()
      : null;
  const score = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      {/* Backdrop image */}
      {movie.backdrop_path && (
        <img
          src={movie.backdrop_path}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-16 max-w-2xl">
        {/* FEATURED badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full  bg-red-500/10 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400 text-xs font-semibold tracking-widest uppercase">
            Featured
          </span>
        </div>

        {/* Title */}
        <h1 className="text-white text-5xl font-black leading-tight mb-3 drop-shadow-lg">
          {title}
        </h1>

        {/* Overview */}
        <p className="text-gray-300 text-base leading-relaxed mb-6 line-clamp-3 max-w-lg">
          {movie.overview}
        </p>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mb-6">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-full transition-colors duration-200 shadow-lg shadow-red-900/40">
            <PlayIcon className="w-5 h-5" />
            Play Now
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 backdrop-blur-sm transition-colors duration-200">
            <InformationCircleIcon className="w-5 h-5" />
            More Info
          </button>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-3 text-sm text-gray-400">
          {year && (
            <span className="px-2 py-0.5 border border-gray-600 rounded text-xs">
              {year}
            </span>
          )}
          {score && (
            <span className="flex items-center gap-1 text-yellow-400">
              <StarIcon className="w-4 h-4" />
              {score}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
