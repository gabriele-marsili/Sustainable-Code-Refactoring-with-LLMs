#include "roman_numerals.h"
#include <stdlib.h>

#define MAXROMAN 12
#define ELEMENTS 13

static const int dec[ELEMENTS] = {
	1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1
};
static const char rom[ELEMENTS][3] = {
	"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"
};
static const int sizes[ELEMENTS] = {
	1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1
};

char *to_roman_numeral(int n)
{
	if (n <= 0)
		return NULL;

	char *res = (char*) malloc(MAXROMAN + 1);
	if (res == NULL)
		return NULL;

	char *tmp = res;

	for (int i = 0; i < ELEMENTS; i++) {
		while (n >= dec[i]) {
			n -= dec[i];
			
			const char *src = rom[i];
			int size = sizes[i];
			
			for (int j = 0; j < size; j++) {
				*tmp++ = *src++;
			}
			
			if (tmp - res > MAXROMAN) {
				free(res);
				return NULL;
			}
		}
	}
	*tmp = '\0';

	return res;
}