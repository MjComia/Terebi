import express from "express";
import {
  getWatch,
  addWatch,
  deleteWatch,
  updateWatch,
} from "../controllers/watchListController.js";
const router = express.Router();

//Read the watchlist
router.get("/", getWatch);

router.put("/", addWatch);

router.delete("/:id", deleteWatch);

router.patch("/:id", updateWatch);
export default router;
