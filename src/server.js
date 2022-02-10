import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";
import accessKey from "./middleware/accessKey.middleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT_DIR = path.join(__dirname, "..");

const port = process.env.PORT || 3000;
const app = express();

const ACCESS_KEY = process.env.ACCESS_KEY;
if (!ACCESS_KEY) {
  throw new Error("ACCESS_KEY is not defined in the environment variables");
}

const swaggerDoc = JSON.parse(
  await readFile(new URL("../docs/swagger/openapi.json", import.meta.url))
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(accessKey(ACCESS_KEY));

app.use("/api/movies", routes.movies);
app.use("/api/orders", routes.orders);

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
