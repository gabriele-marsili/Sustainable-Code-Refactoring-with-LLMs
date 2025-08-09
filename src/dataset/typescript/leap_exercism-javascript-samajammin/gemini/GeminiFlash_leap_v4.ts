function isLeapYear(year: number): boolean {
  // If the year is not divisible by 4, it cannot be a leap year.
  // This covers the most common case for non-leap years, minimizing computations.
  if (year % 4 !== 0) {
    return false;
  }

  // If the year is divisible by 4 but not by 100, it is a leap year.
  // This covers typical leap years like 2004, 2008, etc.
  if (year % 100 !== 0) {
    return true;
  }

  // If the year is divisible by 100 (and therefore also by 4), it is a century year.
  // Century years are leap years only if they are also divisible by 400.
  // This handles cases like 2000 (leap year) vs 1900 (not a leap year).
  return year % 400 === 0;
}

export default isLeapYear;