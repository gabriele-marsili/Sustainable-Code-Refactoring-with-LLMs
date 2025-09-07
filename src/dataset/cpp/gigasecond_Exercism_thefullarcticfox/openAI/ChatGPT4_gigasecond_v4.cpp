#include "gigasecond.h"
#include <boost/date_time/posix_time/posix_time_types.hpp>

namespace gigasecond {
	ptime advance(const ptime& time) noexcept {
		static const time_duration gigasecond_duration = seconds(1000000000);
		return time + gigasecond_duration;
	}
}  // namespace gigasecond