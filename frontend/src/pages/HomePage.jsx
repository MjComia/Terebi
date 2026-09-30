import { Navbar } from "../assets/generalAssets/navbar";
import { HeroBanner } from "../assets/homepage/HeroBanner";
import { MovieRow } from "../assets/homepage/MovieRow";
import { Footer } from "../assets/generalAssets/Footer";
import { useTrending } from "../hooks/useTmdb";

// Curated genres to display as category rows
const GENRES = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" },
  { id: 18, name: "Drama" },
  { id: 878, name: "Science Fiction" },
  { id: 10749, name: "Romance" },
  { id: 53, name: "Thriller" },
  { id: 16, name: "Animation" },
];

export function HomePage() {
  const { data: trendingData, loading: trendingLoading } = useTrending("day");
  const trendingMovies = trendingData?.results || [];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <HeroBanner />

      <div className="relative z-10 -mt-16">
        {/* Trending Now */}
        <MovieRow
          title="Trending Now"
          movies={trendingLoading ? null : trendingMovies}
          propLoading={trendingLoading}
        />

        {/* Genre category rows */}
        {GENRES.map((genre) => (
          <MovieRow key={genre.id} title={genre.name} genreId={genre.id} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
