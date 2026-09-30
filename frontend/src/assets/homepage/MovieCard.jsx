import { useState } from "react";
import { PlayIcon, PlusIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";

export function MovieCard({ movie }) {
  const [hovered, setHovered] = useState(false);

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : movie.first_air_date
    ? new Date(movie.first_air_date).getFullYear()
    : null;

  const title = movie.title || movie.name;
  const score = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  return (
    <div
      className="relative flex-shrink-0 w-40 cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Poster image */}
      <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-gray-900">
        {movie.poster_path ? (
          <img
            src={movie.poster_path}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <span className="text-gray-500 text-xs text-center px-2">{title}</span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-2 transition-opacity duration-200 rounded-lg ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
            <PlayIcon className="w-4 h-4 text-black ml-0.5" />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/20 border border-white/50 flex items-center justify-center hover:bg-white/30 transition-colors">
            <PlusIcon className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Card info */}
      <div className="mt-2 px-0.5">
        <p className="text-white text-sm font-medium truncate leading-tight">{title}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          {score && (
            <span className="flex items-center gap-0.5 text-yellow-400 text-xs">
              <StarIcon className="w-3 h-3" />
              {score}
            </span>
          )}
          {year && (
            <span className="text-gray-500 text-xs">• {year}</span>
          )}
        </div>
      </div>
    </div>
  );
}
