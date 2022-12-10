const { describe, it } = require("node:test");
const assert = require("node:assert");
const SolutionClass = require("./index.js");

const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

describe("2022: Day 9", () => {
  const solution = new SolutionClass(input);

  it("passes first part", () => {
    assert.strictEqual(solution.partOne(), 13);
  });

  it("passes second part", () => {
    assert.strictEqual(
      new SolutionClass(`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`).partTwo(),
      36
    );
  });
});
