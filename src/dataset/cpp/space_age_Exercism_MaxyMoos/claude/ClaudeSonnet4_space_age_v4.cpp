#include "space_age.h"

namespace {
    constexpr double EARTH_YEAR_SECONDS = 31557600.0;
    constexpr double MERCURY_RATIO = 1.0 / 0.2408467;
    constexpr double VENUS_RATIO = 1.0 / 0.61519726;
    constexpr double MARS_RATIO = 1.0 / 1.8808158;
    constexpr double JUPITER_RATIO = 1.0 / 11.862615;
    constexpr double SATURN_RATIO = 1.0 / 29.447498;
    constexpr double URANUS_RATIO = 1.0 / 84.016846;
    constexpr double NEPTUNE_RATIO = 1.0 / 164.79132;
}

space_age::space_age(unsigned long int ageInSeconds) : ageInSeconds(ageInSeconds) {}

unsigned long int space_age::seconds() const
{
    return ageInSeconds;
}

double space_age::on_earth() const
{
    return ageInSeconds / EARTH_YEAR_SECONDS;
}

double space_age::on_mercury() const
{
    return (ageInSeconds / EARTH_YEAR_SECONDS) * MERCURY_RATIO;
}

double space_age::on_venus() const
{
    return (ageInSeconds / EARTH_YEAR_SECONDS) * VENUS_RATIO;
}

double space_age::on_mars() const
{
    return (ageInSeconds / EARTH_YEAR_SECONDS) * MARS_RATIO;
}

double space_age::on_jupiter() const
{
    return (ageInSeconds / EARTH_YEAR_SECONDS) * JUPITER_RATIO;
}

double space_age::on_saturn() const
{
    return (ageInSeconds / EARTH_YEAR_SECONDS) * SATURN_RATIO;
}

double space_age::on_uranus() const
{
    return (ageInSeconds / EARTH_YEAR_SECONDS) * URANUS_RATIO;
}

double space_age::on_neptune() const
{
    return (ageInSeconds / EARTH_YEAR_SECONDS) * NEPTUNE_RATIO;
}