#include "clock.h"

namespace date_independent {
	clock clock::at(int hours, int minutes) {
		constexpr int HOURS_IN_DAY{ 24 };
		constexpr int MINUTES_IN_HOUR{ 60 };
		constexpr int MINUTES_IN_DAY{ HOURS_IN_DAY * MINUTES_IN_HOUR };

		int total_mins{ minutes + hours * MINUTES_IN_HOUR };
		total_mins = (total_mins % MINUTES_IN_DAY + MINUTES_IN_DAY) % MINUTES_IN_DAY;
		minutes = total_mins % MINUTES_IN_HOUR;
		hours = total_mins / MINUTES_IN_HOUR;

		return clock{ hours, minutes };
	}

	clock::operator std::string() const {
		std::stringstream ss;
		ss << std::setfill('0') << std::setw(2) << this->m_hours << ":"
			<< std::setw(2) << this->m_minutes;
		return ss.str();
	}

	clock clock::plus(int minutes) {
		return clock::at(this->m_hours, this->m_minutes + minutes);
	}

	bool clock::operator==(clock c) const {
		return this->m_hours == c.m_hours && this->m_minutes == c.m_minutes;
	}
}