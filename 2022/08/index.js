module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.forest = input
      .split("\n")
      .map((row) => row.split("").map((cell) => parseInt(cell, 10)));
  }

  partOne() {
    let numVisibleTrees =
      (this.forest.length - 1 + this.forest[0].length - 1) * 2;

    for (let i = 1; i < this.forest.length - 1; i++) {
      for (let j = 1; j < this.forest[i].length - 1; j++) {
        let blockedEdges = 0;
        for (let k = 0; k < this.forest.length; k++) {
          if (k !== i) {
            if (this.forest[k][j] >= this.forest[i][j] && k < i) {
              blockedEdges++;
              k = i;
            } else if (this.forest[k][j] >= this.forest[i][j]) {
              blockedEdges++;
              break;
            }
          }
        }

        for (let l = 0; l < this.forest[i].length; l++) {
          if (l !== j) {
            if (this.forest[i][l] >= this.forest[i][j] && l < j) {
              blockedEdges++;
              l = j;
            } else if (this.forest[i][l] >= this.forest[i][j]) {
              blockedEdges++;
              break;
            }
          }
        }

        if (blockedEdges < 4) {
          numVisibleTrees++;
        }
      }
    }

    return numVisibleTrees;
  }

  partTwo() {
    const scores = [];
    for (let i = 0; i < this.forest.length; i++) {
      for (let j = 0; j < this.forest[i].length; j++) {
        const currentTree = this.forest[i][j];
        let scoreLeft = this.forest[i]
          .slice(0, j)
          .reverse()
          .findIndex((value) => value >= currentTree);
        if (scoreLeft === -1) {
          scoreLeft = j;
        } else {
          scoreLeft++;
        }

        let scoreRight = this.forest[i]
          .slice(j + 1)
          .findIndex((value) => value >= currentTree);
        if (scoreRight === -1) {
          scoreRight = this.forest[i].length - j - 1;
        } else {
          scoreRight++;
        }

        let scoreTop = 0;
        for (let k = i - 1; k >= 0; k--) {
          scoreTop++;
          if (this.forest[k][j] >= currentTree) {
            break;
          }
        }

        let scoreBottom = 0;
        for (let k = i + 1; k < this.forest.length; k++) {
          scoreBottom++;
          if (this.forest[k][j] >= currentTree) {
            break;
          }
        }

        scores.push(scoreLeft * scoreRight * scoreTop * scoreBottom);
      }
    }

    return scores.sort((a, b) => b - a)[0];
  }
};
