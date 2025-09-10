#include "space_age.h"

namespace {
    constexpr double earth_year_in_seconds = 31557600.0;
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
    return ageInSeconds / earth_year_in_seconds;
}

double space_age::on_mercury() const {
    return ageInSeconds / (earth_year_in_seconds * mercury_orbital_period);
}

double space_age::on_venus() const {
    return ageInSeconds / (earth_year_in_seconds * venus_orbital_period);
}

double space_age::on_mars() const {
    return ageInSeconds / (earth_year_in_seconds * mars_orbital_period);
}

double space_age::on_jupiter() const {
    return ageInSeconds / (earth_year_in_seconds * jupiter_orbital_period);
}

double space_age::on_saturn() const {
    return ageInSeconds / (earth_year_in_seconds * saturn_orbital_period);
}

double space_age::on_uranus() const {
    return ageInSeconds / (earth_year_in_seconds * uranus_orbital_period);
}

double space_age::on_neptune() const {
    return ageInSeconds / (earth_year_in_seconds * neptune_orbital_period);
}