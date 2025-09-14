#include "space_age.h"

static const unsigned long planet_year_lengths[] = {
    7600544,      // mercury
    19414149,     // venus
    31557600,     // earth
    59354033,     // mars
    374355659,    // jupiter
    929292363,    // saturn
    2651370019,   // uranus
    5200418560    // neptune
};

unsigned long get_year_len(enum planet p) {
    if (p < 0 || p >= sizeof(planet_year_lengths) / sizeof(planet_year_lengths[0])) {
        return 0;
    }
    return planet_year_lengths[p];
}

double convert_planet_age(enum planet p, unsigned long int age) {
    unsigned long year_len = get_year_len(p);
    return year_len ? (double)age / year_len : 0.0;
}