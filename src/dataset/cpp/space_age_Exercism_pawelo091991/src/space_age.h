#ifndef SPACE_AGE_H
#define SPACE_AGE_H

namespace space_age {

	class space_age {
	private:
		double time;
		static constexpr double earth = 60 * 60 * 24 * 365.25;
		static constexpr double mercury = 0.2408467;
		static constexpr double venus = 0.61519726;
		static constexpr double mars = 1.8808158;
		static constexpr double jupiter = 11.862615;
		static constexpr double saturn = 29.447498;
		static constexpr double uranus = 84.016846;
		static constexpr double neptune = 164.79132;
		double calculate(double planet) const;

	public:
		explicit space_age(double seconds);
		double seconds() const;
		double on_earth() const;
		double on_mercury() const;
		double on_venus() const;
		double on_mars() const;
		double on_jupiter() const;
		double on_saturn() const;
		double on_uranus() const;
		double on_neptune() const;
	};
}

#endif // !SPACE_AGE_H