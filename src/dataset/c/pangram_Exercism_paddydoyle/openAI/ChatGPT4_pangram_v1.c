#include "pangram.h"

#include <ctype.h>

#define N_CHARS 26

#define SET_BIT(mask, pos) (mask |= (1U << (pos)))

bool is_pangram(const char *sentence) {
	if (sentence == NULL) {
		return false;
	}

	unsigned int mask = 0;
	unsigned int count = 0;

	for (const char *p = sentence; *p; ++p) {
		if (isalpha((unsigned char)*p)) {
			char c = tolower((unsigned char)*p);
			unsigned int bit = 1U << (c - 'a');
			if (!(mask & bit)) {
				mask |= bit;
				if (++count == N_CHARS) {
					return true;
				}
			}
		}
	}

	return false;
}