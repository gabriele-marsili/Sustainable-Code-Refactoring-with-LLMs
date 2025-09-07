#include "clock.h"
#include <iomanip>
#include <sstream>

namespace date_independent
{
	clock::clock(int hour, int minute) : minutes((hour * 60 + minute) % 1440) 
	{ 
		if (minutes < 0) minutes += 1440;
	}

	clock date_independent::clock::at(int hour, int minute) 
	{ 
		int total_minutes = hour * 60 + minute;
		total_minutes %= 1440;
		if (total_minutes < 0) total_minutes += 1440;
		return clock(0, total_minutes);
	}
	clock::operator string() const
	{
		int h = minutes / 60;
		int m = minutes % 60;
		char buffer[6];
		snprintf(buffer, sizeof(buffer), "%02d:%02d", h, m);
		return string(buffer);
	}
	clock clock::plus(int m)
	{
		minutes += m;
		minutes %= 1440;
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