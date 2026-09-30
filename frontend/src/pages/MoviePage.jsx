import { useState } from "react";
import { Navbar } from "../assets/generalAssets/navbar";
import { useMoviesByGenre, useTrending } from "../hooks/useTmdb";
import { Footer } from "../assets/generalAssets/Footer";
import { MovieCard } from "../assets/homepage/MovieCard";

const GENRES = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" },
  { id: 18, name: "Drama" },
  { id: 878, name: "Science Fiction" },
  { id: 10749, name: "Romance" },
  { id: 53, name: "Thriller" },
  { id: 16, name: "Animation" },
  { id: 12, name: "Adventure" },
  { id: 36, name: "History" },
  { id: 14, name: "Fantasy" },
  { id: 99, name: "Documentary" },
];

export function MoviePage() {
  const [genreId, setGenreId] = useState(null);

  const { data: trendingData, loading: trendingLoading } = useTrending("week");
  const { data: genreData, loading: genreLoading } = useMoviesByGenre(genreId);

  // No genre selected → show trending. Genre selected → show genre movies.
  const isLoading = genreId ? genreLoading : trendingLoading;
  const movies = genreId
    ? genreData?.results || []
    : trendingData?.results || [];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <div className="px-8 pt-28 w-full flex flex-col">
        <h1 className="text-3xl font-bold">Movies</h1>
        <ul className="flex flex-wrap gap-3 mt-4">
          {/* "All" tab to reset back to trending */}
          <li
            className={`px-3 py-1 text-sm font-semibold rounded-full border cursor-pointer transition-colors duration-200 ${
              !genreId
                ? "bg-white text-black border-white"
                : "bg-white/10 hover:bg-white/20 text-white border-white/20"
            }`}
            onClick={() => setGenreId(null)}
          >
            All
          </li>
          {GENRES.map((genre) => (
            <li
              key={genre.id}
              className={`px-3 py-1 text-sm font-semibold rounded-full border cursor-pointer transition-colors duration-200 ${
                genreId === genre.id
                  ? "bg-white text-black border-white"
                  : "bg-white/10 hover:bg-white/20 text-white border-white/20"
              }`}
              onClick={() => setGenreId(genre.id)}
            >
              {genre.name}
            </li>
          ))}
        </ul>
        <div className="w-full h-px bg-white/20 my-6" />
      </div>

      {/* Movie grid */}
      <div className="px-8 pb-12">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] rounded-lg bg-gray-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
