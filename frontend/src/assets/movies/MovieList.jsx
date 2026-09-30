import { useMoviesByGenre } from "../../hooks/useTmdb";
import { MovieCard } from "./MovieCard";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

export function MovieList({ genreId }) {
  const { data, loading } = useMoviesByGenre(genreId);
  const movies = data?.results || [];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-5 gap-6 px-8">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
