#include "leap.h"

bool leap_year(int year)
{
    // A year is a leap year if it is divisible by 4,
    // except for century years which are not divisible by 400.

    // 1. If the year is not divisible by 4, it's not a leap year.
    // Using bitwise AND for modulo 4 is often faster than the '%' operator.
    if ((year & 3) != 0) { // Equivalent to (year % 4 != 0)
        return false;
    }

    // At this point, we know the year is divisible by 4.

    // 2. If the year is divisible by 100 (e.g., 1900, 2000), it's a leap year
    // ONLY if it is also divisible by 400.
    if ((year % 100 == 0)) {
        return (year % 400 == 0); // Direct boolean return, no redundant ternary
    }

    // 3. If the year is divisible by 4 but not by 100 (e.g., 2004), it is a leap year.
    return true;
}