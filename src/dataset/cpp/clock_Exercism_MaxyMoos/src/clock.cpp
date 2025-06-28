#include "clock.h"
#include <boost/format.hpp>

inline int positiveModulo(int a, int mod)
{
    return (a % mod + mod) % mod;
}

date_independent::clock::clock()
{
    this->hour = 0;
    this->min = 0;
}

date_independent::clock date_independent::clock::at(int hour)
{
    date_independent::clock newClock;
    newClock.hour = hour;
    return newClock;
}

date_independent::clock date_independent::clock::at(int hour, int min)
{
    date_independent::clock newClock;
    newClock.hour = hour;
    newClock.min = min;
    return newClock;
}

date_independent::clock date_independent::clock::plus(int min)
{
    this->min += min;
    if (this->min > 60)
    {
        this->hour = positiveModulo(this->hour + this->min / 60, 24);
        this->min = positiveModulo(this->min, 60);
    }
    return *this;
}

date_independent::clock date_independent::clock::minus(int min)
{
    this->min -= min;
    if (this->min < 0)
    {
        this->hour = positiveModulo(this->hour - 1 + this->min / 60, 24);
        this->min = positiveModulo(this->min, 60);
    }
    return *this;
}

bool date_independent::clock::operator==(date_independent::clock other) const
{
    return (this->hour == other.hour && this->min == other.min);
}

bool date_independent::clock::operator!=(date_independent::clock other) const
{
    return (this->hour != other.hour || this->min != other.min);
}

date_independent::clock::operator std::string() const
{
    boost::format format("%02d:%02d");
    format % this->hour % this->min;
    return format.str();
}