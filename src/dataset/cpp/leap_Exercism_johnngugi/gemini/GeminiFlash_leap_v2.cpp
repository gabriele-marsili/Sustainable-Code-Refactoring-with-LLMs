#include "leap.h"

bool leap::is_leap_year(int year)
{
    // According to the Gregorian calendar rules:
    // A year is a leap year if it is divisible by 4,
    // unless it is divisible by 100 but not by 400.

    // 1. If the year is not divisible by 4, it's definitely not a leap year.
    // Using a bitwise AND operation for divisibility by 4 (a power of 2)
    // is typically more efficient than the modulo operator.
    if ((year & 3) != 0) { // Equivalent to (year % 4 != 0)
        return false;
    }

    // 2. If the year is divisible by 4, now apply the century rules.
    // If it's divisible by 100...
    if ((year % 100) == 0) {
        // ...then it's a leap year only if it's also divisible by 400.
        return (year % 400) == 0;
    }

    // 3. If the year is divisible by 4 but not by 100, it is a leap year.
    return true;
}