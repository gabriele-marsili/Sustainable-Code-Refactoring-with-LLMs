#include "triangle.h"

namespace triangle
{
	void validate(double a, double b, double c)
	{
		if (a <= 0 || b <= 0 || c <= 0)
			throw domain_error("Sides cannot be 0 or less.");
		if (a > b + c || b > a + c || c > a + b)
			throw domain_error("One side cannot be larger than the sum of the others.");
	}

	triangle_kind kind(double a, double b, double c)
	{
		if (a <= 0 || b <= 0 || c <= 0)
			throw domain_error("Sides cannot be 0 or less.");
		if (a > b + c || b > a + c || c > a + b)
			throw domain_error("One side cannot be larger than the sum of the others.");
		
		int count = 0;
		if (a == b) ++count;
		if (b == c) ++count;
		if (a == c) ++count;
		
		return triangle_kind(count);
	}
}