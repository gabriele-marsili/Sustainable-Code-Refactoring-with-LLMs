#include <stdbool.h>
#include <ctype.h>
#include <stddef.h>

#define ALL 26

bool is_pangram(const char *sentence)
{
	if (!sentence)
		return false;

	unsigned int mask = 0;
	unsigned int target = (1U << ALL) - 1;

	for (char c; (c = *sentence++) != '\0'; ) {
		if (isalpha((unsigned char)c)) {
			mask |= 1U << (tolower((unsigned char)c) - 'a');
			if (mask == target)
				return true;
		}
	}

	return false;
}