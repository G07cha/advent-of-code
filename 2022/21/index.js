module.exports = class Solution {
  /**
   * @param {string} input
   */
  constructor(input) {
    this.input = input
      .split("\n")
      .map((row) => row.split(": "))
      .reduce(
        (acc, [monkeyName, operation]) => ({
          ...acc,
          [monkeyName]: /^\d+$/.test(operation)
            ? parseInt(operation, 10)
            : operation,
        }),
        {}
      );
  }

  partOne = () => {
    const queue = ["root"];
    let expression = "";

    do {
      const monkeyName = queue.shift();
      const value = this.input[monkeyName];

      if (typeof value === "number") {
        expression = expression.replaceAll(monkeyName, value.toString());
      } else {
        if (expression.length === 0) {
          expression = value;
        }
        expression = expression.replaceAll(monkeyName, `(${value})`);
        queue.push(...value.matchAll(/\w+/g));
      }
    } while (queue.length);

    return eval(expression);
  };

  partTwo = () => {
    const queue = ["root"];
    const human = "humn";
    let expression = "";

    do {
      const monkeyName = queue.shift();
      const value = this.input[monkeyName];
      if (monkeyName[0] === human) {
        continue;
      }

      if (typeof value === "number") {
        expression = expression.replaceAll(monkeyName, value.toString());
      } else {
        if (expression.length === 0) {
          expression = value.replace("+", "===");
        }
        expression = expression.replaceAll(monkeyName, `(${value})`);
        queue.push(...value.matchAll(/\w+/g));
      }
    } while (queue.length);

    let start = 1;
    let end = Number.MAX_SAFE_INTEGER;
    const isReversed = eval(
      expression.replace("===", ">").replace(human, start.toString())
    );

    // Searching with the assumption that the expression with a human is on the left
    do {
      let middle = (start + end) / 2;
      let currentExpression = expression.replace(human, middle.toString());

      if (eval(currentExpression) === true) {
        return middle;
      }

      if (eval(currentExpression.replace("===", ">"))) {
        if (isReversed) {
          start = middle + 1;
        } else {
          end = middle - 1;
        }
      } else {
        if (isReversed) {
          end = middle - 1;
        } else {
          start = middle + 1;
        }
      }
    } while (start <= end);
  };
};
