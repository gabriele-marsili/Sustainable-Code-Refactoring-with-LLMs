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
		validate(a, b, c);
		
		bool ab_equal = (a == b);
		bool bc_equal = (b == c);
		bool ac_equal = (a == c);
		
		return triangle_kind(ab_equal + bc_equal + ac_equal);
	}
}