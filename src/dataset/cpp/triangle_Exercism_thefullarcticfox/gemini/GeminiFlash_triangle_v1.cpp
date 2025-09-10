#include <stdexcept>
#include <cmath>
#include "triangle.h"

namespace triangle {

	//constexpr double abs_epsilon = std::numeric_limits<double>::epsilon(); // Not constexpr before C++20
	//constexpr double rel_epsilon = std::numeric_limits<double>::epsilon(); // Not constexpr before C++20

	inline bool almost_equal(double x, double y) {
		constexpr double abs_epsilon = 1e-9; // Define a suitable epsilon
		constexpr double rel_epsilon = 1e-7;
		double diff = std::abs(x - y);
		if (diff <= abs_epsilon) return true;
		return diff <= std::max(std::abs(x), std::abs(y)) * rel_epsilon;
	}

	flavor kind(double x, double y, double z) {
		if (x <= 0 || y <= 0 || z <= 0)
			throw std::domain_error("invalid triangle");

		if (x + y <= z || x + z <= y || y + z <= x)
			throw std::domain_error("invalid triangle");

		bool x_eq_y = almost_equal(x, y);
		bool y_eq_z = almost_equal(y, z);
		bool x_eq_z = almost_equal(x, z);

		if (x_eq_y && y_eq_z)
			return flavor::equilateral;

		if (x_eq_y || y_eq_z || x_eq_z)
			return flavor::isosceles;

		return flavor::scalene;
	}
}  // namespace triangle