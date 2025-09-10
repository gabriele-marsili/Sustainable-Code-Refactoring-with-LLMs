#include "space_age.h"

static const float orbital_period_factors[] = {
    1.0 / (31557600.0 * 0.2408467),   // Mercury
    1.0 / (31557600.0 * 0.61519726),  // Venus
    1.0 / 31557600.0,                 // Earth
    1.0 / (31557600.0 * 1.8808158),   // Mars
    1.0 / (31557600.0 * 11.862615),  // Jupiter
    1.0 / (31557600.0 * 29.447498),  // Saturn
    1.0 / (31557600.0 * 84.016846),  // Uranus
    1.0 / (31557600.0 * 164.79132)   // Neptune
};

float convert_planet_age(planet_t planet, int64_t input) {
  return input * orbital_period_factors[planet];
}