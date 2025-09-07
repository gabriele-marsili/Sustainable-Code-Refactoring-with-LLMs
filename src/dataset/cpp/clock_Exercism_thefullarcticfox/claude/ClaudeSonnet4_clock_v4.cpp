#include "clock.h"
#include <sstream>
#include <iomanip>
#include <utility>

namespace date_independent {
	namespace clock {
		std::pair<int, int>	make_timepair(int hour, int min) {
			if (min < 0) {
				int hour_offset = (-min + 59) / 60;
				hour -= hour_offset;
				min += hour_offset * 60;
			}
			
			if (min >= 60) {
				hour += min / 60;
				min %= 60;
			}

			if (hour < 0) {
				hour = ((hour % 24) + 24) % 24;
			} else if (hour >= 24) {
				hour %= 24;
			}

			return {hour, min};
		}

		at::at(int hour, int min) : time_hm(make_timepair(hour, min)) {}

		at	at::plus(int min) {
			time_hm = make_timepair(time_hm.first, time_hm.second + min);
			return *this;
		}

		bool	at::operator==(const at& other) const {
			return time_hm.first == other.time_hm.first && 
			       time_hm.second == other.time_hm.second;
		}

		bool	at::operator!=(const at& other) const {
			return time_hm.first != other.time_hm.first || 
			       time_hm.second != other.time_hm.second;
		}

		at::operator std::string() const {
			std::ostringstream	oss;
			oss.fill('0');
			oss << std::setw(2) << time_hm.first << ":" <<
					std::setw(2) << time_hm.second;
			return oss.str();
		}
	}
}