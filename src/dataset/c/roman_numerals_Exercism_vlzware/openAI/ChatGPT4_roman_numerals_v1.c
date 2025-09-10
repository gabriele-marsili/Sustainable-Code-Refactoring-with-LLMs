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

char *to_roman_numeral(int n)
{
	if (n <= 0)
		return NULL;

	char *res = (char*) malloc(MAXROMAN + 1);
	if (res == NULL)
		return NULL;

	char *tmp = res;

	for (int i = 0; i < ELEMENTS && n > 0; i++) {
		while (n >= dec[i]) {
			n -= dec[i];
			const char *symbol = rom[i];
			while (*symbol) {
				*tmp++ = *symbol++;
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