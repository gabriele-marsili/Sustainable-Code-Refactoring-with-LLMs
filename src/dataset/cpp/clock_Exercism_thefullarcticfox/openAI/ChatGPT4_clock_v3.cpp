#include "clock.h"
#include <sstream>
#include <iomanip>
#include <utility>

namespace date_independent {
	namespace clock {
		std::pair<int, int> make_timepair(int hour, int min) {
			hour += min / 60;
			min = (min % 60 + 60) % 60;
			hour = (hour % 24 + 24) % 24;
			return {hour, min};
		}

		at::at(int hour, int min) : time_hm(make_timepair(hour, min)) {}

		at at::plus(int min) {
			auto [hour, minute] = time_hm;
			time_hm = make_timepair(hour, minute + min);
			return *this;
		}

		bool at::operator==(const at& other) const {
			return time_hm == other.time_hm;
		}

		bool at::operator!=(const at& other) const {
			return time_hm != other.time_hm;
		}

		at::operator std::string() const {
			std::ostringstream oss;
			oss << std::setw(2) << std::setfill('0') << time_hm.first << ":"
				<< std::setw(2) << std::setfill('0') << time_hm.second;
			return oss.str();
		}
	}
}  // namespace date_independent