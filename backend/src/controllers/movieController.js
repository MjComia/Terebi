import {
  getTrendingMovies,
  getGenres,
  discoverMovies,
} from "../services/tmdb.js";
import { enrichResults } from "./searchController.js";

/**
 * GET /api/movies/trending?timeWindow=day&page=1
 * Returns trending movies for the hero banner and trending row.
 */
export const getTrending = async (req, res) => {
  const { timeWindow = "day", page = 1, language = "en-US" } = req.query;

  try {
    const data = await getTrendingMovies({ timeWindow, page, language });
    data.results = enrichResults(data.results);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Trending movies error:", error.message);
    return res.status(500).json({ error: "Failed to fetch trending movies" });
  }
};

/**
 * GET /api/movies/genres
 * Returns the full list of movie genres (Action, Comedy, Horror, etc.)
 */
export const getGenreList = async (req, res) => {
  const { language = "en" } = req.query;

  try {
    const data = await getGenres({ language });
    return res.status(200).json(data);
  } catch (error) {
    console.error("Genre list error:", error.message);
    return res.status(500).json({ error: "Failed to fetch genre list" });
  }
};

/**
 * GET /api/movies/genre/:genreId?page=1
 * Returns popular movies for a specific genre.
 * Note: genreId comes from req.params (URL path), not req.query.
 */
export const getMoviesByGenre = async (req, res) => {
  const { genreId } = req.params;
  const { page = 1, language = "en-US" } = req.query;

  if (!genreId) {
    return res.status(400).json({ error: "Genre ID is required" });
  }

  try {
    const data = await discoverMovies({
      with_genres: genreId,
      page,
      language,
    });
    data.results = enrichResults(data.results);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Movies by genre error:", error.message);
    return res.status(500).json({ error: "Failed to fetch movies by genre" });
  }
};
