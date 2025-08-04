#ifndef GIGASECOND_H
#define GIGASECOND_H
#include <boost/date_time/gregorian/gregorian.hpp>


namespace gigasecond
{
	using namespace boost::gregorian;

	date advance( date birth)
	{
		return birth + days(1000000000 / (60*60*24));
	}
	

}


#endif