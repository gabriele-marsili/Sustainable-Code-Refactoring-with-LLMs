#include "leap.h"

bool leap::is_leap_year(int year)
{
    // A year is a leap year if it is divisible by 4,
    // unless it is divisible by 100 but not by 400.

    // Optimization strategy: Prioritize checks to minimize operations
    // for the most common cases.

    // 1. Check if not divisible by 4.
    //    This is the most common case (approx. 75% of years)
    //    and allows for the quickest exit.
    if ((year % 4) != 0) {
        return false;
    }

    // At this point, the year is divisible by 4.
    // 2. Check if not divisible by 100.
    //    If divisible by 4 but not by 100, it's a leap year (e.g., 2004).
    //    This covers the majority of actual leap years.
    if ((year % 100) != 0) {
        return true;
    }

    // At this point, the year is divisible by both 4 and 100.
    // 3. Finally, check if it's divisible by 400.
    //    If a century year (divisible by 100), it's only a leap year
    //    if it's also divisible by 400 (e.g., 2000 is, 1900 is not).
    return (year % 400) == 0;
}