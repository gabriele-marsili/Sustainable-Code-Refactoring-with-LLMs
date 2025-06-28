#ifndef GIGASECOND_H_
#define GIGASECOND_H_

#include <boost/date_time/gregorian/gregorian.hpp>

namespace gigasecond
{
    boost::gregorian::date advance(boost::gregorian::date inputDate);
}

#endif