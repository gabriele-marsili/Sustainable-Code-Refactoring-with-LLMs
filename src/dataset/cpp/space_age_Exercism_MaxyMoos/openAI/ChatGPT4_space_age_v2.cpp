#include "space_age.h"

constexpr double EARTH_YEAR_IN_SECONDS = 31557600.0;
constexpr double MERCURY_YEAR_RATIO = 0.2408467;
constexpr double VENUS_YEAR_RATIO = 0.61519726;
constexpr double MARS_YEAR_RATIO = 1.8808158;
constexpr double JUPITER_YEAR_RATIO = 11.862615;
constexpr double SATURN_YEAR_RATIO = 29.447498;
constexpr double URANUS_YEAR_RATIO = 84.016846;
constexpr double NEPTUNE_YEAR_RATIO = 164.79132;

space_age::space_age(unsigned long int ageInSeconds) : ageInSeconds(ageInSeconds) {}

unsigned long int space_age::seconds() const {
    return ageInSeconds;
}

double space_age::on_earth() const {
    return ageInSeconds / EARTH_YEAR_IN_SECONDS;
}

double space_age::on_mercury() const {
    return ageInSeconds / (EARTH_YEAR_IN_SECONDS * MERCURY_YEAR_RATIO);
}

double space_age::on_venus() const {
    return ageInSeconds / (EARTH_YEAR_IN_SECONDS * VENUS_YEAR_RATIO);
}

double space_age::on_mars() const {
    return ageInSeconds / (EARTH_YEAR_IN_SECONDS * MARS_YEAR_RATIO);
}

double space_age::on_jupiter() const {
    return ageInSeconds / (EARTH_YEAR_IN_SECONDS * JUPITER_YEAR_RATIO);
}

double space_age::on_saturn() const {
    return ageInSeconds / (EARTH_YEAR_IN_SECONDS * SATURN_YEAR_RATIO);
}

double space_age::on_uranus() const {
    return ageInSeconds / (EARTH_YEAR_IN_SECONDS * URANUS_YEAR_RATIO);
}

double space_age::on_neptune() const {
    return ageInSeconds / (EARTH_YEAR_IN_SECONDS * NEPTUNE_YEAR_RATIO);
}