#include "collatz_conjecture.h"

int steps(int start)
{
	if (start <= 0)
		return ERROR_VALUE;

	int res = 0;
	int n = start;
	while(n != 1) {
		if (n & 1) {
			n = 3*n + 1;
		} else {
			n >>= 1;
		}
		res++;
	}
	return res;
}