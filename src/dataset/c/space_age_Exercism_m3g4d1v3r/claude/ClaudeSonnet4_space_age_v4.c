#include "space_age.h"

static const double SECONDS_PER_EARTH_YEAR = 31557600.0; // 60 * 60 * 24 * 365.25

static const double inverse_orbital_rates[] = {
    1.0 / 0.2408467,   // MERCURY
    1.0 / 0.61519726,  // VENUS
    1.0,               // EARTH
    1.0 / 1.8808158,   // MARS
    1.0 / 11.862615,   // JUPITER
    1.0 / 29.447498,   // SATURN
    1.0 / 84.016846,   // URANUS
    1.0 / 164.79132    // NEPTUNE
};

float age(planet_t planet, int64_t seconds) {
    if (planet >= N_PLANETS) return -1.0f;
    return (float)((seconds / SECONDS_PER_EARTH_YEAR) * inverse_orbital_rates[planet]);
}