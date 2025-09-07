#include "gigasecond.h"

using namespace boost::gregorian;

date gigasecond::advance(const date& inputDate) noexcept
{
    static constexpr days gigasecond_days(11574);
    return inputDate + gigasecond_days;
}