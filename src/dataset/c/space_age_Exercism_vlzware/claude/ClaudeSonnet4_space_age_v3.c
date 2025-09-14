#include "space_age.h"

static const long int EARTH_YEAR = 31557600;

static const float inv_orb_period[COUNT_PLANETS] = {
    1.0f / 1.0f,
    1.0f / 0.2408467f,
    1.0f / 0.61519726f,
    1.0f / 1.8808158f,
    1.0f / 11.862615f,
    1.0f / 29.447498f,
    1.0f / 84.016846f,
    1.0f / 164.79132f
};

static const float earth_year_inv = 1.0f / EARTH_YEAR;

float convert_planet_age(enum planets planet, long int secs)
{
    return secs * earth_year_inv * inv_orb_period[planet];
}