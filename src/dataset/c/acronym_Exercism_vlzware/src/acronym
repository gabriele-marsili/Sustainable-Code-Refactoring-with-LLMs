#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdio.h>
#include <stdbool.h>

char *abbreviate(const char *phrase)
{
	if (!phrase || !*phrase)
		return NULL;

	size_t len = strlen(phrase);
	char *res = malloc(len + 1);
	if (!res) {
		fprintf(stderr, "Memory error!\n");
		return NULL;
	}

	char *tmp = res;
	bool wordstart = true;

	for (; *phrase; phrase++) {
		if (isalpha(*phrase)) {
			if (wordstart) {
				*tmp++ = toupper(*phrase);
				wordstart = false;
			}
		} else {
			wordstart = true;
		}
	}
	*tmp = '\0';

	res = realloc(res, tmp - res + 1); // Trim unused memory
	return res;
}