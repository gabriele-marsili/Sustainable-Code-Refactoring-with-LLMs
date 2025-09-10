#include "space_age.h"

static const unsigned long year_lengths[] = {
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
    return (p >= mercury && p <= neptune) ? year_lengths[p] : 0;
}

double convert_planet_age(enum planet p, unsigned long int age) {
    unsigned long year_len = get_year_len(p);
    return year_len ? (double)age / year_len : 0.0;
}