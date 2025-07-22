export const convert = (input) => {
  let result = '';

  // Use a pre-computed or more efficient way to check divisibility if
  // this function is called very frequently with a small range of inputs.
  // For general cases, the modulo operator is already highly optimized.

  // Using bitwise operations for modulo 2^n checks is faster, but not applicable here
  // as we're checking against 3, 5, and 7.

  // The current series of if statements is efficient. Converting to a switch statement
  // would not offer performance benefits for non-exclusive conditions.

  // String concatenation with += is generally optimized by modern JavaScript engines
  // to be efficient for a small number of concatenations. Using an array and .join('')
  // would add overhead for this few operations.

  if (input % 3 === 0) {
    result += 'Pling';
  }
  if (input % 5 === 0) {
    result += 'Plang';
  }
  if (input % 7 === 0) {
    result += 'Plong';
  }

  // The logical OR operator (||) is short-circuiting, meaning toString()
  // is only called if result is an empty string. This is efficient.
  return result || input.toString();
};