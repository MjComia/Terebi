import { useState, useEffect } from "react";

const BACKEND_URL = "http://localhost:3000";

/**
 * Generic fetcher — calls your Express backend and returns { data, loading, error }
 */
function useFetch(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;
    setLoading(true);
    fetch(`${BACKEND_URL}${endpoint}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [endpoint]);

  return { data, loading, error };
}

/** GET /api/movies/trending?timeWindow=week (movies only) */
export function useTrending(timeWindow = "week", page = 1) {
  return useFetch(`/api/movies/trending?timeWindow=${timeWindow}&page=${page}`);
}

/** GET /api/movies/trending/all?timeWindow=week (movies + TV combined) */
export function useTrendingAll(timeWindow = "week", page = 1) {
  return useFetch(`/api/movies/trending/all?timeWindow=${timeWindow}&page=${page}`);
}

/** GET /api/movies/upcoming?page=1 (upcoming movies) */
export function useUpcoming(page = 1) {
  return useFetch(`/api/movies/upcoming?page=${page}`);
}

/** GET /api/tv/trending?timeWindow=week (TV only) */
export function useTrendingTV(timeWindow = "week", page = 1) {
  return useFetch(`/api/tv/trending?timeWindow=${timeWindow}&page=${page}`);
}

/** GET /api/tv/genres */
export function useTVGenres() {
  return useFetch("/api/tv/genres");
}

/** GET /api/tv/genre/:genreId */
export function useTVByGenre(genreId, page = 1) {
  return useFetch(genreId ? `/api/tv/genre/${genreId}?page=${page}` : null);
}

/** GET /api/movies/genres */
export function useGenres() {
  return useFetch("/api/movies/genres");
}

/** GET /api/movies/genre/:genreId */
export function useMoviesByGenre(genreId, page = 1) {
  return useFetch(genreId ? `/api/movies/genre/${genreId}?page=${page}` : null);
}
