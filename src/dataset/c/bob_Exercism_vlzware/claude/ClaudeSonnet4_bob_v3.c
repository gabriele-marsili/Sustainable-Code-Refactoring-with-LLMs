#include "bob.h"
#include <ctype.h>
#include <stddef.h>

#define SURE 	"Sure."
#define WHOA 	"Whoa, chill out!"
#define FINE 	"Fine. Be that way!"
#define WTEVER 	"Whatever."

char *hey_bob(const char *sentence)
{
	if (sentence == NULL)
		return (char*) FINE;

	const char *ptr = sentence;
	int has_alpha = 0;
	int has_lower = 0;
	char last_non_space = '\0';

	while (*ptr) {
		if (!isspace(*ptr)) {
			last_non_space = *ptr;
			if (isalpha(*ptr)) {
				has_alpha = 1;
				if (islower(*ptr)) {
					has_lower = 1;
				}
			}
		}
		ptr++;
	}

	if (has_alpha && !has_lower)
		return (char*) WHOA;
	if (last_non_space == '?')
		return (char*) SURE;
	if (last_non_space == '\0')
		return (char*) FINE;

	return (char*) WTEVER;
}