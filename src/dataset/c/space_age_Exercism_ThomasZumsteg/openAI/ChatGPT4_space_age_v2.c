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

double convert_planet_age(enum planet p, unsigned long int age) {
    return (double)age / year_lengths[p];
}