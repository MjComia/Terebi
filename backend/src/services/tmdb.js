const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

/**
 * Makes an authenticated GET request to the TMDB API.
 * @param {string} endpoint - The API endpoint path (e.g., "/search/multi")
 * @param {object} params - Query parameters to include
 * @returns {Promise<object>} The JSON response from TMDB
 */
const tmdbFetch = async (endpoint, params = {}) => {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);

  // Append query params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.status_message || `TMDB API error: ${response.status}`,
    );
  }

  return response.json();
};

/**
 * Builds a full image URL from a TMDB relative path.
 * @param {string} path - The relative image path (e.g., "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg")
 * @param {string} size - The image size (e.g., "w500", "w780", "original")
 * @returns {string|null} The full image URL, or null if path is null
 */
export const buildImageUrl = (path, size = "w500") => {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

/**
 * Search for movies, TV shows, and people in a single request.
 */
export const searchMulti = async ({
  query,
  page = 1,
  language = "en-US",
  include_adult = true,
}) => {
  return tmdbFetch("/search/multi", { query, page, language, include_adult });
};

/**
 * Search for movies by their original, translated, and alternative titles.
 */
export const searchMovies = async ({
  query,
  page = 1,
  language = "en-US",
  include_adult = true,
  year,
  primary_release_year,
  region,
}) => {
  return tmdbFetch("/search/movie", {
    query,
    page,
    language,
    include_adult,
    year,
    primary_release_year,
    region,
  });
};

/**
 * Search for TV shows by their original, translated, and also known as names.
 */
export const searchTV = async ({
  query,
  page = 1,
  language = "en-US",
  include_adult = true,
  year,
  first_air_date_year,
}) => {
  return tmdbFetch("/search/tv", {
    query,
    page,
    language,
    include_adult,
    year,
    first_air_date_year,
  });
};
