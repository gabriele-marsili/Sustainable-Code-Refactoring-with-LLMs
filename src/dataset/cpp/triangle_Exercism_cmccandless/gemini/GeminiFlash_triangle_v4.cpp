#include "triangle.h"
#include <algorithm>

namespace triangle
{
	void validate(double a, double b, double c)
	{
		if (a <= 0.0 || b <= 0.0 || c <= 0.0)
			throw domain_error("Sides cannot be 0 or less.");
		if (a > b + c || b > a + c || c > a + b)
			throw domain_error("One side cannot be larger than the sum of the others.");
	}

	triangle_kind kind(double a, double b, double c)
	{
		validate(a, b, c);

		if (a == b)
		{
			if (b == c)
			{
				return triangle_kind::equilateral;
			}
			else
			{
				return triangle_kind::isosceles;
			}
		}
		else if (a == c || b == c)
		{
			return triangle_kind::isosceles;
		}
		else
		{
			return triangle_kind::scalene;
		}
	}
}