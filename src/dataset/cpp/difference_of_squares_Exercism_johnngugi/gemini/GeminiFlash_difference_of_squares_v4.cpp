#include "difference_of_squares.h"

namespace squares
{

	int squares::square_of_sums(int a)
	{
		long long sum = (long long)a * (a + 1) / 2;
		return sum * sum;
	}

	int squares::sum_of_squares(int b)
	{
		long long sum = (long long)b * (b + 1) * (2 * b + 1) / 6;
		return sum;
	}

	int squares::difference(int c)
	{
		return square_of_sums(c) - sum_of_squares(c);
	}

}