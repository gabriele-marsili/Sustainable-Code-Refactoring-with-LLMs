#include "space_age.h"

static const float inverse_orbital_periods[] = {
    4.1518264,    // 1 / (0.2408467 * 31557600)
    1.6284302,    // 1 / (0.61519726 * 31557600)
    3.1688765e-8, // 1 / (1.0 * 31557600)
    1.6847687e-8, // 1 / (1.8808158 * 31557600)
    2.6628507e-9, // 1 / (11.862615 * 31557600)
    1.0727537e-9, // 1 / (29.447498 * 31557600)
    3.7699111e-10,// 1 / (84.016846 * 31557600)
    1.9165965e-10 // 1 / (164.79132 * 31557600)
};

float convert_planet_age(planet_t planet, int64_t input)
{
    return (float)input * inverse_orbital_periods[planet];
}