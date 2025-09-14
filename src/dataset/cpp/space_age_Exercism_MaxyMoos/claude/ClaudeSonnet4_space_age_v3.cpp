#include "space_age.h"

namespace {
    constexpr double EARTH_YEAR_SECONDS = 31557600.0;
    constexpr double MERCURY_RATIO = 0.2408467;
    constexpr double VENUS_RATIO = 0.61519726;
    constexpr double MARS_RATIO = 1.8808158;
    constexpr double JUPITER_RATIO = 11.862615;
    constexpr double SATURN_RATIO = 29.447498;
    constexpr double URANUS_RATIO = 84.016846;
    constexpr double NEPTUNE_RATIO = 164.79132;
}

space_age::space_age(unsigned long int ageInSeconds)
    : ageInSeconds(ageInSeconds), earthAge(ageInSeconds / EARTH_YEAR_SECONDS)
{
}

unsigned long int space_age::seconds() const
{
    return ageInSeconds;
}

double space_age::on_earth() const
{
    return earthAge;
}

double space_age::on_mercury() const
{
    return earthAge / MERCURY_RATIO;
}

double space_age::on_venus() const
{
    return earthAge / VENUS_RATIO;
}

double space_age::on_mars() const
{
    return earthAge / MARS_RATIO;
}

double space_age::on_jupiter() const
{
    return earthAge / JUPITER_RATIO;
}

double space_age::on_saturn() const
{
    return earthAge / SATURN_RATIO;
}

double space_age::on_uranus() const
{
    return earthAge / URANUS_RATIO;
}

double space_age::on_neptune() const
{
    return earthAge / NEPTUNE_RATIO;
}