const { describe, it } = require("node:test");
const assert = require("node:assert");
const SolutionClass = require("./index.js");

const input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

describe("2022: Day 6", () => {
  const solution = new SolutionClass(input);

  it("passes first part", () => {
    assert.strictEqual(solution.partOne(), 7);
  });

  it("passes second part", () => {
    assert.strictEqual(solution.partTwo(), 19);
  });
});
