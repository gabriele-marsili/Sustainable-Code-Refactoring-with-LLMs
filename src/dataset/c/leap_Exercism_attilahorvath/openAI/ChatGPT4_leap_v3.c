#include "leap.h"

int is_leap_year(int year) {
    if (year & 3) return 0;
    if (year % 25) return 1;
    return !(year % 16);
}