#include "gigasecond.h"
using namespace boost::posix_time;

namespace gigasecond {
	ptime advance(const ptime& time) {
		static const seconds gigasecond_duration(1000000000);
		return time + gigasecond_duration;
	}
}  // namespace gigasecond