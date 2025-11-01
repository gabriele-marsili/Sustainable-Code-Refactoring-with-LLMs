#include "space_age.h"

static const float orbital_periods[] = {
    0.2408467f,   // Mercury
    0.61519726f,  // Venus
    1.0f,         // Earth
    1.8808158f,   // Mars
    11.862615f,   // Jupiter
    29.447498f,   // Saturn
    84.016846f,   // Uranus
    164.79132f    // Neptune
};

float age(planet_t planet, int64_t seconds) {
  if (planet < MERCURY || planet > NEPTUNE) {
    return -1.0f;
  }

  const float earth_year = (float)seconds / 31557600.0f;
  return earth_year / orbital_periods[planet];
}