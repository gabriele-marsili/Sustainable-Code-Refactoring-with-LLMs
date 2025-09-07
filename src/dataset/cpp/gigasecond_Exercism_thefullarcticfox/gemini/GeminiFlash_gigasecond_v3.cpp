#include "gigasecond.h"
#include <chrono>

namespace gigasecond {
	boost::posix_time::ptime advance(const boost::posix_time::ptime& time) {
		static const std::chrono::seconds gigasecond_duration(1000000000);
		auto time_point = boost::posix_time::to_time_t(time);
		auto new_time_point = std::chrono::system_clock::from_time_t(time_point) + gigasecond_duration;
		std::time_t new_time_t = std::chrono::system_clock::to_time_t(new_time_point);
		return boost::posix_time::from_time_t(new_time_t);
	}
}  // namespace gigasecond