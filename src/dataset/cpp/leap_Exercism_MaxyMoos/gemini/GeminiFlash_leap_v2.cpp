#include "leap.h"

bool leap::is_leap_year(int year)
{
    // Apply the leap year rules sequentially to potentially short-circuit early and
    // reduce the number of modulo operations for common cases.
    //
    // The rules are:
    // 1. A year is a leap year if it is divisible by 4,
    // 2. EXCEPT if it is divisible by 100,
    // 3. UNLESS it is also divisible by 400.

    // Check Rule 1: Not a leap year if not divisible by 4.
    // This is the most frequent case for non-leap years (approx. 75% of years).
    // This branch executes only one modulo operation and returns immediately.
    if (year % 4 != 0) {
        return false;
    }

    // If we reach here, the year is divisible by 4.
    // Now, check Rule 2: If it's divisible by 100 (e.g., 1900, 2100, 2000).
    // If it's divisible by 4 but NOT by 100, it IS a leap year (e.g., 2004, 2008).
    // This covers most standard leap years.
    // This branch executes a second modulo operation.
    if (year % 100 != 0) {
        return true;
    }

    // If we reach here, the year is divisible by both 4 and 100 (e.g., 1900, 2000, 2100).
    // Now, check Rule 3: It IS a leap year only if it's also divisible by 400.
    // This final check covers centurial years.
    // This executes a third modulo operation, but only for the relatively rare centurial years.
    return (year % 400 == 0);
}