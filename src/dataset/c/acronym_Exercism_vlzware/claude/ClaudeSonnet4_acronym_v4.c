#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdio.h>
#include <stdbool.h>

char *abbreviate(const char *phrase)
{
	if (!phrase || !*phrase)
		return NULL;

	int len = strlen(phrase);
	char *res = malloc(len + 1);
	if (!res) {
		fprintf(stderr, "Memory error!\n");
		return NULL;
	}

	char *tmp = res;
	bool wordstart = true;
	const char *p = phrase;

	while (*p) {
		if (isalpha(*p)) {
			if (wordstart) {
				*tmp++ = toupper(*p);
				wordstart = false;
			}
		} else {
			wordstart = true;
		}
		p++;
	}
	*tmp = '\0';

	int actual_len = tmp - res;
	if (actual_len < len) {
		char *resized = realloc(res, actual_len + 1);
		if (resized)
			res = resized;
	}

	return res;
}