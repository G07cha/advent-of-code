const _ = require("lodash");

module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.input = input.split("\n").map((row) => row.split(""));
    this.blizzards = this.input.reduce(
      (acc, row, rowIndex) =>
        row.reduce(
          (rowAcc, cell, cellIndex) =>
            ["<", ">", "^", "v"].includes(cell)
              ? [...rowAcc, { x: rowIndex, y: cellIndex, direction: cell }]
              : rowAcc,
          acc
        ),
      []
    );
  }

  getValidNeighbors = (
    /** @type {number[]} */ root,
    /** @type {number[][]} */ obstacles = []
  ) =>
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
        this.input[x][y] !== "#" &&
        obstacles.some((obstacle) => obstacle[0] === x && obstacle[1] === y) ===
          false
    );

  findPath = (
    /** @type {number[]} */ from,
    /** @type {number[]} */ to,
    obstacles
  ) => {
    const getPath = (traversalTree, to) => {
      const path = [to];
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

      this.getValidNeighbors(subtreeRoot, obstacles)
        .filter((child) => visited.has(child.toString()) === false)
        .forEach((child) => {
          traversalTree[child] = subtreeRoot;
          queue.push(child);
        });
    }
    return queue;
  };

  partOne() {
    const start = [0, 1];
    const end = [this.input.length - 1, this.input[0].length - 2];
    let blizzards = _.cloneDeep(this.blizzards);
    let currentPosition = start;
    let steps = 0;

    do {
      steps++;
      blizzards = blizzards.map(({ x, y, direction }) => {
        let newCoordinates;
        switch (direction) {
          case ">":
            newCoordinates = this.input[x][y + 1] === "#" ? [x, 1] : [x, y + 1];
            break;
          case "<":
            newCoordinates =
              this.input[x][y - 1] === "#"
                ? [x, this.input[0].length - 2]
                : [x, y - 1];
            break;
          case "^":
            newCoordinates =
              this.input[x - 1][y] === "#"
                ? [this.input.length - 2, y]
                : [x - 1, y];
            break;
          case "v":
            newCoordinates = this.input[x + 1][y] === "#" ? [1, y] : [x + 1, y];
            break;
        }

        return { x: newCoordinates[0], y: newCoordinates[1], direction };
      });
      const blizzardCoords = blizzards.map(({ x, y }) => [x, y]);

      let lastPath;
      let obstacleCount = 0;
      do {
        obstacleCount++;
        lastPath = this.findPath(
          currentPosition,
          end,
          blizzardCoords.slice(0, obstacleCount)
        );
      } while (lastPath.length > 0 && obstacleCount < blizzardCoords.length);

      const path = this.findPath(
        currentPosition,
        end,
        blizzardCoords.slice(0, obstacleCount - 1)
      );
      const [, nextStep] = path;

      if (
        nextStep &&
        blizzardCoords.some(
          ([x, y]) => x === nextStep[0] && y === nextStep[1]
        ) === false
      ) {
        // console.log("step", steps, currentPosition, nextStep, blizzardCoords);
        currentPosition = nextStep;
      } else if (
        blizzardCoords.some(
          ([x, y]) => x === currentPosition[0] && y === currentPosition[1]
        )
      ) {
        const [alternativeStep] = this.getValidNeighbors(
          currentPosition,
          blizzardCoords
        );
        if (alternativeStep) {
          // console.log("step away", alternativeStep);
          currentPosition = alternativeStep;
        } else {
          throw new Error("ded");
        }
      } else {
        // console.log("step", steps, "wait");
      }
      console.log(steps);
    } while (currentPosition[0] !== end[0] || currentPosition[1] !== end[1]);

    return steps;
  }

  partTwo() {}
};
