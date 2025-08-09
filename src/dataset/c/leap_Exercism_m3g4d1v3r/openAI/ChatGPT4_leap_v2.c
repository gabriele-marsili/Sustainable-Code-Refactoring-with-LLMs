#include "leap.h"

bool leap_year(int year) {
    if (year & 3) return false;
    if (year % 25 == 0 && year % 16 != 0) return false;
    return true;
}