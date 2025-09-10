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

	if (all_zero) return 0;

	if (count == 1) {
		if (multiples[0] == 0) return 0;
		unsigned int multiple = multiples[0];
		unsigned int limit = n - 1;
		unsigned int num_multiples = limit / multiple;
		return multiple * (num_multiples * (num_multiples + 1)) / 2;
	}

	bool seen[n];
	for (int i = 0; i < n; ++i) {
		seen[i] = false;
	}

	int sum = 0;
	for (int i = 0; i < count; ++i) {
		if (multiples[i] == 0) continue;
		unsigned int multiple = multiples[i];
		for (unsigned int j = multiple; j < n; j += multiple) {
			if (!seen[j]) {
				sum += j;
				seen[j] = true;
			}
		}
	}

	return sum;
}