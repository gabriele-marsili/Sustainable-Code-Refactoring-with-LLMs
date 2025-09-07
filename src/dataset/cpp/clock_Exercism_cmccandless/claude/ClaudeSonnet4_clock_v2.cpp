#include "clock.h"

namespace date_independent
{
	clock::clock(int hour, int minute) : minutes(hour * 60 + minute) { }

	clock date_independent::clock::at(int hour, int minute) 
	{ 
		int total_minutes = hour * 60 + minute;
		total_minutes = ((total_minutes % 1440) + 1440) % 1440;
		return clock(0, total_minutes);
	}
	
	clock::operator string() const
	{
		int h = minutes / 60;
		int m = minutes % 60;
		string result;
		result.reserve(5);
		if (h < 10) result += '0';
		result += to_string(h);
		result += ':';
		if (m < 10) result += '0';
		result += to_string(m);
		return result;
	}
	
	clock clock::plus(int m)
	{
		minutes = ((minutes + m) % 1440 + 1440) % 1440;
		return *this;
	}
	
	bool clock::operator==(const clock& other) const
	{
		return minutes == other.minutes;
	}
	
	bool clock::operator!=(const clock& other) const
	{
		return minutes != other.minutes;
	}
}