#include "clock.h"
#include <iomanip>
#include <sstream>

constexpr int positiveModulo(int a, int mod) noexcept
{
    return ((a % mod) + mod) % mod;
}

date_independent::clock::clock() noexcept : hour(0), min(0)
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

date_independent::clock date_independent::clock::plus(int min)
{
    int totalMinutes = this->min + min;
    int hourOffset = totalMinutes / 60;
    
    this->hour = positiveModulo(this->hour + hourOffset, 24);
    this->min = positiveModulo(totalMinutes, 60);
    
    return *this;
}

date_independent::clock date_independent::clock::minus(int min)
{
    int totalMinutes = this->min - min;
    int hourOffset = (totalMinutes < 0) ? (totalMinutes - 59) / 60 : 0;
    
    this->hour = positiveModulo(this->hour + hourOffset, 24);
    this->min = positiveModulo(totalMinutes, 60);
    
    return *this;
}

bool date_independent::clock::operator==(const date_independent::clock& other) const noexcept
{
    return (this->hour == other.hour && this->min == other.min);
}

bool date_independent::clock::operator!=(const date_independent::clock& other) const noexcept
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