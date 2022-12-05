const { describe, it } = require("node:test");
const assert = require("node:assert");
const SolutionClass = require("./index.js");

const input = `A Y
B X
C Z`;

describe("2022: Day 2", () => {
  const solution = new SolutionClass(input);

  it("passes first part", () => {
    assert.strictEqual(solution.partOne(), 15);
  });

  it("passes second part", () => {
    assert.strictEqual(solution.partTwo(), 12);
  });
});
