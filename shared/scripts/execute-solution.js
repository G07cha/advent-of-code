const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert");

const INPUT_FILENAME = "input.txt";

const [, , solution] = process.argv;

assert.match(
  solution,
  /^\d{4}\/\d{2}$/,
  "Solution needs to be in format YYYY/DD"
);

const input = fs.readFileSync(
  path.join(process.cwd(), solution, INPUT_FILENAME),
  "utf-8"
);
const SolutionClass = require(path.join(process.cwd(), solution, "index.js"));

const solutionClass = new SolutionClass(input);

console.log("Part 1:", solutionClass.partOne());
console.log("Part 2:", solutionClass.partTwo());
