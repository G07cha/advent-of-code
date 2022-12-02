class CircularArray extends Array {
  /**
   * @param {number} index
   */
  atCircular(index) {
    return this.at(((index % this.length) + this.length) % this.length);
  }
}

module.exports = class Solution {
  opponentOffset = 64;
  playerOffset = 87;
  winBonus = 6;
  drawBonus = 3;
  loseBonus = 0;
  shapeScores = new CircularArray(1, 2, 3);
  /**
   * @param {string} input
   */
  constructor(input) {
    this.rounds = input.split("\n").map((round) => round.split(" "));
  }

  partOne() {
    return this.rounds
      .map(([opponentMove, playerMove]) => {
        const opponentScore = opponentMove.charCodeAt(0) - this.opponentOffset;
        const playerScore = playerMove.charCodeAt(0) - this.playerOffset;

        return (
          playerScore +
          (opponentScore === playerScore
            ? this.drawBonus
            : this.shapeScores.atCircular(opponentScore) === playerScore
            ? this.winBonus
            : this.loseBonus)
        );
      })
      .reduce((acc = 0, roundScore) => acc + roundScore);
  }

  partTwo() {
    return this.rounds
      .map(([opponentMove, outcome]) => {
        const opponentMoveIndex =
          opponentMove.charCodeAt(0) - this.opponentOffset - 1;

        switch (outcome) {
          case "X":
            return (
              this.shapeScores.atCircular(opponentMoveIndex + 2) +
              this.loseBonus
            );
          case "Y":
            return this.shapeScores[opponentMoveIndex] + this.drawBonus;
          case "Z":
            return (
              this.shapeScores.atCircular(opponentMoveIndex + 1) + this.winBonus
            );
        }
      })
      .reduce((acc = 0, roundScore) => acc + roundScore);
  }
};
