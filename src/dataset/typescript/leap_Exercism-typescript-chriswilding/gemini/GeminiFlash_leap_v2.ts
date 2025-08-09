function isLeapYear(year: number): boolean {
  // A year is a leap year if it is divisible by 4 but not by 100,
  // unless it is also divisible by 400.
  //
  // The original logic `year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)`
  // correctly implements this rule and already benefits from short-circuiting
  // to avoid unnecessary calculations.

  // Optimization: Replacing `year % 4 === 0` with `(year & 3) === 0`.
  // Checking divisibility by a power of 2 (like 4) using a bitwise AND operation
  // is generally more CPU-efficient and consumes less energy than a modulo operation,
  // as bitwise operations are typically faster at the CPU level.
  return year % 400 === 0 || (year % 100 !== 0 && (year & 3) === 0)
}

export default isLeapYear