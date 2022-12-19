const _ = require("lodash");

module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.input = input
      .split("\n")
      .map((row) => row.split(",").map((value) => parseInt(value, 10)));
    this.inputSet = new Set(this.input.map((row) => row.join(",")));
  }

  /**
   *
   * @param {number[]} coords
   * @returns {number[][]}
   */
  getNeighbors = (coords) => [
    [coords[0] - 1, coords[1], coords[2]],
    [coords[0] + 1, coords[1], coords[2]],
    [coords[0], coords[1] - 1, coords[2]],
    [coords[0], coords[1] + 1, coords[2]],
    [coords[0], coords[1], coords[2] - 1],
    [coords[0], coords[1], coords[2] + 1],
  ];

  matches =
    (/** @type {Set<string>} */ targetSet) =>
    (/** @type {number[]} */ coords) =>
      targetSet.has(coords.join(","));

  notMatches =
    (/** @type {Set<string>} */ targetSet) =>
    (/** @type {number[]} */ coords) =>
      targetSet.has(coords.join(",")) === false;

  partOne = () =>
    this.input.flatMap((coords) =>
      this.getNeighbors(coords).filter(this.notMatches(this.inputSet))
    ).length;

  partTwo = () => {
    const getMinMax = (index) => {
      const sorted = this.input.sort((a, b) => a[index] - b[index]);
      const min = sorted[0][index] - 1;
      const max = sorted[sorted.length - 1][index] + 1;
      return [min, max];
    };
    const [minX, maxX] = getMinMax(0);
    const [minY, maxY] = getMinMax(1);
    const [minZ, maxZ] = getMinMax(2);

    let outwardSides = 0;
    const queue = [[minX, minY, minZ]];
    const checkedCoords = new Set();

    do {
      const coords = queue.shift();
      checkedCoords.add(coords.join(","));
      const validNeighbors = this.getNeighbors(coords).filter(
        ([x, y, z]) =>
          _.inRange(x, minX, maxX) &&
          _.inRange(y, minY, maxY) &&
          _.inRange(z, minZ, maxZ) &&
          this.notMatches(checkedCoords)([x, y, z]) &&
          queue.every(
            (queueCoords) =>
              queueCoords[0] !== x ||
              queueCoords[1] !== y ||
              queueCoords[2] !== z
          )
      );

      const [empty, obsidian] = validNeighbors.reduce(
        ([empty, obsidian], neighbor) =>
          this.matches(this.inputSet)(neighbor)
            ? [empty, [...obsidian, neighbor]]
            : [[...empty, neighbor], obsidian],
        [[], []]
      );

      queue.push(...empty);
      outwardSides += obsidian.length;
    } while (queue.length);

    return outwardSides;
  };
};
