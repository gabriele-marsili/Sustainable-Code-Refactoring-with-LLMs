#include "gigasecond.h"
using namespace	boost::posix_time;

namespace gigasecond {
	ptime	advance(const ptime& time) {
		return (time + seconds(1000000000));
	}
}  // namespace gigasecond
