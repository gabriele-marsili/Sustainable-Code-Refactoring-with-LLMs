#include "clock.h"
#include <string>

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
    return {hour, 0};
}

date_independent::clock date_independent::clock::at(int hour, int min)
{
    return {hour, min};
}

date_independent::clock& date_independent::clock::plus(int min)
{
    this->min += min;
    if (this->min >= 60 || this->min < 0)
    {
        int hourOffset = this->min / 60;
        if (this->min < 0) hourOffset--;
        this->hour = positiveModulo(this->hour + hourOffset, 24);
        this->min = positiveModulo(this->min, 60);
    }
    return *this;
}

date_independent::clock& date_independent::clock::minus(int min)
{
    return plus(-min);
}

bool date_independent::clock::operator==(const date_independent::clock& other) const
{
    return hour == other.hour && min == other.min;
}

bool date_independent::clock::operator!=(const date_independent::clock& other) const
{
    return !(*this == other);
}

date_independent::clock::operator std::string() const
{
    std::string result(5, '0');
    result[0] = '0' + (hour / 10);
    result[1] = '0' + (hour % 10);
    result[2] = ':';
    result[3] = '0' + (min / 10);
    result[4] = '0' + (min % 10);
    return result;
}