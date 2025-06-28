#if !defined(SPACE_AGE_H)
#define SPACE_AGE_H

#include <chrono>

namespace space_age {

using std::chrono::duration;

using earth_year = duration<double, std::ratio<31557600>>;
using mercury_year = duration<double, std::ratio<95006797749, 12500>>;
using venus_year = duration<double, std::ratio<728923640313, 37546>>;
using mars_year = duration<double, std::ratio<370962704313, 6250>>;
using jupiter_year = duration<double, std::ratio<93588914781, 250>>;
using saturn_year = duration<double, std::ratio<580807726803, 625>>;
using uranus_year = duration<double, std::ratio<1657106262081, 625>>;
using neptune_year = duration<double, std::ratio<650052320004, 125>>;

class space_age {
  std::chrono::seconds age_;

public:
  space_age(unsigned long age) : age_{age} {}
  unsigned seconds() const { return age_.count(); }
  double on_earth() const { return earth_year{age_}.count(); }
  double on_mercury() const { return mercury_year{age_}.count(); }
  double on_venus() const { return venus_year{age_}.count(); }
  double on_mars() const { return mars_year{age_}.count(); }
  double on_jupiter() const { return jupiter_year{age_}.count(); }
  double on_saturn() const { return saturn_year{age_}.count(); }
  double on_uranus() const { return uranus_year{age_}.count(); }
  double on_neptune() const { return neptune_year{age_}.count(); }
};

} // namespace space_age

#endif // SPACE_AGE_H
