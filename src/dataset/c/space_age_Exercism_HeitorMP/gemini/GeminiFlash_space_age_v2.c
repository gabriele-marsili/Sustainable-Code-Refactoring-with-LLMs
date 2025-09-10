#include "space_age.h"

#define EARTH_YEAR_IN_SECONDS 31557600.0

float age(planet_t planet, int64_t seconds) {
  float orbital_period;

  switch (planet) {
  case MERCURY:
    orbital_period = 0.2408467f;
    break;
  case VENUS:
    orbital_period = 0.61519726f;
    break;
  case EARTH:
    return (float)(seconds) / EARTH_YEAR_IN_SECONDS;
  case MARS:
    orbital_period = 1.8808158f;
    break;
  case JUPITER:
    orbital_period = 11.862615f;
    break;
  case SATURN:
    orbital_period = 29.447498f;
    break;
  case URANUS:
    orbital_period = 84.016846f;
    break;
  case NEPTUNE:
    orbital_period = 164.79132f;
    break;
  default:
    return -1.0f;
  }

  return (float)(seconds) / EARTH_YEAR_IN_SECONDS / orbital_period;
}