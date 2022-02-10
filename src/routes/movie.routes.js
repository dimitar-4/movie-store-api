import express from "express";
import controller from "../controllers/movie.controller.js";

const router = express.Router();

// /api/movies
router.get("/", controller.getMovies);
router.post("/", controller.createMovie);
router.put("/", controller.updateOrCreateMovie);

// /api/movies/:id
router.get("/:id", controller.getMovieById);
router.patch("/:id", controller.updateMovie);
router.delete("/:id", controller.deleteMovie);

export default router;
