const _ = require("lodash");

module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.input = input
      .split("\n")
      .map((row) => {
        const [valve, ...closeValves] = [...row.matchAll(/[A-Z]{2}/g)].map(
          (match) => match[0]
        );
        const flowRate = parseInt(row.match(/\d+/)[0]);

        return { valve, closeValves, flowRate };
      })
      .reduce((acc, { valve, ...rest }) => {
        return {
          ...acc,
          [valve]: {
            ...rest,
          },
        };
      }, {});
  }

  calculateCostBenefit = (branch, opened) => {
    if (!opened.includes(branch) && this.input[branch].flowRate > 0) {
      opened.push(branch);
    }

    return this.input[branch].closeValves
      .filter((valve) => opened.includes(valve) === false)
      .reduce(
        (acc, subBranch) => acc + this.calculateCostBenefit(subBranch, opened),
        this.input[branch].flowRate
      );
  };

  calculateDistance = (valveA, valveB, visited = []) => {
    if (this.input[valveA].closeValves.includes(valveB)) {
      return visited.length + 1;
    } else {
      return (
        this.input[valveA].closeValves
          .filter((valve) => visited.includes(valve) === false)
          .map((valve) =>
            this.calculateDistance(valve, valveB, [...visited, valveA])
          )
          .sort((valveA, valveB) => valveA - valveB)[0] ?? Infinity
      );
    }
  };

  partOne = () => {
    let valvesOfInterest = Object.keys(this.input).filter(
      (valve) => this.input[valve].flowRate > 0
    );
    const variations = [
      {
        origin: "AA",
        options: valvesOfInterest.reduce((acc, valve) => {
          const costBenefit =
            this.input[valve].flowRate - this.calculateDistance("AA", valve);
          return { ...acc, [valve]: costBenefit };
        }, {}),
      },
    ];
    for (let i = 0; i < valvesOfInterest.length; i++) {
      const origin = valvesOfInterest[i];
      let variation = {
        origin,
        options: valvesOfInterest.reduce((acc, valve) => {
          if (valve === origin) {
            return acc;
          }
          const costBenefit =
            this.input[valve].flowRate - this.calculateDistance("AA", valve);
          return { ...acc, [valve]: costBenefit };
        }, {}),
      };
      variations.push(variation);
    }
    console.log(JSON.stringify(variations, null, 2));

    let valvesToOpen = valvesOfInterest;
    let queue = ["AA"];
    do {
      const currentValve = queue[queue.length - 1];
      const bestOptions = valvesToOpen
        .map((valve) => [
          valve,
          this.input[valve].flowRate -
            this.calculateDistance(currentValve, valve),
        ])
        .sort((valveA, valveB) => valveB[1] - valveA[1])
        .filter(
          ([valve, benefit]) =>
            valvesToOpen
              .map(
                (originValve) =>
                  this.input[valve].flowRate -
                  this.calculateDistance(originValve, valve)
              )
              .find((b) => b > benefit) === undefined
        );
      // const currentValveIndex = variations.findIndex(
      //   ({ origin }) => origin === currentValve
      // );
      // const { options, origin } = variations[currentValveIndex];
      // const bestOptions = Object.entries(options)
      //   .filter(
      //     ([option, benefit]) =>
      //       openedValves.includes(option) === false &&
      //       variations.findIndex(
      //         (variant, index) =>
      //           variant.options[option] > benefit && index !== currentValveIndex
      //       ) === -1
      //   )
      //   .sort((optionA, optionB) => optionB[1] - optionA[1]);
      console.log(currentValve, bestOptions);
      const [bestOption] = bestOptions[0];
      valvesToOpen = valvesToOpen.filter((valve) => valve !== bestOption);
      queue.push(bestOption);
    } while (valvesToOpen.length !== 0);
    console.log(queue);
    let time = 30;
    // queue = ["AA", "DD", "BB", "JJ", "HH", "EE", "CC"];

    return queue.slice(1).reduce((acc, valve, index, list) => {
      time -=
        this.calculateDistance(index === 0 ? "AA" : list[index - 1], valve) + 1;
      return acc + this.input[valve].flowRate * time;
    }, 0);
  };

  partTwo = () => {};
};
