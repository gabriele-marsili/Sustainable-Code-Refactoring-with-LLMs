#include "clock.h"
#include <iomanip>
#include <sstream>

inline int positiveModulo(int a, int mod)
{
    return (a % mod + mod) % mod;
}

date_independent::clock::clock() : hour(0), min(0) {}

date_independent::clock date_independent::clock::at(int hour)
{
    return date_independent::clock{positiveModulo(hour, 24), 0};
}

date_independent::clock date_independent::clock::at(int hour, int min)
{
    return date_independent::clock{positiveModulo(hour + min / 60, 24), positiveModulo(min, 60)};
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

bool date_independent::clock::operator==(date_independent::clock other) const
{
    return this->hour == other.hour && this->min == other.min;
}

bool date_independent::clock::operator!=(date_independent::clock other) const
{
    return !(*this == other);
}

date_independent::clock::operator std::string() const
{
    std::ostringstream oss;
    oss << std::setw(2) << std::setfill('0') << this->hour << ":"
        << std::setw(2) << std::setfill('0') << this->min;
    return oss.str();
}