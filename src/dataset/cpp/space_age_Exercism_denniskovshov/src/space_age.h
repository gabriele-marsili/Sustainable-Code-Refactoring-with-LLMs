#if !defined(SPACE_AGE_H)
#define SPACE_AGE_H

#include <cstdint>

namespace space_age {
    typedef std::int64_t age_in_seconds;
    typedef double age_in_years;

    static constexpr double secs_in_earth_year = 31557600;
    static constexpr double earth_years_on_earth = 1.0;
    static constexpr double earth_years_on_mercury = 0.2408467;
    static constexpr double earth_years_on_venus = 0.61519726;
    static constexpr double earth_years_on_mars = 1.8808158;
    static constexpr double earth_years_on_jupiter = 11.862615;
    static constexpr double earth_years_on_saturn = 29.447498;
    static constexpr double earth_years_on_uranus = 84.016846;
    static constexpr double earth_years_on_neptune = 164.7913;

    struct space_age {
        private:
            age_in_seconds _earth_age_in_seconds;
            age_in_years age_on_planet(double earth_years_on_planet) const;

        public:
            space_age(age_in_seconds earth_age_in_seconds);
            
            age_in_seconds seconds() const;
            age_in_years on_earth() const;
            age_in_years on_mercury() const;
            age_in_years on_venus() const;
            age_in_years on_mars() const;
            age_in_years on_jupiter() const;
            age_in_years on_saturn() const;
            age_in_years on_uranus() const;
            age_in_years on_neptune() const;
    };
}  // namespace space_age

#endif // SPACE_AGE_H