#include "scrabble_score.h"
#include <ctype.h>

int score(const char *input)
{
	if (!input || !*input)
		return 0;

	static const int scrabble[] = {
		1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3,
		1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10};

	int res = 0;
	while (*input) {
		char c = toupper(*input++);
		if (c >= 'A' && c <= 'Z')
			res += scrabble[c - 'A'];
	}

	return res;
}