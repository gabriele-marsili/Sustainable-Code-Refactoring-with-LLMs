#include "gigasecond.h"

using namespace boost::gregorian;
using namespace boost::posix_time;

date gigasecond::advance(date inputDate)
{
    // A gigasecond is 1,000,000,000 seconds. Use ptime for more accurate calculation
    ptime input_ptime(inputDate);
    ptime future_ptime = input_ptime + seconds(1000000000);
    return future_ptime.date();
}