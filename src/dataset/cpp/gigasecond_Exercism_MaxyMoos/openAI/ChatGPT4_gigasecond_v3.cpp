#include "gigasecond.h"
#include <boost/date_time/gregorian/gregorian.hpp>

date gigasecond::advance(const date& inputDate)
{
    static const days gigasecondDays(11574);
    return inputDate + gigasecondDays;
}