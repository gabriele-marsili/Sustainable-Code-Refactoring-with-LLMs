#include "sum_of_multiples.h"
#include <stddef.h>
#include <stdbool.h>

int sum_of_multiples(const unsigned int *multiples, const int count,
		    const int n)
{
	if (multiples == NULL || count == 0)
		return 0;

	bool all_zero = true;
	for (int i = 0; i < count; ++i) {
		if (multiples[i] != 0) {
			all_zero = false;
			break;
		}
	}

	if (all_zero) {
		return 0;
	}

	if (count == 1) {
		if (multiples[0] == 0) return 0;
		int tmp = (n - 1) / multiples[0];
		return multiples[0] * tmp * (tmp + 1) / 2;
	}

	bool seen[n];
	for (int i = 0; i < n; ++i) {
		seen[i] = false;
	}

	int res = 0;
	for (int k = 0; k < count; ++k) {
		if (multiples[k] == 0) continue;
		for (int i = multiples[k]; i < n; i += multiples[k]) {
			if (!seen[i]) {
				res += i;
				seen[i] = true;
			}
		}
	}
	return res;
}