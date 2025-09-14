#include <stdexcept>
#include <limits>
#include <cmath>
#include "triangle.h"

namespace triangle {
	bool	almost_equal(double x, double y,
		double abs_epsilon = std::numeric_limits<double>::epsilon(),
		double rel_epsilon = std::numeric_limits<double>::epsilon())
	{
		const double diff = std::abs(x - y);
		if (diff <= abs_epsilon)
			return true;
		const double max_val = std::max(std::abs(x), std::abs(y));
		return diff <= max_val * rel_epsilon;
	}

	flavor	kind(double x, double y, double z) {
		if (x <= 0 || y <= 0 || z <= 0)
			throw std::domain_error("invalid triangle");
		
		if (z > x + y || x > y + z || y > x + z)
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
}  // namespace triangle