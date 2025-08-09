#include "bob.h"
#include <ctype.h>
#include <stddef.h>

#define SURE 	"Sure."
#define WHOA 	"Whoa, chill out!"
#define FINE 	"Fine. Be that way!"
#define WTEVER 	"Whatever."

/**
 * hey_bob: parsing sentence only once, searching for
 * question | yelling | silence | something
 */
char *hey_bob(const char *sentence)
{
	if (sentence == NULL)
		return (char*) FINE;

	const char *p = sentence;
	int has_alpha = 0;
	int has_lower = 0;
	char last_non_space_char = ' ';

	while (*p) {
		if (!isspace(*p)) {
			last_non_space_char = *p;
			if (isalpha(*p)) {
				has_alpha = 1;
				// Optimize: only check for lowercase if one hasn't been found yet
				if (!has_lower && islower(*p)) {
					has_lower = 1;
				}
			}
		}
		p++;
	}

	// Yelling: contains at least one alphabetic character and no lowercase characters
	if (has_alpha && !has_lower)
		return (char*) WHOA;
	
	// Question: ends with a question mark (last_non_space_char)
	if (last_non_space_char == '?')
		return (char*) SURE;
	
	// Silence: string is empty or contains only whitespace
	// This is true if last_non_space_char remains its initial value ' '
	if (last_non_space_char == ' ')
		return (char*) FINE;

	// Whatever: none of the above conditions met
	return (char*) WTEVER;
}