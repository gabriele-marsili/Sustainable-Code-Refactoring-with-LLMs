#include "sum_of_multiples.h"
#include <stddef.h>
#include <stdbool.h>

int sum_of_multiples(const unsigned int *multiples, const int count,
		    const int n)
{
	if (multiples == NULL || count == 0)
		return 0;

	bool has_zero = false;
	for (int i = 0; i < count; ++i) {
		if (multiples[i] == 0) {
			has_zero = true;
			break;
		}
	}

	if (has_zero) return 0;

	if (count == 1) {
		if (multiples[0] == 0) return 0;
		int tmp = (n - 1) / multiples[0];
		return multiples[0] * tmp * (tmp + 1) / 2;
	}

	bool multiple_found[n];
	for (int i = 0; i < n; ++i) {
		multiple_found[i] = false;
	}

	int res = 0;
	for (int k = 0; k < count; k++) {
		unsigned int multiple = multiples[k];
		if (multiple > 0) {
			for (int i = multiple; i < n; i += multiple) {
				if (!multiple_found[i]) {
					res += i;
					multiple_found[i] = true;
				}
			}
		}
	}

	return res;
}