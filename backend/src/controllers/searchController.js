import { searchMulti, searchMovies, searchTV, buildImageUrl } from "../services/tmdb.js";

/**
 * Enriches TMDB results by converting relative image paths to full URLs.
 */
const enrichResults = (results) => {
    return results.map((item) => ({
        ...item,
        poster_path: buildImageUrl(item.poster_path, "w500"),
        backdrop_path: buildImageUrl(item.backdrop_path, "w780"),
    }));
};

/**
 * GET /api/search?query=...&page=...&language=...
 * Multi search — returns movies, TV shows, and people in one request.
 */
export const searchAll = async (req, res) => {
    const { query, page, language } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
    }

    try {
        const data = await searchMulti({ query, page, language });
        data.results = enrichResults(data.results);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Search multi error:", error.message);
        return res.status(500).json({ error: "Failed to search TMDB" });
    }
};

/**
 * GET /api/search/movies?query=...&page=...&year=...&primary_release_year=...&region=...
 * Search movies only.
 */
export const searchMoviesHandler = async (req, res) => {
    const { query, page, language, year, primary_release_year, region } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
    }

    try {
        const data = await searchMovies({ query, page, language, year, primary_release_year, region });
        data.results = enrichResults(data.results);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Search movies error:", error.message);
        return res.status(500).json({ error: "Failed to search movies" });
    }
};

/**
 * GET /api/search/tv?query=...&page=...&year=...&first_air_date_year=...
 * Search TV shows only.
 */
export const searchTVHandler = async (req, res) => {
    const { query, page, language, year, first_air_date_year } = req.query;

    if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
    }

    try {
        const data = await searchTV({ query, page, language, year, first_air_date_year });
        data.results = enrichResults(data.results);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Search TV error:", error.message);
        return res.status(500).json({ error: "Failed to search TV shows" });
    }
};
