const { describe, it } = require("node:test");
const assert = require("node:assert");
const SolutionClass = require("./index.js");

const input = `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`;

describe("2022: Day 22", () => {
  const solution = new SolutionClass(input);

  it("passes first part", () => {
    assert.strictEqual(solution.partOne(), 6032);
  });

  it("passes second part", () => {
    assert.strictEqual(solution.partTwo(), 5031);
  });
});
