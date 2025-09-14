#include <stdexcept>
#include <limits>
#include "triangle.h"

namespace triangle {
	inline bool	almost_equal(double x, double y,
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
		if (x <= 0 || y <= 0 || z <= 0 ||
			z > x + y || x > y + z || y > x + z)
			throw std::domain_error("invalid triangle");
		
		const bool xy_equal = almost_equal(x, y);
		const bool yz_equal = almost_equal(y, z);
		const bool xz_equal = almost_equal(x, z);
		
		const short equalsum = xy_equal + yz_equal + xz_equal;
		
		if (equalsum > 1)
			return flavor::equilateral;
		if (equalsum > 0)
			return flavor::isosceles;
		return flavor::scalene;
	}
}  // namespace triangle