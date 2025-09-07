#include "clock.h"
#include <string>
#include <utility>
#include <cstdio>

namespace date_independent {
	namespace clock {
		std::pair<int, int> make_timepair(int hour, int min) {
			hour = (hour + (min / 60)) % 24;
			if (hour < 0) hour += 24;
			min = (min % 60 + 60) % 60;
			if (min < 0) {
				min += 60;
				hour = (hour == 0) ? 23 : hour - 1;
			}
			return {hour, min};
		}

		at::at(int hour, int min) : time_hm(make_timepair(hour, min)) {}

		at at::plus(int min) {
			time_hm = make_timepair(time_hm.first, time_hm.second + min);
			return *this;
		}

		bool at::operator==(const at& other) const {
			return time_hm == other.time_hm;
		}

		bool at::operator!=(const at& other) const {
			return time_hm != other.time_hm;
		}

		at::operator std::string() const {
			char buffer[6];
			std::snprintf(buffer, sizeof(buffer), "%02d:%02d", time_hm.first, time_hm.second);
			return std::string(buffer);
		}
	}
}  // namespace date_independent