#include "leap.h"

int is_leap_year(int year) {
    // A year is a leap year if it is divisible by 4 (but not by 100 unless it is also divisible by 400).
    //
    // Optimization:
    // Replacing `year % 4 == 0` with `(year & 3) == 0` for checking divisibility by 4.
    // For positive integers, modulo by a power of 2 (like 4) can be efficiently replaced
    // with a bitwise AND operation (year & (power_of_2 - 1)).
    // This typically results in fewer CPU cycles compared to a division operation,
    // leading to reduced execution time and lower energy consumption.
    // The rest of the logic involves modulo operations by 100 and 400, which are not
    // powers of two, so direct bitwise replacements are not applicable.
    // The existing logical structure already benefits from short-circuiting,
    // which minimizes computations for common cases.
    return ((year & 3) == 0) && ((year % 100 != 0) || (year % 400 == 0));
}