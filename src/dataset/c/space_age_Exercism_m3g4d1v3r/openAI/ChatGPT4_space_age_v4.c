#include "space_age.h"

static const double ORBITAL_RATES[] = {0.2408467, 0.61519726, 1.0, 1.8808158, 11.862615, 29.447498, 84.016846, 164.79132};
static const double SECONDS_IN_EARTH_YEAR = 31557600.0;

float age(planet_t planet, int64_t seconds) {
    return (planet < N_PLANETS && planet >= 0) ? (float)(seconds / (SECONDS_IN_EARTH_YEAR * ORBITAL_RATES[planet])) : -1.0f;
}