import express from "express";
import {
  getTrending,
  getTrendingAllHandler,
  getGenreList,
  getMoviesByGenre,
} from "../controllers/movieController.js";

const router = express.Router();

// GET /api/movies/trending?timeWindow=day&page=1  (movies only)
router.get("/trending", getTrending);

// GET /api/movies/trending/all?timeWindow=week  (movies + TV combined)
router.get("/trending/all", getTrendingAllHandler);

// GET /api/movies/genres
router.get("/genres", getGenreList);

// GET /api/movies/genre/28  (28 = Action)
router.get("/genre/:genreId", getMoviesByGenre);

export default router;
