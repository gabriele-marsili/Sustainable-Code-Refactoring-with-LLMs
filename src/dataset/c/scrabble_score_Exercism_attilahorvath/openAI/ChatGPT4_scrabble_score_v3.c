#include "scrabble_score.h"
#include <ctype.h>

int score(const char *word) {
    static const int scores[26] = {
        1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10
    };
    int total_score = 0;

    for (char c; (c = *word++) != '\0'; ) {
        if (isalpha(c)) {
            total_score += scores[toupper(c) - 'A'];
        }
    }

    return total_score;
}