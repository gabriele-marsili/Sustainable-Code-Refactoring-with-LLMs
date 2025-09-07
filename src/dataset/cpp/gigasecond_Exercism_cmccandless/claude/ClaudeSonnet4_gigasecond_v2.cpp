#include "gigasecond.h" 

using namespace boost::posix_time;

ptime gigasecond::advance(ptime t)
{
	static const time_duration gigasecond_duration = seconds(1000000000);
	return t + gigasecond_duration;
}