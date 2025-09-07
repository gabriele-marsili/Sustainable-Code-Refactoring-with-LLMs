#include "clock.h"
#include <iomanip>
#include <sstream>

constexpr int positiveModulo(int a, int mod) noexcept
{
    return (a % mod + mod) % mod;
}

date_independent::clock::clock() noexcept : hour(0), min(0)
{
}

date_independent::clock date_independent::clock::at(int hour) noexcept
{
    return {hour, 0};
}

date_independent::clock date_independent::clock::at(int hour, int min) noexcept
{
    return {hour, min};
}

date_independent::clock& date_independent::clock::plus(int min) noexcept
{
    this->min += min;
    if (this->min >= 60 || this->min < 0)
    {
        const int hourOffset = this->min / 60;
        this->hour = positiveModulo(this->hour + hourOffset, 24);
        this->min = positiveModulo(this->min, 60);
    }
    return *this;
}

date_independent::clock& date_independent::clock::minus(int min) noexcept
{
    this->min -= min;
    if (this->min < 0)
    {
        const int hourOffset = (this->min - 59) / 60;
        this->hour = positiveModulo(this->hour + hourOffset, 24);
        this->min = positiveModulo(this->min, 60);
    }
    return *this;
}

bool date_independent::clock::operator==(const date_independent::clock& other) const noexcept
{
    return hour == other.hour && min == other.min;
}

bool date_independent::clock::operator!=(const date_independent::clock& other) const noexcept
{
    return !(*this == other);
}

date_independent::clock::operator std::string() const
{
    std::ostringstream oss;
    oss << std::setfill('0') << std::setw(2) << hour << ':' 
        << std::setfill('0') << std::setw(2) << min;
    return oss.str();
}