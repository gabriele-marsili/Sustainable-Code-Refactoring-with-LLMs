#if !defined(SPACE_AGE_H)
#define SPACE_AGE_H

#include <map>
#include <string>

namespace space_age {
  class space_age {
    static const int earth_orbital_period;
    static const std::map<std::string, long long> orbital_seconds;
    long long age_in_seconds;
  public:
    explicit space_age(long long seconds);
    long long seconds() const;
    double on_earth() const;
    double on_mercury() const;
    double on_venus() const;
    double on_mars() const;
    double on_jupiter() const;
    double on_saturn() const;
    double on_uranus() const;
    double on_neptune() const;
  private:
    double age_on(const std::string& planet) const;
  };
} // namespace space_age

#endif // SPACE_AGE_H
