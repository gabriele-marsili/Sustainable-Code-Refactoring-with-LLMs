#include "clock.h"
#include <sstream>
#include <iomanip>
#include <utility>

namespace date_independent {
	namespace clock {
		std::pair<int, int>	make_timepair(int hour, int min) {
			hour += min / 60;
			min %= 60;

			if (min < 0) {
				min += 60;
				--hour;
			}

			hour %= 24;
			if (hour < 0)
				hour += 24;

			return std::make_pair(hour, min);
		}

		at::at(int hour, int min) : time_hm(make_timepair(hour, min)) {}

		at	at::plus(int min) {
			time_hm.second += min;
			time_hm = make_timepair(time_hm.first, time_hm.second);
			return *this;
		}

		bool	at::operator==(const at& other) const {
			return time_hm == other.time_hm;
		}

		bool	at::operator!=(const at& other) const {
			return time_hm != other.time_hm;
		}

		at::operator std::string() const {
			char buffer[6];
			snprintf(buffer, sizeof(buffer), "%02d:%02d", time_hm.first, time_hm.second);
			return std::string(buffer);
		}
	}
}  // namespace date_independent