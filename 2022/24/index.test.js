const { describe, it } = require("node:test");
const assert = require("node:assert");
const SolutionClass = require("./index.js");

const input = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`;

describe("2022: Day 24", () => {
  const solution = new SolutionClass(input);

  it("passes first part", () => {
    assert.strictEqual(solution.partOne(), 18);
  });

  it("passes second part", () => {
    assert.strictEqual(solution.partTwo(), undefined);
  });
});
