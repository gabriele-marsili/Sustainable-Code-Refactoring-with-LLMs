#include "gigasecond.h"
#include <boost/date_time/posix_time/posix_time_types.hpp>

boost::posix_time::ptime gigasecond::advance(const boost::posix_time::ptime& t) noexcept
{
    static const boost::posix_time::time_duration gigasecond_duration = boost::posix_time::seconds(1000000000);
    return t + gigasecond_duration;
}