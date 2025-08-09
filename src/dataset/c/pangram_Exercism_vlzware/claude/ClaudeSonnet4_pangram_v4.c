#include <stdbool.h>
#include <ctype.h>
#include <stddef.h>

#define ALL ('z' - 'a' + 1)

bool is_pangram(const char *sentence)
{
	if (sentence == NULL || *sentence == '\0')
		return false;

	int lcount = 0;
	bool letters[ALL] = {false};

	for (const char *s = sentence; *s; s++) {
		if (isalpha(*s)) {
			int c = tolower(*s) - 'a';
			if (!letters[c]) {
				letters[c] = true;
				if (++lcount == ALL)
					return true;
			}
		}
	}

	return false;
}