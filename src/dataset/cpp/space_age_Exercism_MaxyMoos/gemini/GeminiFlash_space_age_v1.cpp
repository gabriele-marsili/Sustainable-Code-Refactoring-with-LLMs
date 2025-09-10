#include "space_age.h"

namespace {
    constexpr double seconds_in_earth_year = 31557600.0;
    constexpr double mercury_orbital_period = 0.2408467;
    constexpr double venus_orbital_period = 0.61519726;
    constexpr double mars_orbital_period = 1.8808158;
    constexpr double jupiter_orbital_period = 11.862615;
    constexpr double saturn_orbital_period = 29.447498;
    constexpr double uranus_orbital_period = 84.016846;
    constexpr double neptune_orbital_period = 164.79132;
}

space_age::space_age(unsigned long int ageInSeconds) : ageInSeconds(ageInSeconds) {}

unsigned long int space_age::seconds() const {
    return ageInSeconds;
}

double space_age::on_earth() const {
    return ageInSeconds / seconds_in_earth_year;
}

double space_age::on_mercury() const {
    return ageInSeconds / (seconds_in_earth_year * mercury_orbital_period);
}

double space_age::on_venus() const {
    return ageInSeconds / (seconds_in_earth_year * venus_orbital_period);
}

double space_age::on_mars() const {
    return ageInSeconds / (seconds_in_earth_year * mars_orbital_period);
}

double space_age::on_jupiter() const {
    return ageInSeconds / (seconds_in_earth_year * jupiter_orbital_period);
}

double space_age::on_saturn() const {
    return ageInSeconds / (seconds_in_earth_year * saturn_orbital_period);
}

double space_age::on_uranus() const {
    return ageInSeconds / (seconds_in_earth_year * uranus_orbital_period);
}

double space_age::on_neptune() const {
    return ageInSeconds / (seconds_in_earth_year * neptune_orbital_period);
}