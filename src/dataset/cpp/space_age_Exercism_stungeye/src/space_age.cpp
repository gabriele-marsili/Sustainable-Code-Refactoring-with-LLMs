#include "space_age.h"
#include <map>
#include <string>

namespace space_age {
  const int space_age::earth_orbital_period = 31557600;

  const std::map<std::string, long long> space_age::orbital_seconds = {
    {"earth",   earth_orbital_period},
    {"mercury", 0.2408467  * earth_orbital_period},
    {"venus",   0.61519726 * earth_orbital_period},
    {"mars",    1.8808158  * earth_orbital_period},
    {"jupiter", 11.862615  * earth_orbital_period},
    {"saturn",  29.447498  * earth_orbital_period},
    {"uranus",  84.016846  * earth_orbital_period},
    {"neptune", 164.79132  * earth_orbital_period},
  };

  space_age::space_age(long long seconds) {
    age_in_seconds = seconds;
  }

  long long space_age::seconds() const {
    return age_in_seconds;
  }

  double space_age::age_on(const std::string& planet) const {
    return double(age_in_seconds) / orbital_seconds.at(planet);
  }

  double space_age::on_earth() const {
    return age_on("earth");
  }

  double space_age::on_mercury() const {
    return age_on("mercury");
  }

  double space_age::on_venus() const {
    return age_on("venus");
  }

  double space_age::on_mars() const {
    return age_on("mars");
  }

  double space_age::on_jupiter() const {
    return age_on("jupiter");
  }

  double space_age::on_saturn() const {
    return age_on("saturn");
  }

  double space_age::on_uranus() const {
    return age_on("uranus");
  }

  double space_age::on_neptune() const {
    return age_on("neptune");
  }
} // namespace space_age
