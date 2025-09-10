#include "space_age.h"

#include <stdint.h>

float age(planet_t planet, int64_t seconds) {
  static const double earth_year_seconds = 31557600.0;
  double orbital_period;

  switch (planet) {
  case MERCURY:
    orbital_period = 0.2408467;
    break;
  case VENUS:
    orbital_period = 0.61519726;
    break;
  case EARTH:
    return (float)(seconds / earth_year_seconds);
  case MARS:
    orbital_period = 1.8808158;
    break;
  case JUPITER:
    orbital_period = 11.862615;
    break;
  case SATURN:
    orbital_period = 29.447498;
    break;
  case URANUS:
    orbital_period = 84.016846;
    break;
  case NEPTUNE:
    orbital_period = 164.79132;
    break;
  default:
    return -1.0f;
  }

  return (float)(seconds / earth_year_seconds / orbital_period);
}