import express from "express";
import controller from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/", controller.getMovies);
router.get("/:id", controller.getMovieById);
router.post("/", controller.createMovie);
router.put("/:id", controller.updateMovie);
router.delete("/:id", controller.deleteMovie);

export default router;
