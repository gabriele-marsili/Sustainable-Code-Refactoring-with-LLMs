#include "leap.h"

int is_leap_year(const int year)
{
    // A year must be divisible by 4 to be a leap year.
    // Using a bitwise AND operation (year & 3) is a common and highly efficient
    // way to check divisibility by 4, as it avoids a potentially more expensive
    // modulo division operation. (year % 4 == 0 is equivalent to (year & 3) == 0).
    // This check is performed first as it's the most common condition to fail
    // for non-leap years (roughly 75% of years), allowing for early exit.
    if ((year & 3) != 0) { // If year is not divisible by 4
        return 0; // Not a leap year
    }

    // At this point, we know the year is divisible by 4.
    // Now, check for the century rule: years divisible by 100 are NOT leap years,
    // unless they are also divisible by 400.
    if (year % 100 == 0) {
        // If it's a century year (e.g., 1900, 2000), it's a leap year only if divisible by 400.
        return (year % 400 == 0);
    }

    // If the year is divisible by 4 but not by 100 (e.g., 2004),
    // it is a leap year.
    return 1;
}