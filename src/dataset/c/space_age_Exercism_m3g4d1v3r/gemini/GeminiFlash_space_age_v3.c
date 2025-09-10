#include "space_age.h"

#define SECONDS_IN_EARTH_YEAR 31557600.0f

static const double orbital_rates[] = {0.2408467, 0.61519726, 1.0,       1.8808158,
                                      11.862615, 29.447498,  84.016846, 164.79132};

float age(planet_t planet, int64_t seconds) {
    if (planet >= N_PLANETS) return -1.0f;
    return (float)(seconds / SECONDS_IN_EARTH_YEAR) / (float)orbital_rates[planet];
}