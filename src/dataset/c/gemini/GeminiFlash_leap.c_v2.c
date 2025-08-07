#include "leap.h"

bool leap_year(int year)
{
    // A year is a leap year if it is divisible by 4,
    // but not by 100, unless it is also divisible by 400.
    // This consolidated boolean expression directly implements these rules,
    // leveraging short-circuit evaluation of logical operators (&& and ||)
    // to minimize unnecessary computations and branches.
    return (year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0));
}