#include "gigasecond.h"
#include <chrono>

namespace gigasecond {
    ptime advance(const ptime& time) {
        static const boost::posix_time::seconds gigasecond_duration(1000000000);
        return time + gigasecond_duration;
    }
}  // namespace gigasecond