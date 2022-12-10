const _ = require("lodash");
module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.input = input
      .split("\n")
      .map((row) => row.split(" "))
      .map(([direction, steps]) => ({ direction, steps: parseInt(steps, 10) }));
  }

  partOne() {
    const { tailCoordinates } = this.input.reduce(
      (
        { headPosition, tailPosition, tailCoordinates },
        { direction, steps }
      ) => {
        let newHeadPosition = headPosition;
        switch (direction) {
          case "U":
            newHeadPosition = [headPosition[0], headPosition[1] + steps];
            break;
          case "D":
            newHeadPosition = [headPosition[0], headPosition[1] - steps];
            break;
          case "R":
            newHeadPosition = [headPosition[0] + steps, headPosition[1]];
            break;
          case "L":
            newHeadPosition = [headPosition[0] - steps, headPosition[1]];
            break;
        }

        let newTailPosition = tailPosition;
        let newTailCoordinates = [];
        while (
          Math.abs(newHeadPosition[0] - newTailPosition[0]) > 1 ||
          Math.abs(newHeadPosition[1] - newTailPosition[1]) > 1
        ) {
          if (
            newHeadPosition[0] > newTailPosition[0] &&
            newHeadPosition[1] === newTailPosition[1]
          ) {
            const newCoordinates = [newTailPosition[0] + 1, newTailPosition[1]];
            newTailPosition = newCoordinates;
            newTailCoordinates.push(newCoordinates);
          }

          if (
            newHeadPosition[0] < newTailPosition[0] &&
            newHeadPosition[1] === newTailPosition[1]
          ) {
            const newCoordinates = [newTailPosition[0] - 1, newTailPosition[1]];
            newTailPosition = newCoordinates;
            newTailCoordinates.push(newCoordinates);
          }

          if (
            newHeadPosition[1] > newTailPosition[1] &&
            newHeadPosition[0] === newTailPosition[0]
          ) {
            const newCoordinates = [newTailPosition[0], newTailPosition[1] + 1];
            newTailPosition = newCoordinates;
            newTailCoordinates.push(newCoordinates);
          }

          if (
            newHeadPosition[1] < newTailPosition[1] &&
            newHeadPosition[0] === newTailPosition[0]
          ) {
            const newCoordinates = [newTailPosition[0], newTailPosition[1] - 1];
            newTailPosition = newCoordinates;
            newTailCoordinates.push(newCoordinates);
          }

          if (
            newHeadPosition[1] > newTailPosition[1] &&
            newHeadPosition[0] > newTailPosition[0]
          ) {
            const newCoordinates = [
              newTailPosition[0] + 1,
              newTailPosition[1] + 1,
            ];
            newTailPosition = newCoordinates;
            newTailCoordinates.push(newCoordinates);
          }

          if (
            newHeadPosition[1] < newTailPosition[1] &&
            newHeadPosition[0] < newTailPosition[0]
          ) {
            const newCoordinates = [
              newTailPosition[0] - 1,
              newTailPosition[1] - 1,
            ];
            newTailPosition = newCoordinates;
            newTailCoordinates.push(newCoordinates);
          }

          if (
            newHeadPosition[1] < newTailPosition[1] &&
            newHeadPosition[0] > newTailPosition[0]
          ) {
            const newCoordinates = [
              newTailPosition[0] + 1,
              newTailPosition[1] - 1,
            ];
            newTailPosition = newCoordinates;
            newTailCoordinates.push(newCoordinates);
          }

          if (
            newHeadPosition[1] > newTailPosition[1] &&
            newHeadPosition[0] < newTailPosition[0]
          ) {
            const newCoordinates = [
              newTailPosition[0] - 1,
              newTailPosition[1] + 1,
            ];
            newTailPosition = newCoordinates;
            newTailCoordinates.push(newCoordinates);
          }
        }

        return {
          headPosition: newHeadPosition,
          tailPosition: newTailPosition,
          tailCoordinates: [...tailCoordinates, ...newTailCoordinates],
        };
      },
      {
        headPosition: [0, 0],
        tailPosition: [0, 0],
        tailCoordinates: [[0, 0]],
      }
    );

    return _.uniqWith(tailCoordinates, _.isEqual).length;
  }

  partTwo() {
    const { tailCoordinates } = this.input.reduce(
      ({ ropeParts, tailCoordinates }, { direction, steps }) => {
        let [headPosition, ...restRopeParts] = ropeParts;
        let newHeadPosition = headPosition;
        let newRestRopeParts = restRopeParts;
        let newTailCoordinates = [];

        for (let i = 0; i < steps; i++) {
          switch (direction) {
            case "U":
              newHeadPosition = [newHeadPosition[0], newHeadPosition[1] + 1];
              break;
            case "D":
              newHeadPosition = [newHeadPosition[0], newHeadPosition[1] - 1];
              break;
            case "R":
              newHeadPosition = [newHeadPosition[0] + 1, newHeadPosition[1]];
              break;
            case "L":
              newHeadPosition = [newHeadPosition[0] - 1, newHeadPosition[1]];
              break;
          }

          newRestRopeParts = newRestRopeParts.reduce(
            (oldRopeParts, partCoordinates, index) => {
              let newPartCoordinates = partCoordinates;
              const leadingPartCoordinates =
                index === 0 ? newHeadPosition : oldRopeParts[index - 1];

              while (
                Math.abs(leadingPartCoordinates[0] - newPartCoordinates[0]) >
                  1 ||
                Math.abs(leadingPartCoordinates[1] - newPartCoordinates[1]) > 1
              ) {
                if (
                  leadingPartCoordinates[0] > newPartCoordinates[0] &&
                  leadingPartCoordinates[1] === newPartCoordinates[1]
                ) {
                  newPartCoordinates = [
                    newPartCoordinates[0] + 1,
                    newPartCoordinates[1],
                  ];
                }

                if (
                  leadingPartCoordinates[0] < newPartCoordinates[0] &&
                  leadingPartCoordinates[1] === newPartCoordinates[1]
                ) {
                  newPartCoordinates = [
                    newPartCoordinates[0] - 1,
                    newPartCoordinates[1],
                  ];
                }

                if (
                  leadingPartCoordinates[1] > newPartCoordinates[1] &&
                  leadingPartCoordinates[0] === newPartCoordinates[0]
                ) {
                  newPartCoordinates = [
                    newPartCoordinates[0],
                    newPartCoordinates[1] + 1,
                  ];
                }

                if (
                  leadingPartCoordinates[1] < newPartCoordinates[1] &&
                  leadingPartCoordinates[0] === newPartCoordinates[0]
                ) {
                  newPartCoordinates = [
                    newPartCoordinates[0],
                    newPartCoordinates[1] - 1,
                  ];
                }

                if (
                  leadingPartCoordinates[1] > newPartCoordinates[1] &&
                  leadingPartCoordinates[0] > newPartCoordinates[0]
                ) {
                  newPartCoordinates = [
                    newPartCoordinates[0] + 1,
                    newPartCoordinates[1] + 1,
                  ];
                }

                if (
                  leadingPartCoordinates[1] < newPartCoordinates[1] &&
                  leadingPartCoordinates[0] < newPartCoordinates[0]
                ) {
                  newPartCoordinates = [
                    newPartCoordinates[0] - 1,
                    newPartCoordinates[1] - 1,
                  ];
                }

                if (
                  leadingPartCoordinates[1] < newPartCoordinates[1] &&
                  leadingPartCoordinates[0] > newPartCoordinates[0]
                ) {
                  newPartCoordinates = [
                    newPartCoordinates[0] + 1,
                    newPartCoordinates[1] - 1,
                  ];
                }

                if (
                  leadingPartCoordinates[1] > newPartCoordinates[1] &&
                  leadingPartCoordinates[0] < newPartCoordinates[0]
                ) {
                  newPartCoordinates = [
                    newPartCoordinates[0] - 1,
                    newPartCoordinates[1] + 1,
                  ];
                }

                if (index === 8) {
                  newTailCoordinates.push(newPartCoordinates);
                }
              }

              return [
                ...oldRopeParts.slice(0, index),
                newPartCoordinates,
                ...oldRopeParts.slice(index + 1),
              ];
            },
            restRopeParts
          );
        }

        return {
          ropeParts: [newHeadPosition, ...newRestRopeParts],
          tailCoordinates: [...tailCoordinates, ...newTailCoordinates],
        };
      },
      {
        ropeParts: new Array(10).fill([0, 0]),
        tailCoordinates: [[0, 0]],
      }
    );

    return _.uniqWith(tailCoordinates, _.isEqual).length;
  }
};
