import Movie from "../src/models/movie.js";
import fs from "fs";

const file = fs.readFileSync("./seeder/movies.json");
const fileContent = file.toString("utf8");

const movies = JSON.parse(fileContent);

export default async function (clear = false) {
  try {
    await Movie.deleteMany();
    console.log("\x1b[32mMovies cleared successfully\x1b[0m");
    if (!clear) {
      await Movie.create(movies);
      console.log(`\x1b[32m${movies.length} Movies seeded successfully\x1b[0m`);
    }
  } catch (err) {
    console.error(`\x1b[31m${err}\x1b[0m`);
    process.exit(1);
  }
}
