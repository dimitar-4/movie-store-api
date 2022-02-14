import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    genres: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stars: {
      type: [String],
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    imdbRating: {
      type: Number,
      required: true,
    },
    imdbUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      get: (v) => (v / 100).toFixed(2),
      set: (v) => v * 100,
    },
    currency: {
      type: String,
      required: true,
      default: "SEK",
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { toJSON: { getters: true } }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
