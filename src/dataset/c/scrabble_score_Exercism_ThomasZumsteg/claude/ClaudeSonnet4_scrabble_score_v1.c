#include "scrabble_score.h"
#include <ctype.h>

static const int letter_values[26] = {
    1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3,
    1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10
};

int letter_val(char c) {
    if (c >= 'A' && c <= 'Z') {
        return letter_values[c - 'A'];
    }
    return -1;
}

int score(char *word) {
    int total = 0;
    for (char *c = word; *c; c++) {
        char upper = (*c >= 'a' && *c <= 'z') ? *c - 32 : *c;
        if (upper >= 'A' && upper <= 'Z') {
            total += letter_values[upper - 'A'];
        }
    }
    return total;
}