#include "space_age.h"

static const float EARTH_YEAR_SECONDS_INV = 1.0f / 31557600.0f;
static const float ORBITAL_PERIODS_INV[] = {
    [MERCURY] = 1.0f / 0.2408467f,
    [VENUS] = 1.0f / 0.61519726f,
    [EARTH] = 1.0f,
    [MARS] = 1.0f / 1.8808158f,
    [JUPITER] = 1.0f / 11.862615f,
    [SATURN] = 1.0f / 29.447498f,
    [URANUS] = 1.0f / 84.016846f,
    [NEPTUNE] = 1.0f / 164.79132f
};

float age(planet_t planet, int64_t seconds)
{
    if (planet < MERCURY || planet > NEPTUNE) {
        return -1.0f;
    }
    
    return (float)seconds * EARTH_YEAR_SECONDS_INV * ORBITAL_PERIODS_INV[planet];
}