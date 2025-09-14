#include "binary.h"

int convert(const char *binary)
{
	if (binary == NULL || *binary == '\0')
		return INVALID;

	int res = 0;
	const char *ptr = binary;

	while (*ptr) {
		if (*ptr == '1') {
			res = (res << 1) | 1;
		} else if (*ptr == '0') {
			res <<= 1;
		} else {
			return INVALID;
		}
		ptr++;
	}

	return res;
}