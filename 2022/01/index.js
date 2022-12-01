const fs = require("node:fs");
const path = require("node:path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf-8");

const sortedSums = input
  .split("\n")
  .map((value) => parseInt(value, 10))
  .reduce(
    (acc, value) => {
      if (Number.isNaN(value)) {
        return [...acc, 0];
      }
      return [...acc.slice(0, acc.length - 1), acc[acc.length - 1] + value];
    },
    [0]
  )
  .sort((a, b) => b - a);

console.log("Part 1:", sortedSums[0]);

const top3Combined = sortedSums
  .slice(0, 3)
  .reduce((acc = 0, value) => acc + value);

console.log("Part 2:", top3Combined);
