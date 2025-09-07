#include "gigasecond.h"
#include <boost/date_time/gregorian/gregorian.hpp>

date gigasecond::advance(const date& inputDate)
{
    static const days gigasecond_days(11574);
    return inputDate + gigasecond_days;
}