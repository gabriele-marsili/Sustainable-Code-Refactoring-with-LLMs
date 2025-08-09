export const isLeap = year => {
  // A year is a leap year if it is divisible by 4,
  // except for century years which are not divisible by 400.
  // This can be expressed as:
  // (divisible by 4 AND not divisible by 100) OR (divisible by 400).
  //
  // This direct boolean expression avoids nested ternary operations,
  // which can sometimes lead to slightly more efficient bytecode
  // generation by JavaScript engines due to simpler control flow.
  // It also implicitly leverages short-circuiting for logical operations,
  // ensuring that only necessary modulo operations are performed.
  // Using strict equality (=== and !==) is a good practice, though for
  // comparisons with 0, its practical effect on numbers is negligible.
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};