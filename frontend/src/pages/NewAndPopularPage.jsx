import { useState, useMemo } from "react";
import { Navbar } from "../assets/generalAssets/navbar";
import { useTrendingAll, useUpcoming } from "../hooks/useTmdb";
import { Footer } from "../assets/generalAssets/Footer";
import { MovieCard } from "../assets/homepage/MovieCard";
import {
  StarIcon,
  FireIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";

const TABS = [
  { id: "trending", label: "Trending Now", icon: FireIcon },
  { id: "upcoming", label: "Coming Soon", icon: CalendarDaysIcon },
];

export function NewAndPopularPage() {
  const [activeTab, setActiveTab] = useState("trending");
  const [page, setPage] = useState(1);

  function handleTabChange(tabId) {
    if (tabId === activeTab) return;
    setActiveTab(tabId);
    setPage(1);
  }

  // Fetch trending (movies + series combined) or upcoming
  const { data: trendingData, loading: trendingLoading } = useTrendingAll(
    "week",
    page,
  );
  const { data: upcomingData, loading: upcomingLoading } = useUpcoming(page);

  const isLoading =
    activeTab === "trending" ? trendingLoading : upcomingLoading;
  const currentData = activeTab === "trending" ? trendingData : upcomingData;
  const rawItems = currentData?.results || [];
  const totalPages = currentData?.total_pages || 1;

  // Sort movies/series based on rating (vote_average descending)
  const sortedItems = useMemo(() => {
    return [...rawItems].sort(
      (a, b) => (b.vote_average || 0) - (a.vote_average || 0),
    );
  }, [rawItems]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="px-8 pt-28 w-full flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              New &amp; Popular
            </h1>
            <p className="text-gray-400 text-sm mt-1 flex items-center gap-1.5">
              <StarIcon className="w-4 h-4 text-yellow-400 inline" />
              Ranked by rating (highest to lowest)
            </p>
          </div>

          {/* Section Tabs: Trending Now & Coming Soon */}
          <div className="flex items-center gap-3">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-white text-black border-white shadow-lg"
                      : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-black" : "text-gray-300"
                    }`}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full h-px bg-white/20 my-6" />
      </div>

      {/* Content Grid */}
      <div className="px-8 pb-12">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] rounded-lg bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        ) : sortedItems.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No items available right now.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {sortedItems.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && sortedItems.length > 0 && (
        <div className="flex items-center justify-center gap-4 py-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-5 py-2 rounded-full text-sm font-semibold border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
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
            className="px-5 py-2 rounded-full text-sm font-semibold border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            Next →
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
