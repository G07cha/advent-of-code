const { describe, it } = require("node:test");
const assert = require("node:assert");
const SolutionClass = require("./index.js");

const input = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;

describe("2022: Day 25", () => {
  const solution = new SolutionClass(input);

  it("passes first part", () => {
    assert.strictEqual(solution.partOne(), "2=-1=0");
  });

  it("passes second part", () => {
    assert.strictEqual(solution.partTwo(), undefined);
  });
});
