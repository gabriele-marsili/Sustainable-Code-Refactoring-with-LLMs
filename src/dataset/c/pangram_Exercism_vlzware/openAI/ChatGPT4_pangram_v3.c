#include <stdbool.h>
#include <ctype.h>

#define ALL 26

bool is_pangram(const char *sentence)
{
	if (!sentence)
		return false;

	unsigned int mask = 0;
	int count = 0;

	for (char c; (c = *sentence++) != '\0'; ) {
		if (isalpha(c)) {
			int bit = 1 << (tolower(c) - 'a');
			if (!(mask & bit)) {
				mask |= bit;
				if (++count == ALL)
					return true;
			}
		}
	}

	return false;
}