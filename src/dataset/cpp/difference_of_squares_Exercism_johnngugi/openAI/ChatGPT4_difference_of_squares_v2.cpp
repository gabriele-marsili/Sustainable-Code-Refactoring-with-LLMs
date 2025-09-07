#include "difference_of_squares.h"

namespace squares
{

	int squares::square_of_sums(int a)
	{
		int sum = a * (a + 1) / 2; // Use arithmetic series formula
		return sum * sum; // Avoid pow for squaring
	}

	int squares::sum_of_squares(int b)
	{
		// Use formula for sum of squares: n(n+1)(2n+1)/6
		return b * (b + 1) * (2 * b + 1) / 6;
	}

	int squares::difference(int c)
	{
		// Directly compute the difference using optimized methods
		return squares::square_of_sums(c) - squares::sum_of_squares(c);
	}

}