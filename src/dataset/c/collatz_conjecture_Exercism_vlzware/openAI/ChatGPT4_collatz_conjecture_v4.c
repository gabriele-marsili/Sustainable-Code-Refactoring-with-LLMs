#include "collatz_conjecture.h"

static inline int iseven(int n)
{
	return !(n & 1);
}

int steps(int start)
{
	if (start <= 0)
		return ERROR_VALUE;

	int res = 0;
	while (start != 1) {
		start = iseven(start) ? (start >> 1) : (3 * start + 1);
		res++;
	}
	return res;
}