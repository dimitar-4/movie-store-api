import seedMovies from "./_seedMovies.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const MODE_REFRESH = "refresh";
const MODE_CLEAR = "clear";

run();

function run() {
  dotenv.config();

  const mode = getMode(process.argv.slice(2));
  console.log(
    `Mode: ${mode === MODE_CLEAR ? "\x1b[31m" : "\x1b[33m"}${mode}\x1b[0m`
  );
  console.log("\x1b[32mSeeding...\x1b[0m");

  mongoose.connect(process.env.MONGODB_URI, async (err) => {
    if (err) {
      console.error(`\x1b[31m${err}\x1b[0m`);
      process.exit(1);
    }
    await seedMovies(mode === MODE_CLEAR ? true : false);
    console.log("\x1b[32mSeeding complete\x1b[0m");
    process.exit(0);
  });
}

function printHelp() {
  console.log("");
  console.log(
    "Usage: node seed.js [ \x1b[33m--mode\x1b[0m <\x1b[32mmode\x1b[0m> ]"
  );
  console.log("");
  console.log("Modes:");
  console.log(
    "  \x1b[32mrefresh\x1b[0m -  Clear all data and creates new data.           \x1b[35m[default]\x1b[0m"
  );
  console.log(
    "  \x1b[32mclear\x1b[0m   -  Clear all data and do not create any new data."
  );
  console.log("");
}

function getMode(args) {
  if (args.length === 0) {
    return MODE_REFRESH;
  } else if (args.length === 2) {
    if (args[0] === "--mode") {
      switch (args[1]) {
        case MODE_CLEAR:
          return MODE_CLEAR;
        case MODE_REFRESH:
          return MODE_REFRESH;
        default:
          break;
      }
    }
    printHelp();
    process.exit(1);
  } else {
    printHelp();
    process.exit(1);
  }
}
