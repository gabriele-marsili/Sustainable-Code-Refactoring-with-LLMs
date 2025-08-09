#include "pangram.h"

#include <ctype.h>

bool is_pangram(const char *sentence) {
	unsigned int mask = 0;
	const unsigned int pangram_mask = 0x3FFFFFF; // (1 << 26) - 1
	
	if (sentence == NULL) {
		return false;
	}

	for (const char *p = sentence; *p; p++) {
		if ((*p | 32) >= 'a' && (*p | 32) <= 'z') {
			mask |= 1 << ((*p | 32) - 'a');
			if (mask == pangram_mask) {
				return true;
			}
		}
	}

	return mask == pangram_mask;
}