module.exports = class Solution {
  lowercaseCharCodeOffset = "a".charCodeAt(0) - 1;
  uppercaseCharCodeOffset = "A".charCodeAt(0) - 27;

  /**
   * @param {string} input
   */
  constructor(input) {
    this.rucksacks = input.split("\n");
  }

  /**
   * @param {string} item
   */
  getItemPriority = (item) => {
    const charCode = item.charCodeAt(0);

    // Lowercase
    if (charCode > this.lowercaseCharCodeOffset) {
      return charCode - this.lowercaseCharCodeOffset;
    } else {
      // Uppercase
      return charCode - this.uppercaseCharCodeOffset;
    }
  };

  partOne() {
    return this.rucksacks
      .map((rucksack) => {
        const firstHalf = rucksack.slice(0, rucksack.length / 2);
        const secondHalf = rucksack.slice(rucksack.length / 2);

        return firstHalf.split("").find((item) => secondHalf.includes(item));
      })
      .filter(Boolean)
      .map(this.getItemPriority)
      .reduce((acc = 0, value) => acc + value);
  }

  partTwo() {
    const chunkSize = 3;
    let sum = 0;

    for (let index = 0; index < this.rucksacks.length; index += chunkSize) {
      const [firstRucksack, ...restOfGroup] = this.rucksacks.slice(
        index,
        index + chunkSize
      );

      const commonItem = firstRucksack
        .split("")
        .find(
          (item) =>
            restOfGroup.filter((rucksack) => rucksack.includes(item)).length ===
            restOfGroup.length
        );

      sum += this.getItemPriority(commonItem);
    }

    return sum;
  }
};
