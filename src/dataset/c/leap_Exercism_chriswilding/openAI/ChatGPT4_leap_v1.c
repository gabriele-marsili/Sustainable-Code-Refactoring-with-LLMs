#include "leap.h"

bool is_leap_year(int year) {
  if (year & 3) return false;
  if (year % 100) return true;
  return year % 400 == 0;
}