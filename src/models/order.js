import mongoose from "mongoose";
import Movie from "./movie.js";

const addressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: addressSchema,
  },
  { _id: false }
);

const movieSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Movie",
      validate: [
        {
          validator: async (id) => {
            try {
              const movie = await Movie.findById(id);
              const stock = movie?.stock ?? 0;
              if (stock <= 0) return false;
              return !!movie;
            } catch (error) {
              return false;
            }
          },
          message: "Movie not found",
        },
        {
          validator: async function (id) {
            try {
              const movie = await Movie.findById(id);
              const stock = movie?.stock ?? 0;
              if (stock < this.quantity) return false;
              return !!movie;
            } catch (error) {
              return false;
            }
          },
          message: "Out of stock",
        },
      ],
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    title: {
      type: String,
    },
    price: {
      type: Number,
      get: (v) => (v / 100).toFixed(2),
      set: (v) => v * 100,
    },
    currency: {
      type: String,
      default: "SEK",
    },
  },
  { toJSON: { getters: true }, _id: false }
);

movieSchema.pre("save", async function (next) {
  const movie = await Movie.findById(this.movieId);
  this.title = movie.title;
  this.price = movie.price;
  this.currency = movie.currency;

  movie.stock -= this.quantity;
  await movie.save();
  next();
});

const orderSchema = new mongoose.Schema({
  user: userSchema,
  movies: {
    type: [movieSchema],
    required: true,
    validate: {
      validator: (movies) => movies.length > 0,
      message: "Order must contain at least one movie",
    },
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
    immutable: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
