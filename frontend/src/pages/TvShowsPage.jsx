import { useState } from "react";
import { Navbar } from "../assets/generalAssets/navbar";
import { useTVByGenre, useTrendingTV } from "../hooks/useTmdb";
import { Footer } from "../assets/generalAssets/Footer";
import { MovieCard } from "../assets/homepage/MovieCard";

const GENRES = [
  { id: 10759, name: "Action & Adventure" },
  { id: 10762, name: "Kids" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 80, name: "Crime" },
  { id: 10764, name: "Reality" },
  { id: 10751, name: "Family" },
  { id: 10767, name: "News" },
  { id: 10763, name: "Talk" },
  { id: 10768, name: "War & Politics" },
];

export function TvShowsPage() {
  const [genreId, setGenreId] = useState(null);
  const [page, setPage] = useState(1);

  // Reset to page 1 whenever genre changes
  function handleGenreChange(id) {
    setGenreId(id);
    setPage(1);
  }

  const { data: trendingData, loading: trendingLoading } = useTrendingTV(
    "week",
    page,
  );
  const { data: genreData, loading: genreLoading } = useTVByGenre(
    genreId,
    page,
  );

  // No genre selected → show trending. Genre selected → show genre tvShows.
  const isLoading = genreId ? genreLoading : trendingLoading;
  const currentData = genreId ? genreData : trendingData;
  const tvShows = currentData?.results || [];
  const totalPages = currentData?.total_pages || 1;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <div className="px-8 pt-28 w-full flex flex-col">
        <h1 className="text-3xl font-bold">TV Shows</h1>
        <ul className="flex flex-wrap gap-3 mt-4">
          {/* "All" tab to reset back to trending */}
          <li
            className={`px-3 py-1 text-sm font-semibold rounded-full border cursor-pointer transition-colors duration-200 ${
              !genreId
                ? "bg-white text-black border-white"
                : "bg-white/10 hover:bg-white/20 text-white border-white/20"
            }`}
            onClick={() => handleGenreChange(null)}
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
              onClick={() => handleGenreChange(genre.id)}
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
              <div
                key={i}
                className="aspect-[2/3] rounded-lg bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {tvShows.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && tvShows.length > 0 && (
        <div className="flex items-center justify-center gap-4 py-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-5 py-2 rounded-full text-sm font-semibold border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>

          <span className="text-gray-400 text-sm">
            Page <span className="text-white font-bold">{page}</span> of{" "}
            <span className="text-white font-bold">
              {Math.min(totalPages, 500)}
            </span>
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="px-5 py-2 rounded-full text-sm font-semibold border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
