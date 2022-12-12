const { describe, it } = require("node:test");
const assert = require("node:assert");
const SolutionClass = require("./index.js");

const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

describe("2022: Day 12", () => {
  const solution = new SolutionClass(input);

  it("passes first part", () => {
    assert.strictEqual(solution.partOne(), 31);
  });

  it("passes second part", () => {
    assert.strictEqual(solution.partTwo(), 29);
  });
});
