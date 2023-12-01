const _ = require("lodash");

module.exports = class Solution {
  shapes = {
    "-": ["  @@@@ ".split("")],
    "+": `   @   
  @@@  
   @   `
      .split("\n")
      .map((row) => row.split("")),
    L: `    @  
    @  
  @@@  `
      .split("\n")
      .map((row) => row.split("")),
    l: `  @    
  @    
  @    
  @    `
      .split("\n")
      .map((row) => row.split("")),
    b: `  @@   
  @@   `
      .split("\n")
      .map((row) => row.split("")),
  };
  /**
   * @param {string} input
   */
  constructor(input) {
    this.input = input.split("");
  }

  buildTower = (height) => {
    let chamber = [];

    const shapeKeys = Object.keys(this.shapes);

    let step = 0;
    for (let i = 0; i < height; i++) {
      const currentShape = shapeKeys[i % shapeKeys.length];
      const nonEmptyColumnIndex = chamber.findIndex((column) =>
        column.some((cell) => cell !== " ")
      );
      if (nonEmptyColumnIndex > -1) {
        chamber = chamber.slice(nonEmptyColumnIndex);
      }

      chamber = [
        ...this.shapes[currentShape],
        ...new Array(3).fill(undefined).map(() => new Array(7).fill(" ")),
        ...chamber,
      ];

      let isStopped = false;
      let shapeRow = 0;
      do {
        const direction = this.input[step % this.input.length] === ">" ? 1 : -1;
        step++;
        let newShape = _.cloneDeep(
          chamber.slice(shapeRow, shapeRow + this.shapes[currentShape].length)
        );
        for (let j = 0; j < newShape.length; j++) {
          for (
            let k = direction > 0 ? newShape[j].length - 1 : 0;
            direction > 0 ? k >= 0 : k < newShape[j].length;
            k += direction * -1
          ) {
            if (newShape[j][k] === "@") {
              if (newShape[j][k + direction] === " ") {
                newShape[j][k] = " ";
                newShape[j][k + direction] = "@";
              } else {
                newShape = null;
                break;
              }
            }
          }
          if (!newShape) {
            break;
          }
        }

        if (newShape) {
          chamber.splice(shapeRow, newShape.length, ...newShape);
        }

        let canFall = true;
        for (
          let j = shapeRow + this.shapes[currentShape].length;
          j >= shapeRow;
          j--
        ) {
          for (let k = 0; k < chamber[0].length; k++) {
            if (
              j >= chamber.length ||
              (chamber[j][k] === "@" && chamber[j + 1]?.[k] === "#")
            ) {
              canFall = false;
              break;
            }
          }
          if (canFall === false) {
            break;
          }
        }

        if (canFall) {
          for (
            let j = shapeRow + this.shapes[currentShape].length;
            j >= shapeRow;
            j--
          ) {
            for (let k = 0; k < chamber[0].length; k++) {
              if (chamber[j][k] === "@") {
                chamber[j][k] = " ";
                chamber[j + 1][k] = "@";
              }
            }
          }
          shapeRow++;
        } else {
          for (
            let j = shapeRow + this.shapes[currentShape].length - 1;
            j >= shapeRow;
            j--
          ) {
            for (let k = 0; k < chamber[0].length; k++) {
              if (chamber[j][k] === "@") {
                chamber[j][k] = "#";
              }
            }
          }

          isStopped = !canFall;
        }
      } while (isStopped === false);
    }

    // console.log(chamber.map((row) => `|${row.join("")}|`).join("\n"));
    return chamber;
  };

  partOne = () => {
    return this.buildTower(2022)
      .reverse()
      .findIndex((column) => column.every((cell) => cell === " "));
  };

  partTwo = () => {
    // unstable base = 12 elements: 25 height
    // repeating base = 35 elements: 53 height
    // total length = (number of elements - unstable base elements) / repeating base elements * repeating base height + unstable base height
    // total length = (2022 - 12) / 35 * 53 + 25

    // unstable base = 13 elements: 27 height
    // repeating base = 34 elements: 52 height
    // total length = (number of elements - unstable base elements) / repeating base elements * repeating base height + unstable base height
    // total length = (2022 - 13) / 34 * 52 + 27

    // unstable base = 82 elements: 140 height
    // repeating base = 1656 elements: 2759 height
    // total length = (number of elements - unstable base elements) / repeating base elements * repeating base height + unstable base height
    // total length = (1000000000000 - 82) / 1656 * 2759 + 140
    console.log("l", this.buildTower(36).length - 13);
    // 77
    // 130
    // 183
    const tower = this.buildTower(100).reverse().slice(27);
    // const tower = this.buildTower(6000).reverse().slice(140);
    for (let i = 10; i < 3000; i++) {
      let isEqual = true;
      for (let j = 0; j < i; j++) {
        for (let k = 0; k < tower[j].length; k++) {
          if (tower[j][k] !== tower[j + i][k]) {
            isEqual = false;
            break;
          }
        }
        if (isEqual === false) {
          break;
        }
      }

      if (isEqual) {
        console.log("equal at", i);
      }
    }

    return 1;
    // return (
    //   this.buildTower(1_000_000_000_000)
    //     .reverse()
    //     .findIndex((column) => column.every((cell) => cell === " "))
    // );
  };
};

// 1666062801932
// 1666062801933
