#include "scrabble_score.h"
#include <ctype.h>

int letter_val(char c) {
    static const int scores[26] = {
        1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10
    };
    if (c >= 'A' && c <= 'Z') {
        return scores[c - 'A'];
    }
    return 0;
}

int score(char *word) {
    int total = 0;
    for (char *c = word; *c; c++) {
        total += letter_val(toupper(*c));
    }
    return total;
}