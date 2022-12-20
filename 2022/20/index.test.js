const { describe, it } = require("node:test");
const assert = require("node:assert");
const SolutionClass = require("./index.js");

const input = `1
2
-3
3
-2
0
4`;

describe("2022: Day 20", () => {
  const solution = new SolutionClass(input);

  it("passes first part", () => {
    assert.strictEqual(solution.partOne(), 3);
  });

  it("passes second part", () => {
    assert.strictEqual(solution.partTwo(), 1623178306);
  });
});
