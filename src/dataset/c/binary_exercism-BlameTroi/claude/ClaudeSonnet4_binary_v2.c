// exercism binary to decimal
// t.brumley, june 2022

#include "binary.h"

// convert string to int, binary digits. INVALID (-1) is
// returned if non 0 or 1 is found before end of string.
int convert(const char *input) {
	int val = 0;
	const char *curr = input;

	while (*curr != '\0') {
		if (*curr == '0') {
			val <<= 1;
		} else if (*curr == '1') {
			val = (val << 1) | 1;
		} else {
			return INVALID;
		}
		curr++;
	}

	return val;
}