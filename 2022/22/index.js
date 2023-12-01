const _ = require("lodash");

module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.input = input.split("\n");
    this.password = this.input[this.input.length - 1]
      .split("")
      .reduce((acc, char) => {
        const lastGroup = acc[acc.length - 1];
        if (Number.isNaN(parseInt(char, 10))) {
          if (Number.isNaN(parseInt(lastGroup))) {
            return [...acc.slice(0, acc.length - 1), lastGroup + char];
          } else {
            return [...acc, char];
          }
        } else {
          if (Number.isNaN(parseInt(lastGroup))) {
            return [...acc, char];
          } else {
            return [...acc.slice(0, acc.length - 1), lastGroup + char];
          }
        }
      }, [])
      .map((group) =>
        Number.isNaN(parseInt(group)) ? group : parseInt(group)
      );

    const maxRowLength = this.input
      .slice(0, this.input.length - 2)
      .sort((a, b) => b.length - a.length)[0].length;
    this.input = this.input
      .slice(0, this.input.length - 2)
      .map((row) => row.padEnd(maxRowLength, " ").split(""));
  }

  partOne = () => {
    const startX = this.input[0].findIndex((char) => char === ".");
    const { position, direction } = this.password.reduce(
      ({ position, direction }, instruction) => {
        if (typeof instruction === "string") {
          const newDirection = (direction + (instruction === "R" ? 1 : -1)) % 4;
          return {
            position,
            direction: newDirection === -1 ? 3 : newDirection,
          };
        }

        let newPosition = position;
        for (let i = 0; i < instruction; i++) {
          switch (direction) {
            case 0:
              newPosition[1] += 1;
              if (
                newPosition[1] >= this.input[newPosition[0]].length ||
                this.input[newPosition[0]][newPosition[1]] === " "
              ) {
                const nonEmptyElementIndex = this.input[
                  newPosition[0]
                ].findIndex((char) => char !== " ");
                newPosition[1] =
                  this.input[newPosition[0]][nonEmptyElementIndex] === "."
                    ? nonEmptyElementIndex
                    : newPosition[1] - 1;
              } else if (this.input[newPosition[0]][newPosition[1]] === "#") {
                newPosition[1] -= 1;
              }
              break;
            case 1:
              newPosition[0] += 1;
              if (
                newPosition[0] >= this.input.length ||
                this.input[newPosition[0]][newPosition[1]] === " "
              ) {
                const nonEmptyElementIndex = this.input.findIndex(
                  (row) => row[newPosition[1]] !== " "
                );

                newPosition[0] =
                  this.input[nonEmptyElementIndex][newPosition[1]] === "."
                    ? nonEmptyElementIndex
                    : newPosition[0] - 1;
              } else if (this.input[newPosition[0]][newPosition[1]] === "#") {
                newPosition[0] -= 1;
              }
              break;
            case 2:
              newPosition[1] -= 1;
              if (
                newPosition[1] < 0 ||
                this.input[newPosition[0]][newPosition[1]] === " "
              ) {
                const nonEmptyElementIndex = _.findLastIndex(
                  this.input[newPosition[0]],
                  (char) => char !== " "
                );

                newPosition[1] =
                  this.input[newPosition[0]][nonEmptyElementIndex] === "."
                    ? nonEmptyElementIndex
                    : newPosition[1] + 1;
              } else if (this.input[newPosition[0]][newPosition[1]] === "#") {
                newPosition[1] += 1;
              }
              break;
            case 3:
              newPosition[0] -= 1;
              if (
                newPosition[0] < 0 ||
                this.input[newPosition[0]][newPosition[1]] === " "
              ) {
                const nonEmptyElementIndex = _.findLastIndex(
                  this.input,
                  (row) => row[newPosition[1]] !== " "
                );

                newPosition[0] =
                  this.input[nonEmptyElementIndex][newPosition[1]] === "."
                    ? nonEmptyElementIndex
                    : newPosition[0] + 1;
              } else if (this.input[newPosition[0]][newPosition[1]] === "#") {
                newPosition[0] += 1;
              }
              break;
            default:
              throw new Error(`Unknown direction: ${direction}`);
          }
        }

        return {
          direction,
          position: newPosition,
        };
      },
      {
        position: [0, startX],
        direction: 0,
      }
    );

    return 1000 * (position[0] + 1) + 4 * (position[1] + 1) + direction;
  };

  partTwo = () => {
    const startX = this.input[0].findIndex((char) => char === ".");
    const { position, direction } = this.password.reduce(
      ({ position, direction }, instruction) => {
        if (typeof instruction === "string") {
          const newDirection = (direction + (instruction === "R" ? 1 : -1)) % 4;
          return {
            position,
            direction: newDirection === -1 ? 3 : newDirection,
          };
        }

        let newPosition = position;
        for (let i = 0; i < instruction; i++) {
          switch (direction) {
            case 0:
              newPosition[1] += 1;
              if (
                newPosition[1] >= this.input[newPosition[0]].length ||
                this.input[newPosition[0]][newPosition[1]] === " "
              ) {
                const nonEmptyElementIndex = this.input[
                  newPosition[0]
                ].findIndex((char) => char !== " ");
                newPosition[1] =
                  this.input[newPosition[0]][nonEmptyElementIndex] === "."
                    ? nonEmptyElementIndex
                    : newPosition[1] - 1;
              } else if (this.input[newPosition[0]][newPosition[1]] === "#") {
                newPosition[1] -= 1;
              }
              break;
            case 1:
              newPosition[0] += 1;
              if (
                newPosition[0] >= this.input.length ||
                this.input[newPosition[0]][newPosition[1]] === " "
              ) {
                const nonEmptyElementIndex = this.input.findIndex(
                  (row) => row[newPosition[1]] !== " "
                );

                newPosition[0] =
                  this.input[nonEmptyElementIndex][newPosition[1]] === "."
                    ? nonEmptyElementIndex
                    : newPosition[0] - 1;
              } else if (this.input[newPosition[0]][newPosition[1]] === "#") {
                newPosition[0] -= 1;
              }
              break;
            case 2:
              newPosition[1] -= 1;
              if (
                newPosition[1] < 0 ||
                this.input[newPosition[0]][newPosition[1]] === " "
              ) {
                const nonEmptyElementIndex = _.findLastIndex(
                  this.input[newPosition[0]],
                  (char) => char !== " "
                );

                newPosition[1] =
                  this.input[newPosition[0]][nonEmptyElementIndex] === "."
                    ? nonEmptyElementIndex
                    : newPosition[1] + 1;
              } else if (this.input[newPosition[0]][newPosition[1]] === "#") {
                newPosition[1] += 1;
              }
              break;
            case 3:
              newPosition[0] -= 1;
              if (
                newPosition[0] < 0 ||
                this.input[newPosition[0]][newPosition[1]] === " "
              ) {
                const nonEmptyElementIndex = _.findLastIndex(
                  this.input,
                  (row) => row[newPosition[1]] !== " "
                );

                newPosition[0] =
                  this.input[nonEmptyElementIndex][newPosition[1]] === "."
                    ? nonEmptyElementIndex
                    : newPosition[0] + 1;
              } else if (this.input[newPosition[0]][newPosition[1]] === "#") {
                newPosition[0] += 1;
              }
              break;
            default:
              throw new Error(`Unknown direction: ${direction}`);
          }
        }

        return {
          direction,
          position: newPosition,
        };
      },
      {
        position: [0, startX],
        direction: 0,
      }
    );

    return 1000 * (position[0] + 1) + 4 * (position[1] + 1) + direction;
  };
};
