#include "space_age.h"

static const float EARTH_YEAR_SECONDS_INV = 1.0f / 31557600.0f;
static const float PLANET_FACTORS[] = {
    [MERCURY] = EARTH_YEAR_SECONDS_INV / 0.2408467f,
    [VENUS] = EARTH_YEAR_SECONDS_INV / 0.61519726f,
    [EARTH] = EARTH_YEAR_SECONDS_INV,
    [MARS] = EARTH_YEAR_SECONDS_INV / 1.8808158f,
    [JUPITER] = EARTH_YEAR_SECONDS_INV / 11.862615f,
    [SATURN] = EARTH_YEAR_SECONDS_INV / 29.447498f,
    [URANUS] = EARTH_YEAR_SECONDS_INV / 84.016846f,
    [NEPTUNE] = EARTH_YEAR_SECONDS_INV / 164.79132f
};

float age(planet_t planet, int64_t seconds)
{
    if (planet < 0 || planet >= sizeof(PLANET_FACTORS) / sizeof(PLANET_FACTORS[0]) || PLANET_FACTORS[planet] == 0.0f)
        return -1.0f;
    
    return seconds * PLANET_FACTORS[planet];
}