#include "clock.h"
#include <string>
#include <iomanip>
#include <sstream>

inline int positiveModulo(int a, int mod)
{
    int result = a % mod;
    return result < 0 ? result + mod : result;
}

date_independent::clock::clock() : hour(0), min(0)
{
}

date_independent::clock date_independent::clock::at(int hour)
{
    date_independent::clock newClock;
    newClock.hour = hour;
    newClock.min = 0;
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
    if (this->min >= 60 || this->min < 0)
    {
        int hourOffset = this->min / 60;
        if (this->min < 0 && this->min % 60 != 0) {
            hourOffset--;
        }
        this->hour = positiveModulo(this->hour + hourOffset, 24);
        this->min = positiveModulo(this->min, 60);
    }
    return *this;
}

date_independent::clock date_independent::clock::minus(int min)
{
    return plus(-min);
}

bool date_independent::clock::operator==(const date_independent::clock& other) const
{
    return (this->hour == other.hour && this->min == other.min);
}

bool date_independent::clock::operator!=(const date_independent::clock& other) const
{
    return !(*this == other);
}

date_independent::clock::operator std::string() const
{
    std::ostringstream oss;
    oss << std::setfill('0') << std::setw(2) << this->hour 
        << ':' << std::setw(2) << this->min;
    return oss.str();
}