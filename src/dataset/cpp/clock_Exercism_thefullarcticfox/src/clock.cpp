#include "clock.h"
#include <sstream>
#include <iomanip>
#include <utility>

namespace date_independent {
	namespace clock {
		std::pair<int, int>	make_timepair(int hour, int min) {
			while (min < 0) {
				min += 60;
				--hour;
			}

			hour += min / 60;
			min %= 60;

			while (hour < 0)
				hour += 24;
			hour %= 24;

			return std::make_pair(hour, min);
		}

		at::at(int hour, int min) : time_hm(make_timepair(hour, min)) {}

		at	at::plus(int min) {
			time_hm.second += min;
			time_hm = make_timepair(time_hm.first, time_hm.second);
			return *this;
		}

		bool	at::operator==(const at& other) const {
			return this->time_hm == other.time_hm;
		}

		bool	at::operator!=(const at& other) const {
			return !(*this == other);
		}

		at::operator std::string() const {
			std::ostringstream	oss;
			oss.fill('0');
			oss << std::setw(2) << time_hm.first << ":" <<
					std::setw(2) << time_hm.second;
			return oss.str();
		}
	}
}  // namespace date_independent
