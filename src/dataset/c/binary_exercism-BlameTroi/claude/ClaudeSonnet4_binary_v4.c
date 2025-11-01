#include "binary.h"

int convert(const char *input) {
	int val = 0;
	const char *curr = input;

	while (*curr == '0' || *curr == '1') {
		val = (val << 1) | (*curr - '0');
		curr++;
	}
	
	return (*curr == '\0') ? val : INVALID;
}