#include "gigasecond.h"
using namespace boost::posix_time;

namespace gigasecond {
    ptime advance(const ptime& time) {
        static const time_duration gigasecond_duration = seconds(1000000000);
        return time + gigasecond_duration;
    }
}  // namespace gigasecond