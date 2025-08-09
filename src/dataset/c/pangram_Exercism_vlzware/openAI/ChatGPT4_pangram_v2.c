#include <stdbool.h>
#include <ctype.h>

#define ALL 26

bool is_pangram(const char *sentence)
{
	if (!sentence)
		return false;

	unsigned int seen = 0;
	int count = 0;

	for (char c; (c = *sentence++) != '\0'; ) {
		if (isalpha(c)) {
			c = tolower(c) - 'a';
			unsigned int mask = 1u << c;
			if (!(seen & mask)) {
				seen |= mask;
				if (++count == ALL)
					return true;
			}
		}
	}

	return false;
}