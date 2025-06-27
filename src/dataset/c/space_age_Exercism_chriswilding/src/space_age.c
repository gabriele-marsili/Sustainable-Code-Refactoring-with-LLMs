#include "space_age.h"

float orbital_periods[] = {0.2408467, 0.61519726, 1.0, 1.8808158, 11.862615, 29.447498, 84.016846, 164.79132};

int64_t seconds_in_earth_on_year = 31557600;

float convert_planet_age(planet_t planet, int64_t input)
{
  float orbital_period = orbital_periods[planet];
  return input / (seconds_in_earth_on_year * orbital_period);
}
