//
// This is only a SKELETON file for the "Leap" exercise. It's been provided as a
// convenience to get you started writing code faster.
//

var Year = function(input) {
  this.year = input;
};

Year.prototype.isLeap = function() {
  // The Gregorian calendar rules for a leap year are as follows:
  // 1. A year is a leap year if it is divisible by 4.
  // 2. However, if the year is divisible by 100, it is NOT a leap year,
  // 3. UNLESS it is also divisible by 400, in which case it IS a leap year.

  // This implementation evaluates the conditions in an optimal sequence:
  // It first checks the most specific and overriding rule (divisibility by 100 and 400),
  // then falls back to the general rule (divisibility by 4).

  // Check if the year is a century year (divisible by 100).
  if (this.year % 100 === 0) {
    // If it's a century year, it's a leap year ONLY if it's also divisible by 400.
    // Example: 1900 is NOT a leap year (divisible by 100, but not 400).
    // Example: 2000 IS a leap year (divisible by 100 AND 400).
    // The boolean result of the comparison `this.year % 400 === 0` is directly returned,
    // avoiding a redundant ternary operator (`? true : false`) for minor efficiency gain.
    return this.year % 400 === 0;
  }

  // If the year is not a century year (not divisible by 100),
  // it is a leap year if it is divisible by 4.
  // Example: 2004 IS a leap year (not divisible by 100, but divisible by 4).
  // Example: 2005 is NOT a leap year (not divisible by 100, and not divisible by 4).
  return this.year % 4 === 0;
};

export default Year;