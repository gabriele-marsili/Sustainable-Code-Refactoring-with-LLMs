#include "leap.h"

int is_leap_year(int year) {
    if (year % 400 == 0) return 1;
    if (year % 100 == 0) return 0;
    return year % 4 == 0;
}