#include "space_age.h"

static const double orbital_periods[] = {0.2408467, 0.61519726, 1.0, 1.8808158, 11.862615, 29.447498, 84.016846, 164.79132};

static const double seconds_in_earth_on_year = 31557600.0;

float convert_planet_age(planet_t planet, int64_t input) {
  return (float)(input / (seconds_in_earth_on_year * orbital_periods[planet]));
}