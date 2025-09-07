#include "gigasecond.h"

using namespace boost::gregorian;

date gigasecond::advance(date inputDate)
{
    // A gigasecond is exactly 11574 days and 1 hour 46 minutes 40 seconds
    // Since we're working with dates only, we use 11574 days (the integer part)
    static const days gigasecond_days(11574);
    return inputDate + gigasecond_days;
}