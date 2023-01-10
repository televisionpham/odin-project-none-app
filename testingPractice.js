const functions = (function () {
  function capitalize(str) {
    const result = str[0].toUpperCase() + str.substring(1).toLowerCase();
    return result;
  }

  return {
    capitalize,
  };
})();

export default functions;
