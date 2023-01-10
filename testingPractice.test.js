import functions from "./testingPractice";

test('capitalize a string', () => {
    expect(functions.capitalize('abc')).toBe('Abc')
})