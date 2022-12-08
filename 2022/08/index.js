/**
 * @param {any[]} array
 * @param {(value: any, index: number, obj: any[]) => unknown} comparator
 * @param {any} defaultValue
 */
function findIndexOr(array, comparator, defaultValue) {
  const index = array.findIndex(comparator);

  return index === -1 ? defaultValue : index;
}

module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.forest = input
      .split("\n")
      .map((row) => row.split("").map((cell) => parseInt(cell, 10)));
  }

  partOne = () =>
    this.forest.reduce(
      (acc, line, lineIndex) =>
        line.reduce((sum, currentTree, cellIndex) => {
          const leftEdgeBlocked = this.forest[lineIndex]
            .slice(0, cellIndex)
            .some((tree) => tree >= currentTree);

          const rightEdgeBlocked = this.forest[lineIndex]
            .slice(cellIndex + 1, this.forest[lineIndex].length)
            .some((tree) => tree >= currentTree);

          const bottomEdgeBlocked = this.forest
            .slice(lineIndex + 1)
            .some((row) => row[cellIndex] >= currentTree);

          const topEdgeBlocked = this.forest
            .slice(0, lineIndex)
            .some((row) => row[cellIndex] >= currentTree);

          if (
            leftEdgeBlocked &&
            rightEdgeBlocked &&
            bottomEdgeBlocked &&
            topEdgeBlocked
          ) {
            return sum;
          }

          return sum + 1;
        }, acc),
      0
    );

  partTwo = () =>
    this.forest
      .reduce(
        (acc, line, lineIndex) =>
          line.reduce((scores, currentTree, cellIndex) => {
            let scoreLeft = findIndexOr(
              this.forest[lineIndex].slice(0, cellIndex).reverse(),
              (value) => value >= currentTree,
              cellIndex - 1
            );

            let scoreRight = findIndexOr(
              this.forest[lineIndex].slice(
                cellIndex + 1,
                this.forest[lineIndex].length
              ),
              (value) => value >= currentTree,
              line.length - 1 - cellIndex - 1
            );

            let scoreBottom = findIndexOr(
              this.forest.slice(lineIndex + 1),
              (row) => row[cellIndex] >= currentTree,
              this.forest.length - 1 - lineIndex - 1
            );

            let scoreTop = findIndexOr(
              this.forest.slice(0, lineIndex).reverse(),
              (row) => row[cellIndex] >= currentTree,
              lineIndex - 1
            );

            return [
              ...scores,
              (scoreLeft + 1) *
                (scoreRight + 1) *
                (scoreBottom + 1) *
                (scoreTop + 1),
            ];
          }, acc),
        []
      )
      .sort((a, b) => b - a)[0];
};
