#include "scrabble_score.h"
#include <stddef.h>

static const int scrabble[26] = {
    1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3,
    1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10
};

int score(const char *input)
{
    if (!input || !*input)
        return 0;

    int res = 0;
    const char *p = input;
    
    while (*p) {
        char c = *p++;
        if (c >= 'A' && c <= 'Z') {
            res += scrabble[c - 'A'];
        } else if (c >= 'a' && c <= 'z') {
            res += scrabble[c - 'a'];
        }
    }

    return res;
}