#include "gigasecond.h"

using namespace boost::gregorian;

date gigasecond::advance(date inputDate)
{
    // A gigasecond is 11574,07 days
    return inputDate + days(11574);
}