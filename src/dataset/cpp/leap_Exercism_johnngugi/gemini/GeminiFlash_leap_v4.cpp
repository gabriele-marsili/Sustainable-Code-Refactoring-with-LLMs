#include "leap.h"

bool leap::is_leap_year(int year)
{
    if (year % 4 != 0) {
        return false;
    }

    if (year % 100 == 0) {
        return (year % 400 == 0);
    }

    return true;
}