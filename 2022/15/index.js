const _ = require("lodash");

module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.input = input.split("\n").map((row) => {
      const xCoords = [];
      const yCoords = [];
      for (const match of row.matchAll(/x=-?\d+/g)) {
        xCoords.push(Number.parseInt(match[0].substring(2), 10));
      }

      for (let match of row.matchAll(/y=-?\d+/g)) {
        yCoords.push(Number.parseInt(match[0].substring(2), 10));
      }

      return {
        sensor: [xCoords[0], yCoords[0]],
        beacon: [xCoords[1], yCoords[1]],
      };
    });
  }

  partOne = () => {
    const targetY = 10;
    // Uncomment for solution
    // const targetY = 2_000_000;
    const withRadius = this.input.reduce(
      (acc, { sensor, beacon }) => [
        ...acc,
        {
          sensor,
          beacon,
          radius:
            Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]),
        },
      ],
      []
    );

    let coveredCells = 0;
    // Uncomment for solution
    // for (let x = -10000000; x <= 10000000; x++) {
    for (let x = -5; x <= 100; x++) {
      const isWithinSensorRadius = withRadius.some(
        ({ sensor, radius }) =>
          Math.abs(x - sensor[0]) + Math.abs(targetY - sensor[1]) <= radius
      );
      if (isWithinSensorRadius) {
        coveredCells++;
      }
    }

    return (
      coveredCells -
      _.uniqWith(
        withRadius.map(({ beacon }) => beacon),
        _.isEqual
      ).filter(([, beaconY]) => beaconY === targetY).length
    );
  };

  partTwo = () => {
    const multiplayer = 4_000_000;
    const minRange = 0;
    const maxRange = 20;
    // Uncomment for solution
    // const maxRange = 4_000_000;
    const withRadius = this.input.reduce(
      (acc, { sensor, beacon }) => [
        ...acc,
        {
          sensor,
          beacon,
          radius:
            Math.abs(sensor[0] - beacon[0]) + Math.abs(sensor[1] - beacon[1]),
        },
      ],
      []
    );

    for (let y = minRange; y <= maxRange; y++) {
      const intersectingRanges = withRadius
        .filter(
          ({ sensor: [, sensorY], radius }) =>
            sensorY + radius >= y || sensorY - radius <= y
        )
        .reduce((acc, { sensor: [sensorX, sensorY], radius }) => {
          const xRadius = radius - Math.abs(sensorY - y);
          const rangeStart = sensorX - xRadius;
          const rangeEnd = sensorX + xRadius;
          return rangeEnd >= rangeStart
            ? [...acc, [rangeStart, rangeEnd]]
            : acc;
        }, [])
        .sort((a, b) => a[0] - b[0])
        .reduce((acc, range, index) => {
          if (index === 0) {
            return [range];
          } else {
            const lastRange = acc.pop();
            // + 1 because they can be touching
            if (lastRange[1] + 1 >= range[0]) {
              return [...acc, [lastRange[0], Math.max(range[1], lastRange[1])]];
            }
            return [...acc, lastRange, range];
          }
        }, []);

      if (
        intersectingRanges.length > 1 ||
        intersectingRanges[0][0] > minRange ||
        intersectingRanges[0][1] < maxRange
      ) {
        return (intersectingRanges[0][1] + 1) * multiplayer + y;
      }
    }
  };
};
