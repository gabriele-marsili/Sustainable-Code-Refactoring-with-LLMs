#include "triangle.h"
#include <stdexcept>

namespace triangle {
	flavor kind(double x, double y, double z) {
		if ((x <= 0 || y <= 0 || z <= 0) || !(x + y > z && x + z > y && z + y > x))
			throw std::domain_error("Wrong input data - invalid triangle");
		else if (x == y && x == z)
			return flavor::equilateral;
		else if (x == y || x == z || y == z)
			return flavor::isosceles;
		else
			return flavor::scalene;
	}
}