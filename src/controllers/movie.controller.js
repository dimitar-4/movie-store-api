import mongoose from "mongoose";
import Movie from "../models/movie.js";
import { Controller } from "./controller.js";
import express from "express";
import autoBind from "auto-bind";

export class MovieController extends Controller {
  constructor() {
    super();
    autoBind(this);
  }

  /**
   * @param {express.Request} req - request object
   * @param {express.Response} res - response object
   */
  // @desc   Get a movie by id
  // @route  GET /api/movies/:id
  // @access Public
  async getMovieById(req, res) {
    const movie = await this.getDocOr404(res, Movie, req.params.id);
    if (!movie) return;
    return this.ok(res, movie);
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
    this.ok(res, movies);
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
      delete req.body._id;
      delete req.body.__v;

      const movie = new Movie(req.body);

      await movie.save();
      return this.created(res, movie);
    } catch (ex) {
      if (ex instanceof mongoose.Error.ValidationError) {
        const errors = [];
        for (const err in ex.errors) errors.push(ex.errors[err].message);

        return this.badRequest(res, errors);
      } else {
        console.error(ex);
        return this.badRequest(res, ["Unknown Error"]);
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
  async updateOrCreateMovie(req, res) {
    const id = req.body._id;
    let movie = await this.getDoc(Movie, id);
    if (!movie) return this.createMovie(req, res);

    try {
      movie = Object.assign(movie, req.body);
      movie._id = id;
      const updatedMovie = await movie.save();
      return this.ok(res, updatedMovie);
    } catch (ex) {
      if (ex instanceof mongoose.Error.ValidationError) {
        const errors = [];
        for (const err in ex.errors) errors.push(ex.errors[err].message);

        return this.badRequest(res, errors);
      } else {
        console.error(ex);
        return this.badRequest(res, ["Unknown Error"]);
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
    const id = req.params.id;
    let movie = await this.getDoc(Movie, id);
    if (!movie) return this.createMovie(req, res);

    try {
      delete req.body._id;
      delete req.body.__v;

      movie = Object.assign(movie, req.body);
      const updatedMovie = await movie.save();
      return this.ok(res, updatedMovie);
    } catch (ex) {
      if (ex instanceof mongoose.Error.ValidationError) {
        const errors = [];
        for (const err in ex.errors) errors.push(ex.errors[err].message);

        return this.badRequest(res, errors);
      } else {
        console.error(ex);
        return this.badRequest(res, ["Unknown Error"]);
      }
    }
  }

  /**
   * @param {express.Request} req - request object
   * @param {express.Response} res - response object
   */
  // @desc   Get a movie by id
  // @route  GET /api/movies/:id
  // @access Public
  async deleteMovie(req, res) {
    const movie = await this.getDocOr404(res, Movie, req.params.id);
    if (!movie) return;

    await movie.remove();
    return this.noContent(res);
  }
}

/**
 * Import an instance of the MovieController class.
 */
export default new MovieController();
