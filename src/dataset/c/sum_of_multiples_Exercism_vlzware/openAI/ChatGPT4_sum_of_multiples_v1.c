#include "sum_of_multiples.h"
#include <stddef.h>

int sum_of_multiples(const unsigned int *multiples, const int count,
		    const int n)
{
	if (multiples == NULL || count == 0)
		return 0;

	int res = 0;
	char *is_multiple = (char *)calloc(n, sizeof(char));
	if (!is_multiple)
		return 0;

	for (int k = 0; k < count; k++) {
		if (multiples[k] == 0)
			continue;

		for (int i = multiples[k]; i < n; i += multiples[k]) {
			if (!is_multiple[i]) {
				res += i;
				is_multiple[i] = 1;
			}
		}
	}

	free(is_multiple);
	return res;
}