#include "space_age.h"

static const double orbital_rates[] = {
    0.2408467, 0.61519726, 1.0, 1.8808158, 11.862615, 29.447498, 84.016846, 164.79132};

float age(planet_t planet, int64_t seconds) {
    if ((unsigned)planet >= N_PLANETS) return -1.0f;
    static const double seconds_in_earth_year = 31557600.0; // Precomputed constant
    return (float)(seconds / (seconds_in_earth_year * orbital_rates[planet]));
}