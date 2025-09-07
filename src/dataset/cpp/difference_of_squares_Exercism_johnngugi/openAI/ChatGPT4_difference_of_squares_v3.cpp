#include <cmath>
#include "difference_of_squares.h"

namespace squares
{

	int squares::square_of_sums(int a)
	{
		int sum = a * (a + 1) / 2;
		return sum * sum;
	}

	int squares::sum_of_squares(int b)
	{
		return b * (b + 1) * (2 * b + 1) / 6;
	}

	int squares::difference(int c)
	{
		return squares::square_of_sums(c) - squares::sum_of_squares(c);
	}

}