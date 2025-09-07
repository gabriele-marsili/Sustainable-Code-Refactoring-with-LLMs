#include "difference_of_squares.h"

int square_of_sum(const int n)
{
	const int trnum = n * (n + 1) >> 1;
	return trnum * trnum;
}

int sum_of_squares(const int n)
{
	return n * (n + 1) * (2 * n + 1) / 6;
}

int difference_of_squares(const int n)
{
	const int trnum = n * (n + 1) >> 1;
	const int sq_sum = trnum * trnum;
	const int sum_sq = n * (n + 1) * (2 * n + 1) / 6;
	return sq_sum - sum_sq;
}