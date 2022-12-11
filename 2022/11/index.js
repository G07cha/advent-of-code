const _ = require("lodash");

module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.input = _(input)
      .split("\n")
      .chunk(7)
      .map((chunk, index) => ({
        index,
        items: chunk[1]
          .split(": ")[1]
          .split(", ")
          .map((value) => parseInt(value, 10)),
        operation: chunk[2].split(": new = ")[1],
        testDivider: parseInt(chunk[3].split("divisible by ")[1], 10),
        trueMonkey: parseInt(chunk[4].charAt(chunk[4].length - 1), 10),
        falseMonkey: parseInt(chunk[5].charAt(chunk[5].length - 1), 10),
      }))
      .value();
  }

  playRounds = (
    /** @type {number} */ numRounds,
    /** @type {number} */ worryDivisor
  ) => {
    const inspectedItems = new Array(this.input.length).fill(0);
    const highestDivider = this.input.reduce(
      (acc, monkey) => (acc *= monkey.testDivider),
      1
    );
    let input = _.cloneDeep(this.input);
    const worryModifier = worryDivisor
      ? (/** @type {number} */ value) => Math.floor(value / worryDivisor)
      : (/** @type {number} */ value) => value % highestDivider;

    for (let round = 0; round < numRounds; round++) {
      input = input.reduce((list, monkey) => {
        monkey.items
          .map((item) =>
            eval(monkey.operation.replace(/old/gi, item.toString()))
          )
          .map(worryModifier)
          .forEach((item) =>
            list[
              item % monkey.testDivider === 0
                ? monkey.trueMonkey
                : monkey.falseMonkey
            ].items.push(item)
          );

        inspectedItems[monkey.index] += monkey.items.length;
        monkey.items = [];

        return list;
      }, input);
    }

    const [max1, max2] = inspectedItems.sort((a, b) => b - a);
    return max1 * max2;
  };

  partOne = () => {
    return this.playRounds(20, 3);
  };

  partTwo = () => {
    return this.playRounds(10_000);
  };
};
