#include <cmath>
#include "difference_of_squares.h"

namespace squares
{

	int squares::square_of_sums(int a)
	{
		int sum = a * (a + 1) / 2; // Use arithmetic series formula
		return sum * sum;
	}

	int squares::sum_of_squares(int b)
	{
		// Use formula for sum of squares of first n natural numbers
		return b * (b + 1) * (2 * b + 1) / 6;
	}

	int squares::difference(int c)
	{
		// Directly calculate the difference using optimized functions
		return squares::square_of_sums(c) - squares::sum_of_squares(c);
	}

}