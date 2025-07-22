#include "raindrops.h"
#include <stdio.h>
#include <string.h>

void mcat(int *pos, char *dst, const char *src);
static inline int check_mod(int a, int b);

void convert(char *buf, int drops)
{
	int pos = 0;
	if (check_mod(drops, 3)) mcat(&pos, buf, "Pling");
	if (check_mod(drops, 5)) mcat(&pos, buf, "Plang");
	if (check_mod(drops, 7)) mcat(&pos, buf, "Plong");

	if (pos == 0)
		sprintf(buf, "%d", drops);
	else
		buf[pos] = '\0';
}

void mcat(int *pos, char *dst, const char *src)
{
	while ((dst[*pos] = *src++)) (*pos)++;
}

static inline int check_mod(int a, int b)
{
	return !(a % b);
}
