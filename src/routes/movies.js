import express from "express";
import mongoose from "mongoose";
import Movie from "../models/movie.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json(movies);
});

router.post("/", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({ status: "Created", movie });
  } catch (ex) {
    if (ex instanceof mongoose.Error.ValidationError) {
      const errors = [];
      for (err in ex.errors) {
        const e = {
          path: err,
          message: ex.errors[err].message,
          error: ex.errors[err].name,
        };
        errors.push(e);
      }
      res.status(400).json({ status: "Bad Request", errors });
    } else {
      res.send(400).json({ status: "Bad Request", errors: ["Unknown Error"] });
    }
  }
});

export default router;
