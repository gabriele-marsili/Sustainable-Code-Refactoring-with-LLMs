#include "space_age.h"

static const long int EARTH_YEAR = 31557600;

static const float inv_orb_period[COUNT_PLANETS] = {
    1.0f / EARTH_YEAR,
    1.0f / (0.2408467f * EARTH_YEAR),
    1.0f / (0.61519726f * EARTH_YEAR),
    1.0f / (1.8808158f * EARTH_YEAR),
    1.0f / (11.862615f * EARTH_YEAR),
    1.0f / (29.447498f * EARTH_YEAR),
    1.0f / (84.016846f * EARTH_YEAR),
    1.0f / (164.79132f * EARTH_YEAR)
};

float convert_planet_age(enum planets planet, long int secs)
{
    return (float)secs * inv_orb_period[planet];
}