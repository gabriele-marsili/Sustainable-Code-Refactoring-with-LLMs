#include "clock.h"
#include <iomanip>
#include <sstream>

namespace date_independent
{
	clock::clock(int hour, int minute) : minutes((hour * 60 + minute) % 1440) 
	{ 
		if (minutes < 0) minutes += 1440; 
	}

	clock clock::at(int hour, int minute) 
	{ 
		int total_minutes = (hour * 60 + minute) % 1440;
		if (total_minutes < 0) total_minutes += 1440;
		return clock(0, total_minutes);
	}

	clock::operator std::string() const
	{
		std::ostringstream ss;
		ss << std::setw(2) << std::setfill('0') << (minutes / 60) 
		   << ':' << std::setw(2) << std::setfill('0') << (minutes % 60);
		return ss.str();
	}

	clock clock::plus(int m)
	{
		minutes = (minutes + m) % 1440;
		if (minutes < 0) minutes += 1440;
		return *this;
	}

	bool clock::operator==(clock other) const
	{
		return minutes == other.minutes;
	}

	bool clock::operator!=(clock other) const
	{
		return minutes != other.minutes;
	}
}