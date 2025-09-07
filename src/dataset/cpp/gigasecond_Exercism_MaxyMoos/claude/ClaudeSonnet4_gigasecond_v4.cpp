#include "gigasecond.h"

using namespace boost::gregorian;

date gigasecond::advance(date inputDate)
{
    return inputDate + days(11574);
}