#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdio.h>
#include <stdbool.h>

char *abbreviate(const char *phrase)
{
	if (!phrase || !*phrase)
		return NULL;

	size_t phrase_len = strlen(phrase);
	char *res = malloc(phrase_len + 1);

	if (!res) {
		fprintf(stderr, "Memory error!\n");
		return NULL;
	}

	char *dest = res;
	bool word_start = true;

	for (size_t i = 0; i < phrase_len; ++i) {
		if (isalpha(phrase[i])) {
			if (word_start) {
				word_start = false;
				*dest++ = toupper(phrase[i]);
			}
		} else {
			word_start = true;
		}
	}

	*dest = '\0';
	return res;
}