#include "leap.h"

int is_leap_year(int year) {
    // The standard leap year rules are:
    // 1. A year is a leap year if it is divisible by 4,
    // 2. EXCEPT if it is divisible by 100,
    // 3. UNLESS it is also divisible by 400.

    // Original: (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

    // Optimization: Replacing 'year % 4 == 0' with '(year & 3) == 0' for divisibility by 4.
    // Bitwise AND operations are typically faster than modulo operations, especially for powers of 2.
    // Modern compilers often perform this optimization automatically, but explicitly stating it
    // guarantees the use of bitwise operations which consume fewer CPU cycles and thus less energy.
    // The logical short-circuiting of '&&' and '||' operators ensures that subsequent
    // (potentially more expensive) checks like 'year % 100' or 'year % 400' are only performed
    // when necessary, further contributing to efficiency and reduced energy consumption.
    return ((year & 3) == 0 && year % 100 != 0) ||
            year % 400 == 0;
}