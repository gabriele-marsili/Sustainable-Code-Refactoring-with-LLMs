#include "scrabble_score.h"
#include <ctype.h>

static const int letter_scores[26] = {
    1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10
};

int letter_val(char c) {
    if (c >= 'A' && c <= 'Z') {
        return letter_scores[c - 'A'];
    }
    return -1;
}

int score(char *word) {
    int total = 0;
    for (; *word; word++) {
        int val = letter_val(toupper((unsigned char)*word));
        if (val >= 0) {
            total += val;
        }
    }
    return total;
}