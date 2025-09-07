#include "gigasecond.h"

using boost::posix_time::ptime;
using boost::posix_time::time_duration;

ptime gigasecond::advance(const ptime& t) noexcept
{
    static const time_duration gigasecond_duration = boost::posix_time::seconds(1000000000);
    return t + gigasecond_duration;
}