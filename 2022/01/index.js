module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.sortedNumbers = input
      .split("\n")
      .map((value) => parseInt(value, 10))
      .reduce(
        (acc, value) => {
          if (Number.isNaN(value)) {
            return [...acc, 0];
          }
          return [...acc.slice(0, acc.length - 1), acc[acc.length - 1] + value];
        },
        [0]
      )
      .sort((a, b) => b - a);
  }

  partOne() {
    return this.sortedNumbers[0];
  }

  partTwo() {
    return this.sortedNumbers
      .slice(0, 3)
      .reduce((acc = 0, value) => acc + value);
  }
};
