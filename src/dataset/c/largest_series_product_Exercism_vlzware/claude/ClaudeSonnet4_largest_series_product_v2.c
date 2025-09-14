#include "largest_series_product.h"
#include <ctype.h>
#include <stddef.h>

int64_t largest_series_product(const char *input, const int series)
{
	if (series == 0)
		return 1;
	if ((input == NULL) || (series < 0))
		return -1;

	// Calculate string length once
	int len = 0;
	const char *p = input;
	while (*p) {
		if (!isdigit(*p))
			return -1;
		p++;
		len++;
	}
	
	if (len < series)
		return -1;

	int64_t res = 0;
	const char *end = input + len - series + 1;
	
	for (const char *start = input; start < end; start++) {
		int64_t tmp = 1;
		for (int i = 0; i < series; i++) {
			tmp *= start[i] - '0';
		}
		if (tmp > res)
			res = tmp;
	}

	return res;
}