#include "raindrops.h"
#include <stdio.h>

void mcat(int *pos, const char *dst, const char *src_);
int check_mod(int a, int b);

void convert(char *buf, int drops)
{
	int pos = 0;
	
	if (drops % 3 == 0) {
		buf[0] = 'P'; buf[1] = 'l'; buf[2] = 'i'; buf[3] = 'n'; buf[4] = 'g';
		pos = 5;
	}
	if (drops % 5 == 0) {
		buf[pos] = 'P'; buf[pos+1] = 'l'; buf[pos+2] = 'a'; buf[pos+3] = 'n'; buf[pos+4] = 'g';
		pos += 5;
	}
	if (drops % 7 == 0) {
		buf[pos] = 'P'; buf[pos+1] = 'l'; buf[pos+2] = 'o'; buf[pos+3] = 'n'; buf[pos+4] = 'g';
		pos += 5;
	}

	if (pos == 0) {
		sprintf(buf, "%i", drops);
	} else {
		buf[pos] = '\0';
	}
}

void mcat(int *pos, const char *dst, const char *src_)
{
	const char *src = src_;
	char *tmp = (char*) dst + *pos;
	while ((*tmp++ = *src++))
		(*pos)++;
	*tmp = '\0';
}

int check_mod(int a, int b)
{
	return (a % b == 0);
}