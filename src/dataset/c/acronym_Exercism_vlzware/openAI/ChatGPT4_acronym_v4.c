#include <stdlib.h>
#include <ctype.h>
#include <stdio.h>
#include <stdbool.h>

char *abbreviate(const char *phrase)
{
	if (!phrase || !*phrase)
		return NULL;

	size_t res_size = 16;
	char *res = malloc(res_size);
	if (!res) {
		fprintf(stderr, "Memory error!\n");
		return NULL;
	}

	size_t idx = 0;
	bool wordstart = true;

	while (*phrase) {
		if (isalpha(*phrase)) {
			if (wordstart) {
				if (idx + 1 >= res_size) {
					res_size *= 2;
					char *new_res = realloc(res, res_size);
					if (!new_res) {
						free(res);
						fprintf(stderr, "Memory error!\n");
						return NULL;
					}
					res = new_res;
				}
				res[idx++] = toupper(*phrase);
				wordstart = false;
			}
		} else {
			wordstart = true;
		}
		phrase++;
	}

	res[idx] = '\0';
	return res;
}