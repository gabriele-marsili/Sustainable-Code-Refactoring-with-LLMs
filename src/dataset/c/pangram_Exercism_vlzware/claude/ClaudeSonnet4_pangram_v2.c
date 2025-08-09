#include <stdbool.h>
#include <ctype.h>
#include <stddef.h>

bool is_pangram(const char *sentence)
{
	if (sentence == NULL || *sentence == '\0')
		return false;

	unsigned int seen = 0;
	const unsigned int all_letters = 0x3FFFFFF; // 26 bits set (2^26 - 1)

	while (*sentence) {
		if ((*sentence | 32) >= 'a' && (*sentence | 32) <= 'z') {
			seen |= 1U << ((*sentence | 32) - 'a');
			if (seen == all_letters)
				return true;
		}
		sentence++;
	}

	return false;
}