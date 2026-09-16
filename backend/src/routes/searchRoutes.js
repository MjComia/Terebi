import express from "express"
import { searchAll, searchMoviesHandler, searchTVHandler } from "../controllers/searchController.js"

const router = express.Router()

// GET /api/search?query=inception&page=1
router.get('/', searchAll)

// GET /api/search/movies?query=inception&year=2010
router.get('/movies', searchMoviesHandler)

// GET /api/search/tv?query=breaking+bad
router.get('/tv', searchTVHandler)

export default router
