#include "clock.h"
#include <sstream>
#include <iomanip>

inline int positiveModulo(int a, int mod)
{
    a %= mod;
    return a < 0 ? a + mod : a;
}

date_independent::clock::clock() : hour(0), min(0) {}

date_independent::clock date_independent::clock::at(int hour)
{
    return date_independent::clock::at(hour, 0);
}

date_independent::clock date_independent::clock::at(int hour, int min)
{
    date_independent::clock newClock;
    newClock.hour = positiveModulo(hour, 24);
    newClock.min = positiveModulo(min, 60);

    int extra_hours = min / 60;
    newClock.hour = positiveModulo(newClock.hour + extra_hours, 24);
    newClock.min = positiveModulo(min, 60);
    return newClock;
}

date_independent::clock date_independent::clock::plus(int min)
{
    this->min += min;
    this->hour += this->min / 60;
    this->min = positiveModulo(this->min, 60);
    this->hour = positiveModulo(this->hour, 24);
    return *this;
}

date_independent::clock date_independent::clock::minus(int min)
{
    this->min -= min;
    this->hour += this->min / 60;
    this->min = positiveModulo(this->min, 60);
    this->hour = positiveModulo(this->hour, 24);
    return *this;
}

bool date_independent::clock::operator==(const date_independent::clock& other) const
{
    return (this->hour == other.hour && this->min == other.min);
}

bool date_independent::clock::operator!=(const date_independent::clock& other) const
{
    return (this->hour != other.hour || this->min != other.min);
}

date_independent::clock::operator std::string() const
{
    std::stringstream ss;
    ss << std::setw(2) << std::setfill('0') << this->hour << ":" << std::setw(2) << std::setfill('0') << this->min;
    return ss.str();
}