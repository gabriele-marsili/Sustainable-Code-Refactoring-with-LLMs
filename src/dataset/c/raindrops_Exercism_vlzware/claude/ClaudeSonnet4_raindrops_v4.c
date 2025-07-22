#include "raindrops.h"
#include <stdio.h>

static inline void mcat(int *pos, char *dst, const char *src);
static inline int check_mod(int a, int b);

void convert(char *buf, int drops)
{
	int pos = 0;
	int found = 0;
	
	if (!(drops % 3)) {
		mcat(&pos, buf, "Pling");
		found = 1;
	}
	if (!(drops % 5)) {
		mcat(&pos, buf, "Plang");
		found = 1;
	}
	if (!(drops % 7)) {
		mcat(&pos, buf, "Plong");
		found = 1;
	}

	if (!found) {
		if (drops == 0) {
			buf[0] = '0';
			buf[1] = '\0';
		} else {
			char temp[12];
			char *p = temp + 11;
			int n = drops;
			int neg = 0;
			
			if (n < 0) {
				neg = 1;
				n = -n;
			}
			
			*p = '\0';
			do {
				*--p = '0' + (n % 10);
				n /= 10;
			} while (n);
			
			if (neg) *--p = '-';
			
			char *dst = buf;
			while ((*dst++ = *p++));
		}
	} else {
		buf[pos] = '\0';
	}
}

static inline void mcat(int *pos, char *dst, const char *src)
{
	char *tmp = dst + *pos;
	while ((*tmp = *src)) {
		tmp++;
		src++;
		(*pos)++;
	}
}

static inline int check_mod(int a, int b)
{
	return !(a % b);
}