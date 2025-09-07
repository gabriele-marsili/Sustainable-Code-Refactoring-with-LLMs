#include "atbash_cipher.h"
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#define MAGIC 219

static inline void addspace_if_needed(char **tmp, int *count, int mode)
{
	if (mode && *count == 5) {
		*count = 0;
		*(*tmp)++ = ' ';
	}
}

/* modes: 0 = decode; 1 = encode */
char *parse(const char *input, int mode)
{
	int len = strlen(input);
	int space_count = mode ? len / 5 : 0;
	char *res = (char *)malloc(len + space_count + 1);
	if (!res)
		return NULL;

	char *tmp = res;
	int count = 0;
	while (*input) {
		if (isalpha(*input)) {
			addspace_if_needed(&tmp, &count, mode);
			*tmp++ = MAGIC - tolower(*input);
			count += mode;
		} else if (isdigit(*input)) {
			addspace_if_needed(&tmp, &count, mode);
			*tmp++ = *input;
			count += mode;
		}
		input++;
	}
	*tmp = '\0';
	return res;
}

char *atbash_encode(const char *input)
{
	return parse(input, 1);
}

char *atbash_decode(const char *input)
{
	return parse(input, 0);
}