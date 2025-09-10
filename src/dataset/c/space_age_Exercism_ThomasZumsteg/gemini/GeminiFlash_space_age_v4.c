#include "space_age.h"

#include <stdint.h>

static const unsigned long planet_year_lengths[] = {
    [mercury] = 7600544,
    [venus] = 19414149,
    [earth] = 31557600,
    [mars] = 59354033,
    [jupiter] = 374355659,
    [saturn] = 929292363,
    [uranus] = 2651370019,
    [neptune] = 5200418560
};

unsigned long get_year_len(enum planet p) {
    if (p >= mercury && p <= neptune) {
        return planet_year_lengths[p];
    } else {
        return 0;
    }
}

double convert_planet_age(enum planet p, unsigned long int age) {
    return (double)age / (double)get_year_len(p);
}