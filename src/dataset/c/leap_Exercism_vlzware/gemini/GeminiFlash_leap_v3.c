#include "leap.h"

int is_leap_year(const int year)
{
    if ((year & 3) != 0) {
        return 0;
    }

    if (year % 100 == 0) {
        if (year % 400 == 0) {
            return 1;
        } else {
            return 0;
        }
    }

    return 1;
}