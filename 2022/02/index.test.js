const { describe, it } = require("node:test");
const assert = require("node:assert");
const SolutionClass = require("./index.js");

const input = `A Y
B X
C Z`;

describe("2022: Day 1", () => {
  it("passes first part", () => {
    assert.strictEqual(new SolutionClass(input).partOne(), 15);
  });

  it("passes second part", () => {
    assert.strictEqual(new SolutionClass(input).partTwo(), 12);
  });
});
