#include "space_age.h"

const long int EARTH_YEAR = 31557600;

const float orb_period[COUNT_PLANETS] = {
		1.0f,
		0.2408467f,
		0.61519726f,
		1.8808158f,
		11.862615f,
		29.447498f,
		84.016846f,
		164.79132f
	};

float convert_planet_age(enum planets planet, long int secs)
{
	return (float)secs / (orb_period[planet] * EARTH_YEAR);
}