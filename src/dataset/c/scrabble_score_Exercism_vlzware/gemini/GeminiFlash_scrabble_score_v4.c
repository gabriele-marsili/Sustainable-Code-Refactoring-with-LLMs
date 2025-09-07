#include "scrabble_score.h"
#include <stddef.h>
#include <ctype.h>

#define ALL 26

int score(const char *input)
{
	if (!input || !*input)
		return 0;

	static const int scrabble[ALL] = {
	/*	A  B  C  D  E  F  G  H  I  J  K  L  M  */
		1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3,
		1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10};
	/*	N, O  P  Q   R  S  T  U  V  W  X  Y  Z */

	int res = 0;
	for (; *input; ++input) {
		int tmp = toupper((unsigned char)*input) - 'A';
		if (tmp >= 0 && tmp < ALL) {
			res += scrabble[tmp];
		}
	}

	return res;
}