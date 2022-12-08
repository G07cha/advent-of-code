const { describe, it } = require("node:test");
const assert = require("node:assert");
const SolutionClass = require("./index.js");

const input = `30373
25512
65332
33549
35390`;

describe("2022: Day 8", () => {
  const solution = new SolutionClass(input);

  it("passes first part", () => {
    assert.strictEqual(solution.partOne(), 21);
  });

  it("passes second part", () => {
    assert.strictEqual(solution.partTwo(), 8);
  });
});
