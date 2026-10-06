import express from "express";
import {
  getTrending,
  getTrendingAllHandler,
  getGenreList,
  getMoviesByGenre,
  getUpcoming,
} from "../controllers/movieController.js";

const router = express.Router();

// GET /api/movies/trending?timeWindow=day&page=1  (movies only)
router.get("/trending", getTrending);

// GET /api/movies/trending/all?timeWindow=week  (movies + TV combined)
router.get("/trending/all", getTrendingAllHandler);

// GET /api/movies/upcoming?page=1  (upcoming movies / Coming Soon)
router.get("/upcoming", getUpcoming);

// GET /api/movies/genres
router.get("/genres", getGenreList);

// GET /api/movies/genre/28  (28 = Action)
router.get("/genre/:genreId", getMoviesByGenre);

export default router;
