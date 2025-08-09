#include "leap.h"

bool leap_year(int year) {
    // A year is a leap year if it is divisible by 4.
    // Using bitwise AND for modulo 4 is generally faster than the modulo operator.
    // (year & 3) == 0 is equivalent to (year % 4 == 0).
    if ((year & 3) != 0) {
        return false; // Not divisible by 4, so not a leap year.
    }

    // If a year is divisible by 4, it is a leap year, UNLESS
    // it is also divisible by 100 but NOT by 400.

    // If the year is not divisible by 100, and we already know it's divisible by 4,
    // then it's a leap year (e.g., 2004, 2008).
    if (year % 100 != 0) {
        return true;
    }

    // If the year is divisible by 100 (and by 4, from the first check),
    // it must also be divisible by 400 to be a leap year (e.g., 2000 is, 1900 is not).
    return (year % 400 == 0);
}