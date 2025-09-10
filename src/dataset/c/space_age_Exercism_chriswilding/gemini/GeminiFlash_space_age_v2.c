#include "space_age.h"

static const float orbital_period_factors[] = {
    seconds_in_earth_on_year * 0.2408467f,   // Mercury
    seconds_in_earth_on_year * 0.61519726f,  // Venus
    seconds_in_earth_on_year * 1.0f,          // Earth
    seconds_in_earth_on_year * 1.8808158f,   // Mars
    seconds_in_earth_on_year * 11.862615f,  // Jupiter
    seconds_in_earth_on_year * 29.447498f,  // Saturn
    seconds_in_earth_on_year * 84.016846f,  // Uranus
    seconds_in_earth_on_year * 164.79132f   // Neptune
};

float convert_planet_age(planet_t planet, int64_t input) {
  return (float)input / orbital_period_factors[planet];
}