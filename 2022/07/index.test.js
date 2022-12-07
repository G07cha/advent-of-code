const { describe, it } = require("node:test");
const assert = require("node:assert");
const SolutionClass = require("./index.js");

const input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

describe("2022: Day 7", () => {
  const solution = new SolutionClass(input);

  it("passes first part", () => {
    assert.strictEqual(solution.partOne(), 95437);
  });

  it("passes second part", () => {
    assert.strictEqual(solution.partTwo(), 24933642);
  });
});
