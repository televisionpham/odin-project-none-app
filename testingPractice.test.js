import { functions, calculator } from "./testingPractice";

test("capitalize a string", () => {
  expect(functions.capitalize("abc")).toBe("Abc");
});

test("reverse string", () => {
  expect(functions.reveseString("abc")).toBe("cba");
});

test("add a to b", () => {
  expect(calculator.add(1, 2)).toBe(3);
});

test("subtract a to b", () => {
  expect(calculator.subtract(2, 1)).toBe(1);
});

test("divide a to b", () => {
  expect(calculator.divide(6, 2)).toBe(3);
});

test("multiply a to b", () => {
  expect(calculator.multiply(1, 3)).toBe(3);
});
