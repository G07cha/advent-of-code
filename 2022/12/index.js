module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    const charCodeOffset = 97;
    const startCharCodeValue = "S".charCodeAt(0) - charCodeOffset;
    const endCharCodeValue = "E".charCodeAt(0) - charCodeOffset;
    this.input = input
      .split("\n")
      .map((line) =>
        line.split("").map((cell) => cell.charCodeAt(0) - charCodeOffset)
      );

    for (let i = 0; i < this.input.length; i++) {
      for (let j = 0; j < this.input[i].length; j++) {
        if (this.input[i][j] === startCharCodeValue) {
          this.start = [i, j];
          this.input[i][j] = "a".charCodeAt(0) - charCodeOffset;
        }
        if (this.input[i][j] === endCharCodeValue) {
          this.end = [i, j];
          this.input[i][j] = "z".charCodeAt(0) - charCodeOffset;
        }

        if (this.start && this.end) {
          break;
        }
      }
    }
  }

  findPath = (/** @type {number[]} */ from, /** @type {number[]} */ to) => {
    const getValidNeighbors = (/** @type {number[]} */ root) =>
      [
        [root[0] - 1, root[1]],
        [root[0], root[1] - 1],
        [root[0] + 1, root[1]],
        [root[0], root[1] + 1],
      ].filter(
        ([x, y]) =>
          x >= 0 &&
          x < this.input.length &&
          y >= 0 &&
          y < this.input[0].length &&
          this.input[x][y] <= this.input[root[0]][root[1]] + 1
      );

    const getPath = (traversalTree, to) => {
      const path = [];
      let parent = traversalTree[to];
      while (parent) {
        path.push(parent);
        parent = traversalTree[parent];
      }
      return path.reverse();
    };

    const traversalTree = [];
    const visited = new Set();
    const queue = [from];

    while (queue.length) {
      const subtreeRoot = queue.shift();
      if (visited.has(subtreeRoot.toString())) {
        continue;
      }
      visited.add(subtreeRoot.toString());

      if (subtreeRoot.toString() == to.toString()) {
        return getPath(traversalTree, to);
      }

      getValidNeighbors(subtreeRoot)
        .filter((child) => visited.has(child.toString()) === false)
        .forEach((child) => {
          traversalTree[child] = subtreeRoot;
          queue.push(child);
        });
    }
    return queue;
  };

  partOne = () => {
    return this.findPath(this.start, this.end).length;
  };

  partTwo = () => {
    const startingCoords = [];
    for (let i = 0; i < this.input.length; i++) {
      for (let j = 0; j < this.input[i].length; j++) {
        if (this.input[i][j] === 0) {
          startingCoords.push([i, j]);
        }
      }
    }

    return startingCoords
      .map((start) => this.findPath(start, this.end).length)
      .filter(Boolean) // Filter out unreachable paths
      .sort((a, b) => a - b)[0];
  };
};
