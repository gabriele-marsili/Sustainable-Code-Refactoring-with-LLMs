#include "bob.h"
#include <ctype.h>

#define SURE 	"Sure."
#define WHOA 	"Whoa, chill out!"
#define FINE 	"Fine. Be that way!"
#define WTEVER 	"Whatever."

char *hey_bob(const char *sentence)
{
	if (!sentence)
		return (char*) FINE;

	int alphas = 0, uppers = 0;
	const char *p = sentence;
	const char *last_non_space = NULL;

	while (*p) {
		if (!isspace((unsigned char)*p)) {
			last_non_space = p;
			if (isalpha((unsigned char)*p)) {
				alphas++;
				uppers += isupper((unsigned char)*p);
			}
		}
		p++;
	}

	if (!last_non_space)
		return (char*) FINE;

	if (alphas && alphas == uppers)
		return (char*) WHOA;

	if (*last_non_space == '?')
		return (char*) SURE;

	return (char*) WTEVER;
}