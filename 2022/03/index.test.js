const { describe, it } = require("node:test");
const assert = require("node:assert");
const SolutionClass = require("./index.js");

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

describe("2022: Day 3", () => {
  it("passes first part", () => {
    assert.strictEqual(new SolutionClass(input).partOne(), 157);
  });

  it("passes second part", () => {
    assert.strictEqual(new SolutionClass(input).partTwo(), 70);
  });
});
