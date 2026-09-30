import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { MovieCard } from "./MovieCard";
import { useMoviesByGenre } from "../../hooks/useTmdb";

/**
 * A horizontal scrollable row of movies.
 * If `movies` prop is provided, uses that directly.
 * If `genreId` prop is provided, fetches its own movies.
 */
export function MovieRow({ title, movies: propMovies, genreId, propLoading }) {
  const { data, loading: genreLoading } = useMoviesByGenre(genreId);

  // If movies prop is explicitly passed, use that. Otherwise use genre fetch data.
  const isLoading = propLoading || (genreId ? genreLoading : false);
  const movies = propMovies || data?.results || [];

  if (!isLoading && movies.length === 0) return null;

  return (
    <section className="px-8 py-6">
      {/* Row header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-bold tracking-tight">{title}</h2>
        <button className="flex items-center gap-0.5 text-gray-400 text-sm hover:text-white transition-colors group">
          View all
          <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Scrollable cards */}
      {isLoading ? (
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-40 aspect-[2/3] rounded-lg bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
