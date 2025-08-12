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
		if (c >= 'A' && c <= 'Z')
			c += 'a' - 'A';
		if (c >= 'a' && c <= 'z') {
			int bit = 1 << (c - 'a');
			if (!(seen & bit)) {
				seen |= bit;
				if (++count == ALL)
					return true;
			}
		}
	}

	return false;
}