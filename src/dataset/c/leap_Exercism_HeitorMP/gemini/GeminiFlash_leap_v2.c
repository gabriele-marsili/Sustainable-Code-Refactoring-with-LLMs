#include "leap.h"

bool leap_year(int year)
{
    // A year is a leap year if it is divisible by 4,
    // except for end-of-century years which must be divisible by 400.
    // This can be expressed in a single boolean expression for conciseness and potential optimization.
    // The short-circuiting behavior of '&&' and '||' ensures that
    // modulo operations are only performed when necessary, similar to the original nested ifs.
    return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
}