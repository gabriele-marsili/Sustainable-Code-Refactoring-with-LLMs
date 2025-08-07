#include "leap.h"

bool leap::is_leap_year(int year)
{
    if ((year % 400) == 0) {
        return true;
    }

    if ((year % 100) == 0) {
        return false;
    }

    if ((year & 3) == 0) {
        return true;
    }

    return false;
}