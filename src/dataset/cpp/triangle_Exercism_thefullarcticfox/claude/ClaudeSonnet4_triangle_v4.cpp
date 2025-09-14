#include <stdexcept>
#include <limits>
#include <cmath>
#include "triangle.h"

namespace triangle {
	inline bool almost_equal(double x, double y,
		double abs_epsilon = std::numeric_limits<double>::epsilon(),
		double rel_epsilon = std::numeric_limits<double>::epsilon()) noexcept
	{
		const double diff = std::abs(x - y);
		return diff <= abs_epsilon || diff <= std::max(std::abs(x), std::abs(y)) * rel_epsilon;
	}

	flavor kind(double x, double y, double z) {
		if (x <= 0.0 || y <= 0.0 || z <= 0.0 ||
			z > x + y || x > y + z || y > x + z)
			throw std::domain_error("invalid triangle");
		
		const bool xy_equal = almost_equal(x, y);
		const bool yz_equal = almost_equal(y, z);
		const bool xz_equal = almost_equal(x, z);
		
		if (xy_equal && yz_equal)
			return flavor::equilateral;
		if (xy_equal || yz_equal || xz_equal)
			return flavor::isosceles;
		return flavor::scalene;
	}
}