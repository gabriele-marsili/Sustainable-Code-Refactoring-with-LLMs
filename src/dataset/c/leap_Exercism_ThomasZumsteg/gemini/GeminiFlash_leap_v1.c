#include "leap.h"

int is_leap_year(int year) {
    // According to the Gregorian calendar rules:
    // 1. A year is a leap year if it is divisible by 4,
    //    unless it is divisible by 100,
    //    unless it is also divisible by 400.

    // Optimization Strategy:
    // - Minimize the number of expensive modulo operations.
    // - Use bitwise operations for modulo by powers of 2 (e.g., year % 4).
    // - Structure conditions to exit early for common cases.

    // Rule 1 check (most frequent non-leap years):
    // If a year is not divisible by 4, it cannot be a leap year.
    // Using `(year & 3)` is an optimized way to check `year % 4 == 0` for positive integers,
    // as bitwise AND is typically faster than integer division/modulo.
    // It also correctly handles 0 and negative numbers for divisibility.
    if ((year & 3) != 0) { // Equivalent to year % 4 != 0
        return 0; // Not a leap year
    }

    // At this point, we know 'year' is divisible by 4.

    // Rule 2 check:
    // If a year is divisible by 4 but not by 100, it IS a leap year.
    if (year % 100 != 0) {
        return 1; // Is a leap year (e.g., 2004, 2024)
    }

    // At this point, we know 'year' is divisible by 4 AND by 100.
    // This covers years like 1900, 2000, 2100.

    // Rule 3 check:
    // If a year is divisible by 100 (and by 4), it is only a leap year if it is also divisible by 400.
    // If it's not divisible by 400, it's not a leap year.
    if (year % 400 != 0) {
        return 0; // Not a leap year (e.g., 1900, 2100)
    }

    // At this point, we know 'year' is divisible by 4, by 100, AND by 400.
    // This is the final condition for a leap year.
    return 1; // Is a leap year (e.g., 2000, 2400)
}