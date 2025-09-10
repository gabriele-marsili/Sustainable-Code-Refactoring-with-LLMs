#include "space_age.h"

#include <stdint.h>

static const unsigned long planet_year_lengths[] = {
    7600544,    // mercury
    19414149,   // venus
    31557600,   // earth
    59354033,   // mars
    374355659,  // jupiter
    929292363,  // saturn
    2651370019, // uranus
    5200418560  // neptune
};

double convert_planet_age(enum planet p, unsigned long int age) {
    if (p < mercury || p > neptune) {
        return 0.0;
    }
    return (double)age / planet_year_lengths[p];
}