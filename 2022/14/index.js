const _ = require("lodash");

module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    const parsedInput = input
      .split("\n")
      .map((row) =>
        row
          .split(" -> ")
          .map((coords) => coords.split(",").map((val) => parseInt(val, 10)))
      );

    const sortedXCoords = parsedInput.flat().sort(([a], [b]) => a - b);
    const sortedYCoords = parsedInput.flat().sort(([, a], [, b]) => a - b);
    const startX = sortedXCoords[0][0];
    const endX = sortedXCoords[sortedXCoords.length - 1][0];
    const endY = sortedYCoords.reverse()[0][1];
    this.startCoords = [500 - startX, 0];
    this.map = new Array(endY + 1)
      .fill([])
      .map(() => new Array(endX - startX + 1).fill("."));

    parsedInput.forEach((coordsGroup) =>
      coordsGroup.forEach(([x, y], index) => {
        if (index > 0) {
          const [prevX, prevY] = coordsGroup[index - 1];
          for (let i = Math.min(prevY, y); i <= Math.max(prevY, y); i++) {
            for (let j = Math.min(prevX, x); j <= Math.max(prevX, x); j++) {
              this.map[i][j - startX] = "#";
            }
          }
        } else {
          this.map[y][x - startX] = "#";
        }
      })
    );
  }

  getSandCount = (
    /** @type {string[][]} */ initialMap,
    /** @type {number} */ startX
  ) => {
    const map = _.cloneDeep(initialMap);
    let count = 0;
    let isFull = false;
    do {
      const nonEmptyRow = map.findIndex((row) => row[startX] !== ".");

      if (nonEmptyRow <= 0) {
        isFull = true;
        break;
      }

      let landingY = nonEmptyRow;
      let landingX = startX;

      while (
        map[landingY][landingX - 1] === "." ||
        map[landingY][landingX + 1] === "." ||
        landingX === 0 ||
        landingX >= map[0].length
      ) {
        if (map[landingY][landingX - 1] === "." || landingX === 0) {
          landingX -= 1;
        } else if (
          map[landingY][landingX + 1] === "." ||
          landingX >= map[0].length
        ) {
          landingX += 1;
        }

        const baseLandingY = map
          .slice(landingY)
          .findIndex((row) => row[landingX] !== ".");

        if (baseLandingY === -1) {
          isFull = true;
          break;
        }

        landingY = baseLandingY + landingY;
      }

      if (
        isFull === false &&
        landingX >= 0 &&
        landingX < map[0].length &&
        landingY > 0 &&
        landingY < map.length
      ) {
        map[landingY - 1][landingX] = "o";
        count++;
      } else {
        isFull = true;
      }
    } while (isFull === false);

    return count;
  };

  partOne = () => {
    return this.getSandCount(this.map, this.startCoords[0]);
  };

  partTwo = () => {
    // Just picking wide enough offset so sand reaches top before it starts falling of the edges
    const horizontalOffset = 1000;
    const map = _.cloneDeep(this.map)
      .map((row) => [
        ...new Array(horizontalOffset).fill("."),
        ...row,
        ...new Array(horizontalOffset).fill("."),
      ])
      .concat([
        new Array(this.map.length + horizontalOffset * 2).fill("."),
        new Array(this.map.length + horizontalOffset * 2).fill("#"),
      ]);

    return this.getSandCount(map, this.startCoords[0] + horizontalOffset);
  };
};
