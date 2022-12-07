module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.paths = input.split("\n").reduce(
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
          }
        } else {
          const [size] = line.split(" ");
          const parsedSize = parseInt(size, 10);

          if (Number.isNaN(parsedSize) === false) {
            const newPaths = state.currentPath.reduce(
              (paths, _directory, index) => {
                const path = state.currentPath.slice(0, index + 1).join(".");
                return {
                  ...paths,
                  [path]: (paths[path] || 0) + parsedSize,
                };
              },
              state.paths
            );

            return {
              ...state,
              paths: newPaths,
            };
          }
        }

        return state;
      },
      {
        currentPath: [],
        paths: {},
      }
    ).paths;
  }

  partOne() {
    const maxSize = 100_000;

    return Object.values(this.paths)
      .filter((value) => value < maxSize)
      .reduce((acc = 0, value) => acc + value);
  }

  partTwo() {
    const totalSpace = 70_000_000;
    const targetFreeSpace = 30_000_000;
    const currentSize = this.paths["/"];
    const neededSpace = totalSpace - targetFreeSpace;

    return Object.values(this.paths)
      .sort((a, b) => a - b)
      .find((size) => currentSize - size <= neededSpace);
  }
};
