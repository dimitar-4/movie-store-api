import mongoose from "mongoose";
import Movie from "../models/movie.js";
import { Controller } from "./controller.js";
import express from "express";

const ObjectId = mongoose.Types.ObjectId;

export class MovieController extends Controller {
  constructor() {
    super();
  }

  /**
   * @param {express.Request} req - request object
   * @param {express.Response} res - response object
   */
  // @desc   Get a movie by id
  // @route  GET /api/movies/:id
  // @access Public
  async getMovieById(req, res) {
    if (!ObjectId.isValid(req.params.id)) return super.notFound(res);
    const movie = await Movie.findById(req.params.id);
    if (!movie) return super.notFound(res);
    return super.ok(res, movie);
  }

  /**
   * @param {express.Request} req - request object
   * @param {express.Response} res - response object
   */
  // @desc   Get all movies
  // @route  GET /api/movies
  // @access Public
  async getMovies(req, res) {
    const movies = await Movie.find();
    super.ok(res, movies);
  }

  /**
   * @param {express.Request} req - request object
   * @param {express.Response} res - response object
   */
  // @desc   Create a movie
  // @route  POST /api/movies
  // @access Public
  async createMovie(req, res) {
    try {
      const movie = new Movie(req.body);
      await movie.save();
      return super.created(res, movie);
    } catch (ex) {
      if (ex instanceof mongoose.Error.ValidationError) {
        const errors = [];
        for (const err in ex.errors) errors.push(ex.errors[err].message);

        return super.badRequest(res, errors);
      } else {
        return super.badRequest(res, ["Unknown Error"]);
      }
    }
  }

  /**
   * @param {express.Request} req - request object
   * @param {express.Response} res - response object
   */
  // @desc   Update a movie
  // @route  PUT /api/movies/:id
  // @access Public
  async updateMovie(req, res) {
    return super.notImplemented(res);
  }
}

/**
 * Import an instance of the MovieController class.
 */
export default new MovieController();
