#include "space_age.h"

#define EARTH_YEAR_INV (1.0 / 31557600.0)

static const float orb_period_inv[COUNT_PLANETS] = {
		1.0,
		1.0 / 0.2408467,
		1.0 / 0.61519726,
		1.0 / 1.8808158,
		1.0 / 11.862615,
		1.0 / 29.447498,
		1.0 / 84.016846,
		1.0 / 164.79132
	};

float convert_planet_age(enum planets planet, long int secs)
{
	return secs * EARTH_YEAR_INV * orb_period_inv[planet];
}