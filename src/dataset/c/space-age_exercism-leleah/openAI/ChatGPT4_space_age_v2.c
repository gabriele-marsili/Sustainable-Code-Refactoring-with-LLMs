#include "space_age.h"

static const float ORBITAL_PERIODS[] = {0.2408467, 0.61519726, 1.0, 1.8808158, 11.862615, 29.447498, 84.016846, 164.79132};
#define SECONDS_IN_EARTH_YEAR 31557600.0f

float age(planet_t planet, int64_t seconds)
{
    if (planet >= MERCURY && planet <= NEPTUNE) // Assuming planet_t is an enum with values from MERCURY to NEPTUNE
    {
        return (seconds / SECONDS_IN_EARTH_YEAR) / ORBITAL_PERIODS[planet];
    }
    return -1.0f;
}