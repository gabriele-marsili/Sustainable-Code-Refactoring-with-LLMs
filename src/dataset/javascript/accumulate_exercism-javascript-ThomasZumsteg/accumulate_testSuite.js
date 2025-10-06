import accumulate from './accumulate'; // Assuming the file is in 'src/accumulate.js'

describe('accumulate', () => {
  // Test 1: Basic multiplication
  test('should multiply each number in an array by two', () => {
    const numbers = [1, 2, 3, 4, 5];
    const double = (n) => n * 2;
    const expected = [2, 4, 6, 8, 10];
    expect(accumulate(numbers, double)).toEqual(expected);
  });

  // Test 2: Transforming strings (to uppercase)
  test('should convert each string in an array to uppercase', () => {
    const words = ['hello', 'world', 'test'];
    const uppercase = (s) => s.toUpperCase();
    const expected = ['HELLO', 'WORLD', 'TEST'];
    expect(accumulate(words, uppercase)).toEqual(expected);
  });

  // Test 3: Handling an empty array
  test('should return an empty array when given an empty array', () => {
    const emptyArray = [];
    const dummyFunc = (x) => x + 1;
    const expected = [];
    expect(accumulate(emptyArray, dummyFunc)).toEqual(expected);
  });

  // Test 4: Transforming mixed types (e.g., adding a string prefix)
  test('should correctly apply a function that modifies mixed types', () => {
    const items = [10, 'A', true];
    const prefix = (item) => `Value: ${item}`;
    const expected = ['Value: 10', 'Value: A', 'Value: true'];
    expect(accumulate(items, prefix)).toEqual(expected);
  });

  // Test 5: Handling a callback that returns null or undefined
  test('should correctly handle a function that returns null for every element', () => {
    const items = [1, 2, 3];
    const returnNull = () => null;
    const expected = [null, null, null];
    expect(accumulate(items, returnNull)).toEqual(expected);
  });
});