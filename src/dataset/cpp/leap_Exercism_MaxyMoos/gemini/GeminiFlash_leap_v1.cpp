#include "leap.h"

bool leap::is_leap_year(int year)
{
    // According to the Gregorian calendar rules:
    // 1. A year is a leap year if it is divisible by 400.
    // 2. Otherwise, it is a leap year if it is divisible by 4 but not by 100.

    // The expression is reordered to prioritize the most specific rule first (divisible by 400).
    // This allows for short-circuiting in cases where the year is divisible by 400 (e.g., 2000, 2400),
    // potentially reducing the number of modulo operations.
    // The check for divisibility by 4 (`year % 4 == 0`) is replaced with a bitwise AND operation (`(year & 3) == 0`),
    // which is generally faster as it avoids a division instruction.
    return (year % 400 == 0 || ((year & 3) == 0 && year % 100 != 0));
}