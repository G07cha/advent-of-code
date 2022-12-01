const { describe, it } = require("node:test");
const assert = require("node:assert");
const SolutionClass = require("./index.js");

const input = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

describe("2022: Day 1", () => {
  it("passes first part", () => {
    assert.strictEqual(new SolutionClass(input).partOne(), 24000);
  });

  it("passes second part", () => {
    assert.strictEqual(new SolutionClass(input).partTwo(), 45000);
  });
});
