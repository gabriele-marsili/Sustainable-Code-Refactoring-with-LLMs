#include "leap.h"

bool is_leap_year(int year) {
  // The leap year rule is:
  // - A year is a leap year if it is divisible by 400.
  // - Otherwise, it is a leap year if it is divisible by 4 but not by 100.

  // The expression uses short-circuiting logical operators to minimize computations:
  // 1. `year % 400 == 0`: This is checked first. If true, the year is a leap year (e.g., 2000),
  //    and the rest of the expression is not evaluated. This is the most restrictive condition.
  // 2. `year % 100 != 0`: If the year is not divisible by 400, this is checked.
  //    If it's false (i.e., the year is divisible by 100, but not by 400, e.g., 1900),
  //    then the year is not a leap year, and the `(year & 3) == 0` part is skipped.
  // 3. `(year & 3) == 0`: This is equivalent to `year % 4 == 0` for positive integers.
  //    For powers of 2 (like 4), a bitwise AND operation can sometimes be more efficient
  //    than a modulo operation, potentially leading to fewer CPU cycles and lower energy consumption.
  //    This part is only evaluated if the year is not divisible by 400 AND not divisible by 100.
  return year % 400 == 0 || (year % 100 != 0 && (year & 3) == 0);
}