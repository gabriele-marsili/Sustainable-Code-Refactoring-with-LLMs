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

	for (size_t i = 0; i < len; ++i) {
		if (isalpha(phrase[i])) {
			if (wordstart) {
				wordstart = false;
				*tmp++ = toupper(phrase[i]);
			}
		} else {
			wordstart = true;
		}
	}
	*tmp = '\0';

	return res;
}