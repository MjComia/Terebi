import {
  getTrendingTV,
  getTVGenres,
  discoverTV,
} from "../services/tmdb.js";
import { enrichResults } from "./searchController.js";

/**
 * GET /api/tv/trending?timeWindow=week&page=1
 * Returns trending TV shows only.
 */
export const getTrendingTVHandler = async (req, res) => {
  const { timeWindow = "week", page = 1, language = "en-US" } = req.query;

  try {
    const data = await getTrendingTV({ timeWindow, page, language });
    data.results = enrichResults(data.results);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Trending TV error:", error.message);
    return res.status(500).json({ error: "Failed to fetch trending TV shows" });
  }
};

/**
 * GET /api/tv/genres
 * Returns the full list of TV genres.
 */
export const getTVGenreList = async (req, res) => {
  const { language = "en" } = req.query;

  try {
    const data = await getTVGenres({ language });
    return res.status(200).json(data);
  } catch (error) {
    console.error("TV genre list error:", error.message);
    return res.status(500).json({ error: "Failed to fetch TV genre list" });
  }
};

/**
 * GET /api/tv/genre/:genreId?page=1
 * Returns popular TV shows for a specific genre.
 */
export const getTVByGenre = async (req, res) => {
  const { genreId } = req.params;
  const { page = 1, language = "en-US" } = req.query;

  if (!genreId) {
    return res.status(400).json({ error: "Genre ID is required" });
  }

  try {
    const data = await discoverTV({
      with_genres: genreId,
      page,
      language,
    });
    data.results = enrichResults(data.results);
    return res.status(200).json(data);
  } catch (error) {
    console.error("TV by genre error:", error.message);
    return res.status(500).json({ error: "Failed to fetch TV shows by genre" });
  }
};
