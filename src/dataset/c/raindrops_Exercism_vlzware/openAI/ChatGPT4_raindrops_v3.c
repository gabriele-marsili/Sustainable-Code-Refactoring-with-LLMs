#include "raindrops.h"
#include <stdio.h>
#include <string.h>

void mcat(int *pos, const char *dst, const char *src_);
int check_mod(int a, int b);

void convert(char *buf, int drops)
{
	int pos = 0;
	if (check_mod(drops, 3)) {
		mcat(&pos, buf, "Pling");
	}
	if (check_mod(drops, 5)) {
		mcat(&pos, buf, "Plang");
	}
	if (check_mod(drops, 7)) {
		mcat(&pos, buf, "Plong");
	}

	if (pos == 0)
		sprintf(buf, "%i", drops);
}

void mcat(int *pos, const char *dst, const char *src_)
{
	size_t len = strlen(src_);
	memcpy((char*)dst + *pos, src_, len);
	*pos += len;
	((char*)dst)[*pos] = '\0';
}

int check_mod(int a, int b)
{
	return !(a % b);
}
