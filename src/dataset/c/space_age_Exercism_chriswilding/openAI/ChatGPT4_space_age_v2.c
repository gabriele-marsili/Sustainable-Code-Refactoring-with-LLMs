#include "space_age.h"

static const float orbital_periods[] = {0.2408467f, 0.61519726f, 1.0f, 1.8808158f, 11.862615f, 29.447498f, 84.016846f, 164.79132f};
static const float inverse_seconds_in_earth_year = 1.0f / 31557600.0f;

float convert_planet_age(planet_t planet, int64_t input)
{
    return input * inverse_seconds_in_earth_year / orbital_periods[planet];
}