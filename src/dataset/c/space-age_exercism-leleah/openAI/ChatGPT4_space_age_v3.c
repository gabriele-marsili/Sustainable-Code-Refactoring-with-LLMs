#include "space_age.h"

static const float ORBITAL_PERIODS[] = {0.2408467f, 0.61519726f, 1.0f, 1.8808158f, 11.862615f, 29.447498f, 84.016846f, 164.79132f};
#define SECONDS_IN_EARTH_YEAR 31557600.0f

float age(planet_t planet, int64_t seconds)
{
    if (planet < 0 || planet >= 8) return -1.0f;
    return (seconds / SECONDS_IN_EARTH_YEAR) / ORBITAL_PERIODS[planet];
}