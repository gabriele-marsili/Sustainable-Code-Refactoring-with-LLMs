#include "gigasecond.h"

using namespace boost::gregorian;

date gigasecond::advance(const date& inputDate) noexcept
{
    static constexpr days gigasecondDays(11574);
    return inputDate + gigasecondDays;
}