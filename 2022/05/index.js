const _ = require("lodash");

module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    const parsedInput = input.split("\n");
    const instructionsIndex = parsedInput.findIndex((line) =>
      line.startsWith("move")
    );
    this.startState = _(parsedInput)
      .slice(0, instructionsIndex - 2)
      .map((line) =>
        _(line)
          .split("")
          .chunk(4)
          .map((cell) => cell.at(1))
          .value()
      )
      .unzip()
      .map((column) => column.filter((cell) => cell !== " "))
      .value();

    this.instructions = parsedInput
      .slice(instructionsIndex)
      .map((instruction) => {
        const [amount, from, to] = _(instruction)
          .split(" ")
          .map(_.parseInt)
          .reject(_.isNaN)
          .value();

        return {
          amount,
          from: from - 1,
          to: to - 1,
        };
      });
  }

  partOne() {
    return _(this.instructions)
      .reduce((acc, instruction) => {
        const { amount, from, to } = instruction;

        const newFrom = _.drop(acc[from], amount);
        const newTo = _(acc[from])
          .take(amount)
          .reverse()
          .concat(acc[to])
          .value();

        const newAcc = _.clone(acc);
        newAcc.splice(from, 1, newFrom);
        newAcc.splice(to, 1, newTo);

        return newAcc;
      }, this.startState)
      .map(_.head)
      .join("");
  }

  partTwo() {
    return this.instructions
      .reduce((acc, instruction) => {
        const { amount, from, to } = instruction;

        const newFrom = _.drop(acc[from], amount);
        const newTo = _(acc[from]).take(amount).concat(acc[to]).value();
        acc[to].unshift(...acc[from].splice(0, amount));

        const newAcc = _.clone(acc);
        newAcc.splice(from, 1, newFrom);
        newAcc.splice(to, 1, newTo);

        return newAcc;
      }, this.startState)
      .map((column) => column[0])
      .join("");
  }
};
