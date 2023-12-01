const _ = require("lodash");

const arrayWrap = (arr) => {
  return Array.isArray(arr) ? arr : [arr];
};

const compareToBoolean = (num) => {
  if (num === 0) return undefined;
  if (num < 0) return true;
  return false;
};

const deepClone = (val) => {
  return JSON.parse(JSON.stringify(val));
};
module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.input = _(input)
      .split("\n")
      .filter(Boolean)
      .map((line) => eval(line))
      .chunk(2)
      .value();
  }

  compare = (a, b, part2) => {
    if (!Array.isArray(a) && !Array.isArray(b))
      return part2 ? a - b : compareToBoolean(a - b);
    const [aArray, bArray] = [a, b].map(arrayWrap).map(deepClone);
    while (aArray.length && bArray.length) {
      const result = this.compare(aArray.shift(), bArray.shift(), part2);
      if (result !== undefined) return result;
    }
    if (aArray.length) return part2 ? 1 : false;
    if (bArray.length) return part2 ? -1 : true;
    return part2 ? 0 : undefined;
  };

  // compare = (firstValue, secondValue) => {
  //   // console.log(firstValue, secondValue);
  //   if (Array.isArray(firstValue) && Array.isArray(secondValue)) {
  //     if (secondValue.length === 0 && firstValue.length >= 0) {
  //       return false;
  //     }

  //     const length =
  //       firstValue.length >= secondValue.length
  //         ? firstValue.length
  //         : secondValue.length;

  //     for (let i = 0; i < length; i++) {
  //       const result = this.compare(firstValue[i], secondValue[i]);

  //       if (result !== undefined) {
  //         return result;
  //       }
  //     }

  //     return undefined;
  //   } else if (
  //     Array.isArray(firstValue) === false &&
  //     Array.isArray(secondValue)
  //   ) {
  //     return this.compare([firstValue], secondValue);
  //   } else if (
  //     Array.isArray(firstValue) &&
  //     Array.isArray(secondValue) === false
  //   ) {
  //     return this.compare(firstValue, [secondValue]);
  //   }

  //   if (firstValue >= 0 && secondValue >= 0) {
  //     return firstValue < secondValue
  //       ? true
  //       : firstValue > secondValue
  //       ? false
  //       : undefined;
  //   }

  //   if (secondValue >= 0 && firstValue === undefined) {
  //     return true;
  //   }

  //   return false;
  // };

  partOne = () => {
    return deepClone(this.input)
      .map(([a, b]) => this.compare(a, b))
      .reduce((acc, bool, i) => (bool ? acc + i + 1 : acc), 0);
    // const result = _.cloneDeep(this.input).map(([first, second]) => {
    //   return this.compare(first, second);
    // });
    // console.log(result);

    // let indexSum = 0;
    // for (let i = 0; i <= result.length; i++) {
    //   if (result[i] === true) {
    //     indexSum += i + 1;
    //   }
    // }

    // return indexSum;
  };

  partTwo = () => {};
};

// not 5660
// not 5383
// not 5047
// not 4876
