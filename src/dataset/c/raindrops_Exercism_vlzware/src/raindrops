#include "raindrops.h"
#include <stdio.h>
#include <string.h>

void mcat(int *pos, char *dst, const char *src);
int check_mod(int a, int b);

void convert(char *buf, int drops)
{
	int pos = 0;
	int found = 0;

	if (check_mod(drops, 3)) {
		mcat(&pos, buf, "Pling");
		found = 1;
	}
	if (check_mod(drops, 5)) {
		mcat(&pos, buf, "Plang");
		found = 1;
	}
	if (check_mod(drops, 7)) {
		mcat(&pos, buf, "Plong");
		found = 1;
	}

	if (!found) {
		// Using snprintf to avoid buffer overflow
		snprintf(buf, 12, "%d", drops);
	} else {
		buf[pos] = '\0'; // Ensure null-termination
	}
}

/**
 * mcat: concatenate strings, puts the new length in pos,
 * assumes dst is big enough
 */
void mcat(int *pos, char *dst, const char *src)
{
	while (*src) {
		dst[(*pos)++] = *src++;
	}
}

/**
 * check_mod: returns 1 if a is divisible by b, 0 otherwise
 */
int check_mod(int a, int b)
{
	return (a % b == 0);
}
