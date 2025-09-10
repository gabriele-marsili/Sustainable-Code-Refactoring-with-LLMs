#include "space_age.h"

#define EARTH_YEAR_IN_SECONDS 31557600.0

float age(planet_t planet, int64_t seconds) {
    float years;
    switch (planet) {
        case MERCURY:
            years = seconds / (EARTH_YEAR_IN_SECONDS * 0.2408467);
            break;
        case VENUS:
            years = seconds / (EARTH_YEAR_IN_SECONDS * 0.61519726);
            break;
        case EARTH:
            years = seconds / EARTH_YEAR_IN_SECONDS;
            break;
        case MARS:
            years = seconds / (EARTH_YEAR_IN_SECONDS * 1.8808158);
            break;
        case JUPITER:
            years = seconds / (EARTH_YEAR_IN_SECONDS * 11.862615);
            break;
        case SATURN:
            years = seconds / (EARTH_YEAR_IN_SECONDS * 29.447498);
            break;
        case URANUS:
            years = seconds / (EARTH_YEAR_IN_SECONDS * 84.016846);
            break;
        case NEPTUNE:
            years = seconds / (EARTH_YEAR_IN_SECONDS * 164.79132);
            break;
        default:
            return -1;
    }
    return years;
}