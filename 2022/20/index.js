const _ = require("lodash");

module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.input = input.split("\n").map((value) => ({
      id: _.uniqueId(),
      value: parseInt(value, 10),
    }));
  }

  mixItem = (/** @type {{ id: string, value: number }[]} */ list, { id }) => {
    const index = list.findIndex((item) => item.id === id);
    const value = list[index].value;

    list.splice(index, 1);
    list.splice((index + value) % list.length, 0, { value, id });

    return list;
  };

  partOne = () => {
    const result = this.input.reduce(this.mixItem, [...this.input]);

    const zeroIndex = result.findIndex(({ value }) => value === 0);
    return (
      result[(zeroIndex + 1000) % result.length].value +
      result[(zeroIndex + 2000) % result.length].value +
      result[(zeroIndex + 3000) % result.length].value
    );
  };

  partTwo = () => {
    const multiplier = 811589153;
    const multipliedInput = this.input.map(({ value, ...rest }) => ({
      value: value * multiplier,
      ...rest,
    }));

    const result = new Array(10)
      .fill(undefined)
      .reduce(
        (input) => multipliedInput.reduce(this.mixItem, [...input]),
        [...multipliedInput]
      );

    const zeroIndex = result.findIndex(({ value }) => value === 0);
    return (
      result[(zeroIndex + 1000) % result.length].value +
      result[(zeroIndex + 2000) % result.length].value +
      result[(zeroIndex + 3000) % result.length].value
    );
  };
};
