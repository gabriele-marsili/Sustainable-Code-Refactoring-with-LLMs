#include "gigasecond.h"

ptime gigasecond::advance(const ptime& t) noexcept
{
    static const time_duration gigasecond_duration = seconds(1000000000);
    return t + gigasecond_duration;
}