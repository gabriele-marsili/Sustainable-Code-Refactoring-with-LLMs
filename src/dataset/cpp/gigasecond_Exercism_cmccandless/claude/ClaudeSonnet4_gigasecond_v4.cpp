#include "gigasecond.h" 

using namespace boost::posix_time;

namespace {
    constexpr long GIGASECOND = 1000000000L;
}

ptime gigasecond::advance(ptime t)
{
    return t + seconds(GIGASECOND);
}