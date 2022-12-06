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
  findUniqueChunk(chunkSize) {
    return (
      this.input.findIndex(
        (_, index, list) =>
          list
            .slice(index, index + chunkSize)
            .filter(
              (char, subIndex, subList) =>
                subList.slice(subIndex + 1).includes(char) === false
            ).length === chunkSize
      ) + chunkSize
    );
  }

  partOne() {
    return this.findUniqueChunk(4);
  }

  partTwo() {
    return this.findUniqueChunk(14);
  }
};
