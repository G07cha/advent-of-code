const _ = require("lodash");

module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.input = input
      .split("\n")
      .map((instruction) => instruction.split(" "))
      .map(([command, value]) =>
        value ? { command, value: parseInt(value, 10) } : { command }
      );
  }

  partOne = () => {
    const result = this.input.reduce(
      (cycles, { value }) => {
        const previousValue = cycles[cycles.length - 1];
        return [
          ...cycles,
          previousValue,
          ...(value ? [previousValue + value] : []),
        ];
      },
      [1]
    );

    let total = 0;
    for (let index = 19; index <= result.length; index += 40) {
      total += result[index] * (index + 1);
    }

    return total;
  };

  partTwo = () => {
    const screenWidth = 40;
    const isInSprite = (
      /** @type {number} */ spriteIndex,
      /** @type {number} */ cycle
    ) => (cycle >= spriteIndex - 1 && cycle <= spriteIndex + 1 ? true : false);

    const { result } = this.input.reduce(
      ({ spriteIndex, result }, { value }) => {
        const cycle = result.length % screenWidth;
        const newData = [isInSprite(spriteIndex, cycle) ? "#" : "."];

        if (value) {
          const nextCycle = (cycle + 1) % screenWidth;
          newData.push(isInSprite(spriteIndex, nextCycle) ? "#" : ".");
        }

        return {
          spriteIndex: value ? spriteIndex + value : spriteIndex,
          result: [...result, ...newData],
        };
      },
      { spriteIndex: 1, result: [] }
    );

    return _(result)
      .chunk(screenWidth)
      .map((line) => line.join(""))
      .unshift("")
      .join("\n");
  };
};
