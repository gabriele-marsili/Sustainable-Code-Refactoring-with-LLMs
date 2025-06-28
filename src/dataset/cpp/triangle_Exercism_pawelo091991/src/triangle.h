#ifndef TRIANGLE_H
#define TRIANGLE_H

namespace triangle {
	enum class flavor{equilateral, isosceles, scalene};
	flavor kind(double x, double y, double z);
}
#endif // !TRIANGLE_H

