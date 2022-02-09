import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import movieRoutes from "./routes/movies.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT_DIR = path.join(__dirname, "..");

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/movies", movieRoutes);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "static", "index.html"))
);

try {
  const dbUri = process.env.MONGODB_URI || "";
  mongoose.connect(dbUri, (err) => {
    if (err) throw err;

    console.log("Connected to MongoDB");
  });

  app.listen(port, () => console.log(`Listening on port ${port}`));
} catch (error) {
  console.error(error);
  process.exit(1);
}
