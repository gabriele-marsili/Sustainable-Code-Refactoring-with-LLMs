#include "gigasecond.h"

namespace gigasecond {
	boost::posix_time::ptime advance(const boost::posix_time::ptime& time) {
		static const boost::posix_time::seconds gigasecond_duration(1000000000);
		return time + gigasecond_duration;
	}
}