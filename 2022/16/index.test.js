const { describe, it } = require("node:test");
const assert = require("node:assert");
const SolutionClass = require("./index.js");

const input = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`;

describe("2022: Day 16", () => {
  const solution = new SolutionClass(input);

  it("passes first part", () => {
    assert.strictEqual(solution.partOne(), 1651);
  });

  it("passes second part", () => {
    assert.strictEqual(solution.partTwo(), undefined);
  });
});
