module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.input = input.split("\n");
  }

  partOne() {
    const multipliers = new Array(20)
      .fill(undefined)
      .map((_val, index) => Math.pow(5, index));

    const sum = this.input.reduce(
      (acc, value) =>
        value
          .split("")
          .map((char) =>
            char === "=" ? -2 : char === "-" ? -1 : parseInt(char)
          )
          .reverse()
          .reduce(
            (subAcc, digit, index) => subAcc + digit * multipliers[index],
            acc
          ),
      0
    );

    const convertBack = (/** @type {number} */ value) => {
      if (value === 0) {
        return "";
      }

      switch (value % 5) {
        case 0:
          return convertBack(Math.floor(value / 5)) + "0";
        case 1:
          return convertBack(Math.floor(value / 5)) + "1";
        case 2:
          return convertBack(Math.floor(value / 5)) + "2";
        case 3:
          return convertBack(Math.floor((value + 2) / 5)) + "=";
        case 4:
          return convertBack(Math.floor((value + 1) / 5)) + "-";
        default:
          throw "uh oooh";
      }
    };

    return convertBack(sum);
  }

  partTwo() {}
};
