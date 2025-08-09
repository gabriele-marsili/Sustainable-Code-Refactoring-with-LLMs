#include "leap.h"

bool leap_year(int year)
{
    // A year is a leap year if it is divisible by 400,
    // OR if it is divisible by 4 but not by 100.
    // This single boolean expression minimizes branches,
    // allowing for better compiler optimization and improved
    // CPU pipeline efficiency, thus reducing runtime and energy consumption.
    return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}