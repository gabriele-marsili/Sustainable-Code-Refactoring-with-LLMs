#include "space_age.h"

const double earth_year_in_seconds = 31557600.0;

double orbital_periods[] = {
    0.2408467 * earth_year_in_seconds,   // Mercury
    0.61519726 * earth_year_in_seconds,  // Venus
    earth_year_in_seconds,               // Earth
    1.8808158 * earth_year_in_seconds,   // Mars
    11.862615 * earth_year_in_seconds,  // Jupiter
    29.447498 * earth_year_in_seconds,  // Saturn
    84.016846 * earth_year_in_seconds,  // Uranus
    164.79132 * earth_year_in_seconds   // Neptune (added for completeness)
};

float age(planet_t planet, int64_t seconds) {
    if (planet >= N_PLANETS) return -1.0f;
    return (float)(seconds / orbital_periods[planet]);
}