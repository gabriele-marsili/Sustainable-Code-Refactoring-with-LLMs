#include "triangle.h"

namespace triangle
{
	void validate(double a, double b, double c)
	{
		if (a <= 0 || b <= 0 || c <= 0 || a + b <= c || a + c <= b || b + c <= a)
			throw domain_error("Invalid triangle sides.");
	}

	triangle_kind kind(double a, double b, double c)
	{
		validate(a, b, c);
		int equal_sides = (a == b) + (b == c) + (a == c);
		return triangle_kind(equal_sides);
	}
}