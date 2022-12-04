const { describe, it } = require("node:test");
const assert = require("node:assert");
const SolutionClass = require("./index.js");

const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

describe("2022: Day 4", () => {
  it("passes first part", () => {
    assert.strictEqual(new SolutionClass(input).partOne(), 2);
  });

  it("passes second part", () => {
    assert.strictEqual(new SolutionClass(input).partTwo(), 4);
  });
});
