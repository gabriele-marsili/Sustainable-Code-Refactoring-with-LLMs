#include "largest_series_product.h"
#include <ctype.h>
#include <stddef.h>

int64_t largest_series_product(const char *input, const int series)
{
	if (series == 0)
		return 1;
	if ((input == NULL) || (series < 0))
		return -1;

	int64_t res = 0, tmp = 1;
	int len = 0, zero_count = 0;

	for (const char *ptr = input; *ptr; ptr++, len++) {
		if (!isdigit(*ptr))
			return -1;

		int digit = *ptr - '0';
		if (digit == 0) {
			zero_count++;
			tmp = 1;
		} else {
			tmp *= digit;
		}

		if (len >= series) {
			if (zero_count == 0 && tmp > res)
				res = tmp;

			int first_digit = *(ptr - series + 1) - '0';
			if (first_digit == 0)
				zero_count--;
			else
				tmp /= first_digit;
		}
	}

	return (len < series) ? -1 : res;
}