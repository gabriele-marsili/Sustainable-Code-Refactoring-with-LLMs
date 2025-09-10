#include <stdexcept>
#include <limits>
#include <cmath>
#include "triangle.h"

namespace triangle {
	inline bool almost_equal(double x, double y,
		double abs_epsilon = std::numeric_limits<double>::epsilon(),
		double rel_epsilon = std::numeric_limits<double>::epsilon())
	{
		double diff = std::abs(x - y);
		return diff <= abs_epsilon || diff <= std::max(std::abs(x), std::abs(y)) * rel_epsilon;
	}

	flavor kind(double x, double y, double z) {
		if (x <= 0 || y <= 0 || z <= 0 ||
			x + y <= z || x + z <= y || y + z <= x)
			throw std::domain_error("invalid triangle");

		bool xy_equal = almost_equal(x, y);
		bool yz_equal = almost_equal(y, z);
		bool xz_equal = almost_equal(x, z);

		if (xy_equal && yz_equal) return flavor::equilateral;
		if (xy_equal || yz_equal || xz_equal) return flavor::isosceles;
		return flavor::scalene;
	}
}  // namespace triangle