#include "space_age.h"

namespace space_age {
	constexpr double earth_years_per_second = 1.0 / 31557600;
	constexpr double mercury_years_per_second =
    	earth_years_per_second / 0.2408467;
	constexpr double venus_years_per_second =
    	earth_years_per_second / 0.61519726;
	constexpr double mars_years_per_second =
    	earth_years_per_second / 1.8808158;
	constexpr double jupiter_years_per_second =
    	earth_years_per_second / 11.862615;
	constexpr double saturn_years_per_second =
    	earth_years_per_second / 29.447498;
	constexpr double uranus_years_per_second =
    	earth_years_per_second / 84.016846;
	constexpr double neptune_years_per_second =
    	earth_years_per_second / 164.79132;

	space_age::space_age(long long sec) : sec(sec) {}

	long long	space_age::seconds() const {
		return (sec);
	}

	double	space_age::on_earth() const {
		return (sec * earth_years_per_second);
	}

	double	space_age::on_mercury() const {
		return (sec * mercury_years_per_second);
	}

	double	space_age::on_venus() const {
		return (sec * venus_years_per_second);
	}

	double	space_age::on_mars() const {
		return (sec * mars_years_per_second);
	}

	double	space_age::on_jupiter() const {
		return (sec * jupiter_years_per_second);
	}

	double	space_age::on_saturn() const {
		return (sec * saturn_years_per_second);
	}

	double	space_age::on_uranus() const {
		return (sec * uranus_years_per_second);
	}

	double	space_age::on_neptune() const {
		return (sec * neptune_years_per_second);
	}
}  // namespace space_age
