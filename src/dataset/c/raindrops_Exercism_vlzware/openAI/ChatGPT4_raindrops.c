#include "raindrops.h"
#include <stdio.h>
#include <string.h>

static inline int is_divisible(int a, int b) {
	return a % b == 0;
}

void convert(char *buf, int drops)
{
	int pos = 0;

	if (is_divisible(drops, 3)) {
		strcpy(buf + pos, "Pling");
		pos += 5;
	}
	if (is_divisible(drops, 5)) {
		strcpy(buf + pos, "Plang");
		pos += 5;
	}
	if (is_divisible(drops, 7)) {
		strcpy(buf + pos, "Plong");
		pos += 5;
	}

	if (pos == 0)
		sprintf(buf, "%d", drops);
	else
		buf[pos] = '\0';
}
