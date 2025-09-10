#include "space_age.h"

#define EARTH_YEAR_IN_SECONDS 31557600.0f

float age(planet_t planet, int64_t seconds) {
  float years;
  switch (planet) {
  case MERCURY:
    years = (float)seconds / EARTH_YEAR_IN_SECONDS / 0.2408467f;
    break;
  case VENUS:
    years = (float)seconds / EARTH_YEAR_IN_SECONDS / 0.61519726f;
    break;
  case EARTH:
    years = (float)seconds / EARTH_YEAR_IN_SECONDS;
    break;
  case MARS:
    years = (float)seconds / EARTH_YEAR_IN_SECONDS / 1.8808158f;
    break;
  case JUPITER:
    years = (float)seconds / EARTH_YEAR_IN_SECONDS / 11.862615f;
    break;
  case SATURN:
    years = (float)seconds / EARTH_YEAR_IN_SECONDS / 29.447498f;
    break;
  case URANUS:
    years = (float)seconds / EARTH_YEAR_IN_SECONDS / 84.016846f;
    break;
  case NEPTUNE:
    years = (float)seconds / EARTH_YEAR_IN_SECONDS / 164.79132f;
    break;
  default:
    return -1.0f;
  }
  return years;
}