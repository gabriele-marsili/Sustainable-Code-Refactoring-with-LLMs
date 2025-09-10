#include "roman_numerals.h"
#include <stdlib.h>
#include <string.h>

#define MAXROMAN 12
#define ELEMENTS 13

const int dec[ELEMENTS] = {
	1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1
};
const char* rom[ELEMENTS] = {
	"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"
};
const int sizes[ELEMENTS] = {
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
	int i;

	for (i = 0; i < ELEMENTS; i++) {
		while (n >= dec[i]) {
			n -= dec[i];
			int size = sizes[i];
			if (tmp + size - res > MAXROMAN) {
				free(res);
				return NULL;
			}
			memcpy(tmp, rom[i], size);
			tmp += size;
		}
	}
	*tmp = '\0';

	return res;
}