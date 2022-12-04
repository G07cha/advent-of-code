module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.pairs = input
      .split("\n")
      .map((pair) =>
        pair
          .split(",")
          .map((shift) => shift.split("-").map((num) => parseInt(num, 10)))
      );
  }

  partOne() {
    return this.pairs.filter(
      ([firstAssignment, secondAssignment]) =>
        (firstAssignment[0] <= secondAssignment[0] &&
          firstAssignment[1] >= secondAssignment[1]) ||
        (secondAssignment[0] <= firstAssignment[0] &&
          secondAssignment[1] >= firstAssignment[1])
    ).length;
  }

  partTwo() {
    return this.pairs.filter(
      ([firstAssignment, secondAssignment]) =>
        (firstAssignment[0] <= secondAssignment[1] &&
          firstAssignment[1] >= secondAssignment[1]) ||
        (secondAssignment[0] <= firstAssignment[1] &&
          secondAssignment[1] >= firstAssignment[1])
    ).length;
  }
};
