#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdio.h>
#include <stdbool.h>

char *abbreviate(const char *phrase)
{
	if (!phrase || !*phrase)
		return NULL;

	// Count words to allocate exact memory needed
	int word_count = 0;
	bool in_word = false;
	const char *p = phrase;
	
	while (*p) {
		if (isalpha(*p)) {
			if (!in_word) {
				word_count++;
				in_word = true;
			}
		} else {
			in_word = false;
		}
		p++;
	}
	
	if (!word_count)
		return NULL;

	char *res = malloc(word_count + 1);
	if (!res) {
		fprintf(stderr, "Memory error!\n");
		return NULL;
	}

	char *tmp = res;
	bool wordstart = true;

	while (*phrase) {
		if (isalpha(*phrase)) {
			if (wordstart) {
				wordstart = false;
				*tmp++ = toupper(*phrase);
			}
		} else {
			wordstart = true;
		}
		phrase++;
	}
	*tmp = '\0';

	return res;
}