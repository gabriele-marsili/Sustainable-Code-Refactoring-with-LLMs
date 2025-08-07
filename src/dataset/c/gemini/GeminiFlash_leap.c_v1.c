#include "leap.h"

bool leap_year(int year)
{
    // A year is a leap year if it is divisible by 4,
    // unless it is divisible by 100,
    // in which case it must be divisible by 400.
    return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
}