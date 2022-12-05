// Leaving initial solution for historical purposes, just to show how horrible it was. Hopefully it will never end up in arctic vault or something like that...

module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    const parsedInput = input.split("\n");
    const instructionsIndex = parsedInput.findIndex((line) =>
      line.startsWith("move")
    );
    this.startState = parsedInput
      .slice(0, instructionsIndex - 2)
      .map((line) => {
        let state = [];
        for (let i = 0; i < line.length; i += 4) {
          const cell = line.substring(i, i + 4);
          state.push(cell.charAt(1));
        }
        return state;
      })
      .reduce(
        (prev, next) => next.map((_, i) => (prev[i] || []).concat(next[i])),
        []
      );

    // amount - fromIndex - toIndex
    this.instructions = parsedInput
      .slice(instructionsIndex)
      .map((instruction) =>
        instruction
          .split(" ")
          .map((value) => parseInt(value, 10))
          .filter((value) => Number.isNaN(value) === false)
      );
  }

  partOne() {
    const result = this.instructions.reduce(
      (acc, instruction) => {
        const [amount, from, to] = instruction;
        const fromIndex = from - 1;
        const toIndex = to - 1;
        for (let i = 0; i < amount; i++) {
          const fromCrateIndex = acc[fromIndex].findIndex(
            (cell) => cell !== " "
          );
          const crate = acc[fromIndex][fromCrateIndex];
          acc[fromIndex][fromCrateIndex] = " ";
          const toCrateIndex = acc[toIndex].findIndex((cell) => cell !== " ");
          if (toCrateIndex === 0) {
            acc[toIndex].unshift(crate);
          } else if (toCrateIndex === -1) {
            acc[toIndex][acc[toIndex].length - 1] = crate;
          } else {
            acc[toIndex][toCrateIndex - 1] = crate;
          }
        }

        return acc;
      },
      this.startState.slice().map((row) => row.slice())
    );

    return result.map((column) => column.find((cell) => cell !== " ")).join("");
  }

  partTwo() {
    const result = this.instructions.reduce(
      (acc, instruction) => {
        const [amount, from, to] = instruction;
        const fromIndex = from - 1;
        const toIndex = to - 1;

        const crates = acc[fromIndex].splice(0, amount);

        acc[toIndex].unshift(...crates);

        return acc;
      },
      [
        ...this.startState.map((column) =>
          column.filter((cell) => cell !== " ")
        ),
      ]
    );

    return result.map((column) => column.find((cell) => cell !== " ")).join("");
  }
};
