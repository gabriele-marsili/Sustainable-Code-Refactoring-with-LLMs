export function isLeap(year: number): boolean {
  // A year is not a leap year if it's not divisible by 4.
  // This covers the majority of non-leap years and offers the fastest exit.
  if (year % 4 !== 0) {
    return false
  }

  // At this point, the year is divisible by 4.
  // Now, check if it's a century year (divisible by 100).
  // Century years are only leap years if they are also divisible by 400.
  if (year % 100 === 0) {
    return year % 400 === 0
  }

  // If the year is divisible by 4 but not by 100 (and implicitly not by 400),
  // then it is a leap year (e.g., 2004).
  return true
}