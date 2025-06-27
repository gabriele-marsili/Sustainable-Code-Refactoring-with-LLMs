#ifndef SPACE_AGE_H
#define SPACE_AGE_H

#include <stdint.h>

typedef enum planet {
    MERCURY,
    VENUS,
    EARTH,
    MARS,
    JUPITER,
    SATURN,
    URANUS,
    NEPTUNE,
    N_PLANETS
} planet_t;

extern planet_t planets[];
extern double orbital_rates[];

float age(planet_t planet, int64_t seconds);

#endif
