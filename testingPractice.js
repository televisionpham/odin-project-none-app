const functions = (function () {
  function capitalize(str) {
    const result = str[0].toUpperCase() + str.substring(1).toLowerCase();
    return result;
  }

  function reveseString(str) {
    let result = "";

    for (let i = str.length - 1; i >= 0; i--) {
      result += str[i];
    }

    return result;
  }

  return {
    capitalize,
    reveseString,
  };
})();

const calculator = (function () {
  function add(a, b) {
    return a + b;
  }

  function subtract(a, b) {
    return a - b;
  }

  function divide(a, b) {
    if (b !== 0) {
      return a / b;
    }
  }

  function multiply(a, b) {
    return a * b;
  }

  return {
    add,
    subtract,
    divide,
    multiply,
  };
})();

export { functions, calculator };
