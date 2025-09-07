#include "clock.h"
#include <sstream>
#include <iomanip>

inline int positiveModulo(int a, int mod)
{
    const int result = a % mod;
    return result < 0 ? result + mod : result;
}

date_independent::clock::clock() : hour(0), min(0) {}

date_independent::clock date_independent::clock::at(int hour)
{
    date_independent::clock newClock;
    newClock.hour = positiveModulo(hour, 24);
    newClock.min = 0;
    return newClock;
}

date_independent::clock date_independent::clock::at(int hour, int min)
{
    int totalMinutes = hour * 60 + min;
    date_independent::clock newClock;
    newClock.hour = positiveModulo(totalMinutes / 60, 24);
    newClock.min = positiveModulo(totalMinutes, 60);
    return newClock;
}

date_independent::clock date_independent::clock::plus(int min)
{
    int totalMinutes = this->hour * 60 + this->min + min;
    this->hour = positiveModulo(totalMinutes / 60, 24);
    this->min = positiveModulo(totalMinutes, 60);
    return *this;
}

date_independent::clock date_independent::clock::minus(int min)
{
    int totalMinutes = this->hour * 60 + this->min - min;
    this->hour = positiveModulo(totalMinutes / 60, 24);
    this->min = positiveModulo(totalMinutes, 60);
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