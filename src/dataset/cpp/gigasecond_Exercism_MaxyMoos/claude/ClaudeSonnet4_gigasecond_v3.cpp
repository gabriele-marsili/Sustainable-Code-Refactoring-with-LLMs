#include "gigasecond.h"

using namespace boost::gregorian;

date gigasecond::advance(date inputDate)
{
    constexpr int GIGASECOND_DAYS = 11574;
    return inputDate + days(GIGASECOND_DAYS);
}