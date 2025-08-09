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
	int alphas = 0;
	int uppers = 0;
	char lastch = ' ';

	for (; *p; ++p) {
		// Cast to unsigned char to avoid undefined behavior with ctype.h functions
		// if 'char' is signed and the character value is negative.
		// This improves robustness and adherence to C standards.
		if (!isspace((unsigned char)*p)) {
			lastch = *p;
			if (isalpha((unsigned char)*p)) {
				alphas++;
				if (isupper((unsigned char)*p))
					uppers++;
			}
		}
	}

	// The order of these checks is crucial and preserves the original functionality.
	// 1. Yelling: Check if there are any alphabetic characters and all of them are uppercase.
	if (alphas && alphas == uppers)
		return (char*) WHOA;
	// 2. Question: Check if the last non-whitespace character is a question mark.
	if (lastch == '?')
		return (char*) SURE;
	// 3. Silence: Check if the string was empty or contained only whitespace characters.
	if (lastch == ' ')
		return (char*) FINE;

	// 4. Default: If none of the above conditions are met.
	return (char*) WTEVER;
}