const { describe, it } = require("node:test");
const assert = require("node:assert");
const SolutionClass = require("./index.js");

const input = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;

describe("2022: Day 17", () => {
  const solution = new SolutionClass(input);

  it("passes first part", () => {
    assert.strictEqual(solution.partOne(), 3068);
  });

  it("passes second part", () => {
    assert.strictEqual(solution.partTwo(), 1514285714288);
  });
});
