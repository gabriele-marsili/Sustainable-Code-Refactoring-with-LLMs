#include <stdexcept>
#include <cmath>
#include "triangle.h"

namespace triangle {

	constexpr double abs_epsilon = std::numeric_limits<double>::epsilon();
	constexpr double rel_epsilon = std::numeric_limits<double>::epsilon();

	inline bool almost_equal(double x, double y) {
		double diff = std::abs(x - y);
		if (diff <= abs_epsilon) return true;
		return diff <= std::max(std::abs(x), std::abs(y)) * rel_epsilon;
	}

	flavor kind(double x, double y, double z) {
		if (x <= 0 || y <= 0 || z <= 0)
			throw std::domain_error("invalid triangle");

		if (x + y <= z || x + z <= y || y + z <= x)
			throw std::domain_error("invalid triangle");

		if (almost_equal(x, y)) {
			if (almost_equal(y, z)) {
				return flavor::equilateral;
			}
			else {
				return flavor::isosceles;
			}
		}
		else if (almost_equal(y, z) || almost_equal(x, z)) {
			return flavor::isosceles;
		}
		else {
			return flavor::scalene;
		}
	}
}  // namespace triangle