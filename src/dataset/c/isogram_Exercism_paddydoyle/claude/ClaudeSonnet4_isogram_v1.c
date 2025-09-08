#include "isogram.h"
#include <ctype.h>

bool is_isogram(const char phrase[]) {
	unsigned int mask = 0;
	const char *p = phrase;
	char c;

	// Test for edge case.
	if (phrase == NULL) {
		return false;
	}

	// Search for a counter-example.
	while ((c = *p++)) {
		// Ignore non-alpha chars and stop chars.
		if (!isalpha(c) || c == ' ' || c == '-') {
			continue;
		}

		// Convert to lowercase and get bit position
		unsigned int bit_pos = (c | 0x20) - 'a';

		// Check if already encountered
		unsigned int bit_mask = 1U << bit_pos;
		if (mask & bit_mask) {
			return false;
		}

		// Mark the char as already encountered.
		mask |= bit_mask;
	}

	return true;
}