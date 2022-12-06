module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.input = input.split("");
  }

  /**
   * @param {number} chunkSize
   */
  findUniqueChunk = (chunkSize) =>
    this.input.findIndex(
      (_, index, list) =>
        list
          .slice(index, index + chunkSize)
          .find((char, subIndex, subList) =>
            subList.slice(subIndex + 1).includes(char)
          ) === undefined
    ) + chunkSize;

  partOne() {
    return this.findUniqueChunk(4);
  }

  partTwo() {
    return this.findUniqueChunk(14);
  }
};
