#include "gigasecond.h"

using namespace boost::gregorian;

date gigasecond::advance(date inputDate)
{
    // A gigasecond is 11574 days and a fraction, but boost::gregorian::date only deals with whole days.
    return inputDate + days(11574);
}