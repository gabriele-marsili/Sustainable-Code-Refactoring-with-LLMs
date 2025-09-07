#include "difference_of_squares.h"

int square_of_sum(const int n)
{
	/* Using direct formula for square of sum of first n natural numbers */
	return (n * (n + 1) / 2) * (n * (n + 1) / 2);
}

int sum_of_squares(const int n)
{
	/* Using direct formula for sum of squares of first n natural numbers */
	return n * (n + 1) * (2 * n + 1) / 6;
}

int difference_of_squares(const int n)
{
	/* Combining calculations to minimize function calls */
	int sum = n * (n + 1) / 2;
	int square_of_sum = sum * sum;
	int sum_of_squares = n * (n + 1) * (2 * n + 1) / 6;
	return square_of_sum - sum_of_squares;
}