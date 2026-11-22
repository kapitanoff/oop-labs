// @ts-check

/**
 * @typedef {object} Operation
 * @property {() => string} getName
 * @property {() => string} getSign
 * @property {(a: number, b: number) => number} calculate
 */
/** @implements {Operation} */
class Addition {
  getName() {
    return "Сложение";
  }
  getSign() {
    return "+";
  }
  /**
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  calculate(a, b) {
    return a + b;
  }
}
/** @implements {Operation} */
class Subtraction {
  getName() {
    return "Вычитание";
  }
  getSign() {
    return "-";
  }
  /**
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  calculate(a, b) {
    return a - b;
  }
}
/** @implements {Operation} */
class Multiplication {
  getName() {
    return "Умножение";
  }
  getSign() {
    return "*";
  }
  /**
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  calculate(a, b) {
    return a * b;
  }
}

const operations = [new Addition(), new Subtraction(), new Multiplication()];

/**
 * @param {Operation[]} operations
 * @param {number} a
 * @param {number} b
 */
function showOperations(operations, a, b) {
  for (const element of operations) {
    console.log(
      `${element.getName()}: ${a} ${element.getSign()} ${b} = ${element.calculate(a, b)}`,
    );
  }
}
showOperations(operations, 10, 4);
