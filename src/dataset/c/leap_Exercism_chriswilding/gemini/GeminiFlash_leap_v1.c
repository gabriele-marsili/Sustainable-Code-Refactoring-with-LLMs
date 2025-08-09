#include "leap.h"

bool is_leap_year(int year) {
  // The rules for a leap year are:
  // 1. A year is a leap year if it is divisible by 400.
  // 2. Otherwise, it is a leap year if it is divisible by 4 but not by 100.

  // This implementation optimizes for common cases and leverages efficient operations.

  // Step 1: Check if the year is NOT divisible by 4.
  // This is the most common case (3 out of 4 years).
  // Checking divisibility by 4 can be done very efficiently using a bitwise AND operation:
  // (year & 3) is equivalent to year % 4 for any integer, and is generally faster.
  // If a year is not divisible by 4, it cannot be a leap year, so we return false immediately.
  if ((year & 3) != 0) { // year % 4 != 0
    return false;
  }

  // Step 2: At this point, we know the year IS divisible by 4.
  // Now, check if it's NOT divisible by 100.
  // If it's divisible by 4 but not by 100 (e.g., 2024, 2004), it is a leap year.
  // This is the second most common case among years divisible by 4.
  if (year % 100 != 0) {
    return true;
  }

  // Step 3: At this point, we know the year IS divisible by 4 AND by 100.
  // This means it is a century year (e.g., 1900, 2000).
  // Century years are only leap years if they are also divisible by 400.
  // (e.g., 2000 was a leap year, but 1900 was not).
  return year % 400 == 0;
}