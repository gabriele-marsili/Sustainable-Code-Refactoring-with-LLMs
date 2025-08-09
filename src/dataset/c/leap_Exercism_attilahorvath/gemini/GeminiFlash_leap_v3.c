#include "leap.h"

int is_leap_year(int year) {
    return ((year & 3) == 0) && ((year % 100 != 0) || (year % 400 == 0));
}