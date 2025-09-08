#include "isogram.h"
#include <ctype.h>

bool is_isogram(const char phrase[]) {
	unsigned int mask = 0;
	const char *p = phrase;
	char c;
	int bit_pos;

	// Test for edge case.
	if (phrase == NULL) {
		return false;
	}

	// Search for a counter-example.
	while ((c = *p++)) {
		// Skip non-alphabetic characters
		if (!isalpha(c)) {
			continue;
		}

		// Convert to lowercase and get bit position
		bit_pos = (c | 0x20) - 'a';

		// Check if bit is already set
		if (mask & (1u << bit_pos)) {
			return false;
		}

		// Set the bit
		mask |= (1u << bit_pos);
	}

	return true;
}