/*
 * =====================================================================================
 *
 *       Filename:  clock.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  15.08.2015 02:19:09
 *       Revision:  none
 *       Compiler:  gcc
 *
 *
 * =====================================================================================
 */

#include <sstream>
#include <iomanip>
#include "clock.h"


namespace date_independent
{

	clock::clock(int h, int min): hour_{h}, minute_{min} {}

	clock clock::at(int hour, int min /* =0 */)
	{
		return clock(hour, min);
	}

	clock::operator std::string() const
	{
		std::ostringstream buffer{};
		buffer << std::setw(2) << std::setfill('0') << hour_ << ':' << std::setw(2) << std::setfill('0') << minute_;
		return buffer.str();
	}

	clock& clock::plus(int minute)
	{
		minute_ += minute;
		if( minute_ >= 60)
		{
			hour_ += minute_ / 60;
			minute_ %= 60;
			hour_ %= 24;
		}

		return *this;
	}


	clock& clock::minus(int minute)
	{
		if(minute <= minute_)
		{
			minute_ -= minute;
		}
		else
		{
			minute -= minute_;
			minute_ =0;
			hour_ -=1+ (minute / 60);
			minute_ = 60 - (minute % 60);
			if( hour_ < 0)
			{
				hour_ = 24 + (hour_ % 24);
			}
		}
		return *this;

	}

	bool clock::operator==(clock const& rhs) const
	{
		return (minute_ == rhs.minute_) and ( hour_ == rhs.hour_);
	}

	bool clock::operator!=(clock const& rhs) const
	{return not(*this == rhs);}
}