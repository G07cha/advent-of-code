const _ = require("lodash");

module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    const extraRadius = 50;
    this.input = input
      .split("\n")
      .map((row) => [
        ...new Array(extraRadius).fill("."),
        ...row.split(""),
        ...new Array(extraRadius).fill("."),
      ]);
    this.input = [
      ...new Array(extraRadius)
        .fill(undefined)
        .map(() => new Array(this.input[0].length).fill(".")),
      ...this.input,
      ...new Array(extraRadius)
        .fill(undefined)
        .map(() => new Array(this.input[0].length).fill(".")),
    ];
  }

  getPossibleMoves = (
    /** @type {string[][]} */ board,
    /** @type {string[]} */ directionsPriority
  ) => {
    const isValidNeighbor = ([x, y]) =>
      x >= 0 && x < board.length && y >= 0 && y < board[0].length;
    const plannedMoves = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== "#") {
          continue;
        }

        const validNeighbors = [
          [i - 1, j - 1],
          [i - 1, j],
          [i - 1, j + 1],
          [i, j - 1],
          [i, j + 1],
          [i + 1, j - 1],
          [i + 1, j],
          [i + 1, j + 1],
        ].filter(isValidNeighbor);

        const hasElves = validNeighbors.some(([k, l]) => board[k][l] === "#");

        if (!hasElves) {
          continue;
        }

        const moveDirection = directionsPriority.find((direction) => {
          let coords;
          switch (direction) {
            case "N":
              coords = [
                [i - 1, j - 1],
                [i - 1, j],
                [i - 1, j + 1],
              ];
              break;
            case "S":
              coords = [
                [i + 1, j - 1],
                [i + 1, j],
                [i + 1, j + 1],
              ];
              break;
            case "W":
              coords = [
                [i + 1, j - 1],
                [i, j - 1],
                [i - 1, j - 1],
              ];
              break;
            case "E":
              coords = [
                [i + 1, j + 1],
                [i, j + 1],
                [i - 1, j + 1],
              ];
              break;
          }

          const validCoords = coords.filter(isValidNeighbor);

          return (
            validCoords.length > 0 &&
            validCoords.every(([x, y]) => board[x][y] === ".")
          );
        });

        if (moveDirection) {
          plannedMoves.push([
            [i, j],
            moveDirection === "N"
              ? [i - 1, j]
              : moveDirection === "S"
              ? [i + 1, j]
              : moveDirection === "W"
              ? [i, j - 1]
              : [i, j + 1],
          ]);
        }
      }
    }

    return plannedMoves.filter((move, index, list) =>
      list.every(
        (otherMove, otherIndex) =>
          index === otherIndex ||
          move[1][0] !== otherMove[1][0] ||
          move[1][1] !== otherMove[1][1]
      )
    );
  };

  partOne() {
    let directions = ["N", "S", "W", "E"];
    let currentBoard = _.cloneDeep(this.input);

    for (let round = 0; round < 10; round++) {
      const plannedMoves = this.getPossibleMoves(currentBoard, directions);

      plannedMoves.forEach(([from, to]) => {
        currentBoard[from[0]][from[1]] = ".";
        currentBoard[to[0]][to[1]] = "#";
      });
      const back = directions.shift();
      directions = [...directions, back];
    }

    const hasElf = (/** @type {string[]} */ row) => row.includes("#");
    const topMostIndex = currentBoard.findIndex(hasElf);
    const bottomMostIndex = _.findLastIndex(currentBoard, hasElf);
    const leftMostIndex = _.unzip(currentBoard).findIndex(hasElf);
    const rightMostIndex = _.findLastIndex(_.unzip(currentBoard), hasElf);

    let emptySpaces = 0;

    for (let i = topMostIndex; i <= bottomMostIndex; i++) {
      for (let j = leftMostIndex; j <= rightMostIndex; j++) {
        if (currentBoard[i][j] === ".") {
          emptySpaces++;
        }
      }
    }

    return emptySpaces;
  }

  partTwo() {
    let directions = ["N", "S", "W", "E"];
    let currentBoard = _.cloneDeep(this.input);
    let round = 0;
    let hasMoves = true;

    do {
      round++;

      const plannedMoves = this.getPossibleMoves(currentBoard, directions);

      plannedMoves.forEach(([from, to]) => {
        currentBoard[from[0]][from[1]] = ".";
        currentBoard[to[0]][to[1]] = "#";
      });
      hasMoves = plannedMoves.length > 0;
      const back = directions.shift();
      directions = [...directions, back];
    } while (hasMoves);

    return round;
  }
};
