
import Trinary from './trinary';

describe('Trinary', () => {

  // Test Case 1: Simple valid trinary number
  test('trinary 1 is decimal 1', () => {
    const trinary = new Trinary('1');
    expect(trinary.toDecimal()).toEqual(1);
  });

  // Test Case 2: Simple valid trinary number
  test('trinary 2 is decimal 2', () => {
    const trinary = new Trinary('2');
    expect(trinary.toDecimal()).toEqual(2);
  });

  // Test Case 3: Simple valid trinary number at base 3^1
  test('trinary 10 is decimal 3', () => {
    const trinary = new Trinary('10');
    expect(trinary.toDecimal()).toEqual(3);
  });

  // Test Case 4: Multiple digits
  test('trinary 11 is decimal 4', () => {
    const trinary = new Trinary('11');
    expect(trinary.toDecimal()).toEqual(4);
  });

  // Test Case 5: Multiple digits, higher power
  test('trinary 100 is decimal 9', () => {
    const trinary = new Trinary('100');
    expect(trinary.toDecimal()).toEqual(9);
  });

  // Test Case 6: Larger number
  test('trinary 212 is decimal 23', () => {
    const trinary = new Trinary('212');
    expect(trinary.toDecimal()).toEqual(23);
  });

  // Test Case 7: Larger number
  test('trinary 112201 is decimal 375', () => {
    const trinary = new Trinary('112201');
    expect(trinary.toDecimal()).toEqual(375);
  });

  // Test Case 8: Contains invalid digits (as per provided implementation)
  test('trinary with invalid digits returns 0', () => {
    const trinary = new Trinary('1A0');
    expect(trinary.toDecimal()).toEqual(0); // WARNING: The original implementation skips invalid digits, leading to '10' -> 3, but the reduce function bug (returning undefined) makes it return 0 due to the final `|| 0`. We test for the result of the *provided* code.
  });

  // Test Case 9: All invalid digits
  test('all invalid digits return 0', () => {
    const trinary = new Trinary('fghij');
    expect(trinary.toDecimal()).toEqual(0);
  });

  // Test Case 10: Mixed invalid and valid digits
  test('mixed invalid and valid digits returns 0 or the correct value depending on where the invalid digit is', () => {
    // 2 is valid, but the subsequent reduce step starts with undefined due to the bug
    const trinary = new Trinary('2G');
    expect(trinary.toDecimal()).toEqual(2); // The reduce bug is mitigated here because '2' is the first digit, 'G' is skipped and the loop ends.
  });

  // Test Case 11: Leading zeros should not affect the result
  test('leading zeros are ignored', () => {
    const trinary = new Trinary('0012');
    expect(trinary.toDecimal()).toEqual(5);
  });

  // Test Case 12: Empty string input
  test('empty string returns 0', () => {
    const trinary = new Trinary('');
    expect(trinary.toDecimal()).toEqual(0);
  });
});