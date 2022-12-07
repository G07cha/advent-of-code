const _ = require("lodash");

function flattenObject(ob) {
  var toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == "object" && ob[i] !== null) {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.fileTree = input.split("\n").reduce(
      (state, line) => {
        if (line.startsWith("$ ")) {
          if (line.startsWith("$ cd")) {
            const [, directory] = line.split("$ cd ");

            if (directory === "..") {
              return {
                ...state,
                currentPath: state.currentPath.slice(
                  0,
                  state.currentPath.length - 1
                ),
              };
            } else {
              return {
                ...state,
                currentPath: [...state.currentPath, directory],
              };
            }
          } else {
            // Ignore `ls` command
            return state;
          }
        } else {
          const [size, filename] = line.split(" ");
          const parsedSize = parseInt(size, 10);

          if (Number.isNaN(parsedSize)) {
            // Directory
            return {
              ...state,
              tree: _.set(state.tree, state.currentPath, {
                ...(_.get(state.tree, state.currentPath) || {}),
                [filename]: {
                  sum: 0,
                },
              }),
            };
          } else {
            for (let index = 1; index <= state.currentPath.length; index++) {
              const currentValue = _.get(
                state.tree,
                state.currentPath.slice(0, index)
              );

              _.set(state.tree, state.currentPath.slice(0, index), {
                ...currentValue,
                sum: (currentValue?.sum || 0) + parsedSize,
              });
            }

            return state;
          }
        }
      },
      {
        currentPath: [],
        tree: {},
      }
    ).tree;
  }

  partOne() {
    return Object.entries(flattenObject(this.fileTree))
      .filter(([key, value]) => key.endsWith(".sum") && value < 100000)
      .map(([key, value]) => value)
      .reduce((acc = 0, value) => acc + value);
  }

  partTwo() {
    const totalSpace = 70000000;
    const targetFreeSpace = 30000000;
    const currentSize = this.fileTree["/"].sum;
    const neededSpace = totalSpace - targetFreeSpace;
    const flattened = Object.entries(flattenObject(this.fileTree));

    return flattened
      .filter(([key]) => key.endsWith(".sum"))
      .map(([, value]) => value)
      .sort((a, b) => a - b)
      .find((size) => currentSize - size <= neededSpace);
  }
};
