#include "space_age.h"

static const double SECONDS_PER_EARTH_YEAR = 31557600.0; // 60 * 60 * 24 * 365.25
static const double orbital_rates[] = {
    0.2408467,   // MERCURY
    0.61519726,  // VENUS
    1.0,         // EARTH
    1.8808158,   // MARS
    11.862615,   // JUPITER
    29.447498,   // SATURN
    84.016846,   // URANUS
    164.79132    // NEPTUNE
};

float age(planet_t planet, int64_t seconds) {
    if (planet >= N_PLANETS) return -1.0f;
    return (float)((seconds / SECONDS_PER_EARTH_YEAR) / orbital_rates[planet]);
}