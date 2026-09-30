import express from "express";
import {
  getTrendingTVHandler,
  getTVGenreList,
  getTVByGenre,
} from "../controllers/tvController.js";

const router = express.Router();

// GET /api/tv/trending?timeWindow=week
router.get("/trending", getTrendingTVHandler);

// GET /api/tv/genres
router.get("/genres", getTVGenreList);

// GET /api/tv/genre/18  (18 = Drama)
router.get("/genre/:genreId", getTVByGenre);

export default router;
