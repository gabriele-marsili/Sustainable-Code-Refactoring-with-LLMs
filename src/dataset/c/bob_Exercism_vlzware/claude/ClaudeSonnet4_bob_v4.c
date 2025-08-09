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

	const char *tmp = sentence;
	int alphas = 0;
	int uppers = 0;
	char lastch = ' ';

	while (*tmp) {
		char ch = *tmp;
		if (ch > ' ') {
			lastch = ch;
			if ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z')) {
				alphas++;
				if (ch >= 'A' && ch <= 'Z')
					uppers++;
			}
		}
		tmp++;
	}

	if (alphas && alphas == uppers)
		return (char*) WHOA;
	if (lastch == '?')
		return (char*) SURE;
	if (lastch == ' ')
		return (char*) FINE;

	return (char*) WTEVER;
}